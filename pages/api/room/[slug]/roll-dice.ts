import { Database } from '@/lib/database.types';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';

const supabaseAdmin = createClient<Database>(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { diceNotation } = req.body;

    if (!diceNotation) return res.status(400).end();

    const supabaseServerClient = createServerSupabaseClient<Database>({
      req,
      res,
    });

    const {
      data: { user },
    } = await supabaseServerClient.auth.getUser();

    if (!user) {
      return res.status(401).end();
    }

    const { slug } = req.query;

    const { data: channel } = await supabaseServerClient
      .from('channels')
      .select()
      .eq('slug', slug)
      .single();

    if (!channel) {
      return res.status(400).end();
    }

    const { total, output } = new DiceRoll(diceNotation);

    const breakdown = output.replace(/^.*:/i, '').replace(/=.*$/, '').trim();

    await supabaseAdmin.from('dice_rolls').insert({
      notation: diceNotation,
      channel_id: channel.id,
      total,
      breakdown,
      user_id: user.id,
    });

    return res.status(201).end();
  } else {
    return res.status(405);
  }
}
