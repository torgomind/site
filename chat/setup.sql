create table public.chat_messages (
	id bigint generated always as identity primary key,
	created_at timestamptz not null default now(),
	uid uuid not null default auth.uid(),
	name text not null check (char_length(name) between 1 and 40),
	body text not null check (char_length(body) between 1 and 500)
);

alter table public.chat_messages enable row level security;

grant select on public.chat_messages to anon, authenticated;
grant insert (name, body) on public.chat_messages to authenticated;

create policy "chat read" on public.chat_messages
	for select to anon, authenticated
	using (true);

create policy "chat insert own" on public.chat_messages
	for insert to authenticated
	with check (uid = auth.uid());

alter publication supabase_realtime add table public.chat_messages;
