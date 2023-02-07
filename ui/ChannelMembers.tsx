'use client';

import { Database } from '@/lib/database.types';
import { ChannelMember as ChannelMemberType } from '@/lib/types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { usersAtom } from 'atoms/Users';
import { useAtom } from 'jotai';
import { FC, useEffect } from 'react';

interface ChannelMembersProps {
  channelId: ChannelMemberType['channel_id'];
}

export const ChannelMembers: FC<ChannelMembersProps> = ({ channelId }) => {
  const [users, setUsers] = useAtom(usersAtom);
  const supabaseClient = useSupabaseClient<Database>();

  useEffect(() => {
    supabaseClient
      .channel('public:channel_members')
      .on(
        'postgres_changes',
        {
          event: '*',
          table: 'channel_members',
          schema: 'public',
          filter: `channel_id=eq.${channelId}`,
        },
        async (payload) => {
          const { data: user } = await supabaseClient
            .from('users')
            .select()
            .eq('id', (payload.new as ChannelMemberType).user_id)
            .single();

          if (user) {
            setUsers((oldUsers) => ({
              ...oldUsers,
              [user.id]: user,
            }));
          }
        },
      )
      .subscribe();

    // const onlineChannelMembers = supabaseClient.channel(
    //   `online-channel-members-${channelId}`,
    // );

    // onlineChannelMembers.on('presence', { event: 'sync' }, () => {
    //   console.log('Online users: ', onlineChannelMembers.presenceState());
    // });

    // onlineChannelMembers.on(
    //   'presence',
    //   { event: 'join' },
    //   ({ newPresences }) => {
    //     console.log('New users have joined: ', newPresences);
    //   },
    // );

    // onlineChannelMembers.on(
    //   'presence',
    //   { event: 'leave' },
    //   ({ leftPresences }) => {
    //     console.log('Users have left: ', leftPresences);
    //   },
    // );

    // onlineChannelMembers.subscribe(async (status) => {
    //   if (status === 'SUBSCRIBED') {
    //     const status = await onlineChannelMembers.track({
    //       foo: 'bar',
    //     });
    //     console.log(status);
    //   }
    // });

    // return () => {
    //   supabaseClient.removeChannel(onlineChannelMembers);
    // };
  }, []);

  return (
    <div className="card bg-neutral shadow-xl flex flex-col gap-4 p-4">
      {Object.values(users).map(({ display_name }) => (
        <div className="flex gap-4 items-center">
          <div className="avatar online">
            <div className="w-12 rounded-full">
              <img src="https://placeimg.com/192/192/people" />
            </div>
          </div>
          <span>{display_name}</span>
        </div>
      ))}
    </div>
  );
};
