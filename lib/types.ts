import { Database } from './database.types';

export type User = Database['public']['Tables']['users']['Row'];
export type DiceRoll = Database['public']['Tables']['dice_rolls']['Row'];
export type ChannelMember =
  Database['public']['Tables']['channel_members']['Row'];
