import { Database } from '@/lib/database.types';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

const supabaseAdmin = createClient<Database>(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { displayName } = req.body;

  const email = `${randomUUID()}@ivorydice.online`;
  const password = randomUUID();

  await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { display_name: displayName },
  });

  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  });

  await supabaseServerClient.auth.signInWithPassword({
    email,
    password,
  });

  res.status(204).end();
}
