'use client';
import { useState, useEffect } from 'react';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { Database } from './database.types';

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '',
);

interface DiceRoll {
  id: number;
  dice_notation: string | null;
  result: number | null;
  user_id: string;
  channel_id: number;
  inserted_at: string;
}

interface Channel {
  id: number;
  slug: string;
}

interface useStoreParams {
  channelSlug: string;
}

/**
 * @param {number} channelSlug the currently selected Channel
 */
export const useStore = ({ channelSlug }: useStoreParams) => {
  const [channelId, setChannelId] = useState<number>();
  const [diceRolls, setDiceRolls] = useState<Array<DiceRoll>>([]);
  const [users] = useState(new Map());
  const [newMessage, handleNewMessage] = useState<DiceRoll | null>(null);

  // Load initial data and set up listeners
  useEffect(() => {
    let messageListener: RealtimeChannel;
    const intializeRoom = async () => {
      console.log('init');
      const channel = (await upsertChannel(channelSlug)) as unknown as Channel;
      setChannelId(channel.id);

      messageListener = supabase
        .channel('public:dice_rolls')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'dice_rolls',
            filter: `channel_id=eq.${channel!.id}}`,
          },
          (payload) => handleNewMessage(payload as unknown as DiceRoll),
        )
        .subscribe();
    };

    intializeRoom();

    // Listen for new messages
    // return () => {
    //   supabase.removeChannel(messageListener);
    // };
  }, []);

  // New message recieved from Postgres
  useEffect(() => {
    if (newMessage && newMessage.channel_id === Number(channelId)) {
      const handleAsync = async () => {
        setDiceRolls(diceRolls.concat(newMessage));
      };
      handleAsync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

  return {
    // We can export computed values here to map the authors to each message
    diceRolls: diceRolls.map((x) => ({ ...x, author: users.get(x.user_id) })),
    // channels: channels.sort((a, b) => a.slug.localeCompare(b.slug)),
    users,
  };
};

/**
 * Fetch all messages and their authors
 * @param {number} channelId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchMessages = async (channelId: number, setState: Function) => {
  try {
    let { data } = await supabase
      .from('messages')
      .select(`*, author:user_id(*)`)
      .eq('channel_id', channelId)
      .order('inserted_at', { ascending: true });
    if (setState) setState(data);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const fetchChannel = async (slug: string) => {
  try {
    let { data } = await supabase.from('channels').select().eq('slug', slug);
    return data?.at(0);
  } catch (error) {
    console.log('error', error);
  }
};

/**
 * Insert a new channel into the DB
 * @param {string} slug The channel name
 */
export const addChannel = async (slug: string) => {
  try {
    let { data } = await supabase.from('channels').insert([{ slug }]).select();
    return data?.at(0);
  } catch (error) {
    console.log('error', error);
  }
};

/**
 * Insert a new channel into the DB
 * @param {string} slug The channel name
 */
export const upsertChannel = async (slug: string) => {
  try {
    let { data, error } = await supabase
      .from('channels')
      .upsert({ slug }, { onConflict: 'slug' })
      .select();
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

/**
 * Insert a new message into the DB
 * @param {string} diceRoll The message text
 * @param {number} channel_id
 * @param {number} user_id The author
 */
export const addDiceRoll = async (
  dice_notation: string,
  channel_id: number,
) => {
  try {
    let { data } = await supabase
      .from('messages')
      .insert([{ diceNotatiion: dice_notation, channel_id }]);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};
