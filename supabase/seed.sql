-- USERS
create table public.users (
  id uuid not null primary key,
  -- UUID from auth.users
  display_name text
);
comment on table public.users is 'Profile data for each user.';
comment on column public.users.id is 'References the internal Supabase Auth user.';
-- CHANNELS
create table public.channels (
  id bigint generated by default as identity primary key,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  slug text not null unique,
  created_by uuid references public.users not null
);
comment on table public.channels is 'Topics and groups.';
-- CHANNEL MEMBERS 
create table public.channel_members (
  channel_id bigint references public.channels on delete cascade not null,
  user_id uuid references public.users on delete cascade not null,
  primary key (channel_id, user_id)
);
comment on table public.channel_members is '1:1 relationship between channels and users';
-- DICEROLLS
create table public.dice_rolls (
  id bigint generated by default as identity primary key,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  notation text,
  breakdown text,
  total numeric,
  user_id uuid references public.users not null,
  channel_id bigint references public.channels on delete cascade not null
);
comment on table public.dice_rolls is 'Individual dice_rolls sent by each user.';
create or replace function get_channels_for_authenticated_user() returns setof bigint language sql security definer
set search_path = public stable as $$
select channel_id
from channel_members
where user_id = auth.uid() $$;
-- Secure the tables
alter table public.users enable row level security;
alter table public.channels enable row level security;
alter table public.channel_members enable row level security;
alter table public.dice_rolls enable row level security;
create policy "Allow logged-in read access" on public.users for
select using (auth.role() = 'authenticated');
create policy "Allow individual insert access" on public.users for
insert with check (auth.uid() = id);
create policy "Allow individual update access" on public.users for
update using (auth.uid() = id);
create policy "Allow logged-in read access" on public.channels for
select using (auth.role() = 'authenticated');
create policy "Allow individual insert access" on public.channels for
insert with check (auth.uid() = created_by);
create policy "Allow individual update access" on public.channels for
update using (auth.uid() = created_by);
create policy "Allow individual delete access" on public.channels for delete using (auth.uid() = created_by);
create policy "Allow individual read access" on public.channel_members for
select using (auth.uid() = user_id);
create policy "Allow individual insert access" on public.channel_members for
insert with check (auth.uid() = user_id);
-- create policy "Allow authorized delete access" on public.channels for delete using ( authorize('channels.delete', auth.uid()) );
-- create policy "Allow logged-in read access" on public.dice_rolls for select using ( auth.role() = 'authenticated' );
-- create policy "Allow individual read access" on public.dice_rolls for
-- select using (true);
create policy "Allow individual read access to channels the user belongs to" on public.dice_rolls for
select using (
    channel_id in (
      select channel_id
      from public.channel_members
      where public.channel_members.user_id = user_id
    )
  );
create policy "Allow individual read access to channel_members that also belong to the user" on channel_members for
select using (
    channel_id in (
      select get_channels_for_authenticated_user()
    )
  );
-- create policy "Allow individual insert access" on public.dice_rolls for
-- insert with check (
--     auth.uid() = user_id
--     and channel_id in (
--       select channel_id
--       from public.channel_members
--       where public.channel_members.channel_id = channel_id
--         and public.channel_members.user_id = user_id
--     )
--   );
-- create policy "Allow individual update access" on public.dice_rolls for update using ( auth.uid() = user_id );
-- create policy "Allow individual delete access" on public.dice_rolls for delete using ( auth.uid() = user_id );
-- create policy "Allow authorized delete access" on public.dice_rolls for delete using ( authorize('messages.delete', auth.uid()) );
-- create policy "Allow individual read access" on public.user_roles for select using ( auth.uid() = user_id );
-- inserts a row into public.users and assigns roles
create function public.handle_new_user() returns trigger as $$ begin
insert into public.users (id, display_name)
values (
    new.id,
    new.raw_user_meta_data::json->>'display_name'
  );
return new;
end;
$$ language plpgsql security definer;
-- trigger the function every time a user is created
create trigger on_auth_user_created
after
insert on auth.users for each row execute procedure public.handle_new_user();
-- Send "previous data" on change 
alter table public.users replica identity full;
alter table public.dice_rolls replica identity full;
/**
 * REALTIME SUBSCRIPTIONS
 * Only allow realtime listening on public tables.
 */
begin;
-- remove the realtime publication
drop publication if exists supabase_realtime;
-- re-create the publication but don't enable it for any tables
create publication supabase_realtime;
commit;
-- add tables to the publicationhttp://localhost:3000/room/zxcvbn
alter publication supabase_realtime
add table public.dice_rolls;
alter publication supabase_realtime
add table public.users;