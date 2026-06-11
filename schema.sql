-- ============================================================
-- FocusFlow - Schema do banco de dados (Supabase / PostgreSQL)
-- ============================================================
-- Como usar:
-- 1. Acesse seu projeto no https://supabase.com
-- 2. Vá em "SQL Editor"
-- 3. Cole todo o conteúdo deste arquivo e execute (RUN)
-- ============================================================

-- Extensão necessária para gerar UUIDs
create extension if not exists "pgcrypto";

-- ============================================================
-- Tabela: tasks
-- ============================================================
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  description text,
  category text,
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'completed')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  estimated_time integer check (estimated_time is null or estimated_time >= 0),
  created_at timestamptz not null default now()
);

-- Índices para melhorar performance das consultas mais comuns
create index if not exists tasks_user_id_idx on public.tasks (user_id);
create index if not exists tasks_status_idx on public.tasks (status);
create index if not exists tasks_created_at_idx on public.tasks (created_at desc);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
alter table public.tasks enable row level security;

-- Garante que cada usuário só pode ver suas próprias tarefas
create policy "Usuários podem ver suas próprias tarefas"
  on public.tasks
  for select
  using (auth.uid() = user_id);

-- Garante que cada usuário só pode criar tarefas para si mesmo
create policy "Usuários podem criar suas próprias tarefas"
  on public.tasks
  for insert
  with check (auth.uid() = user_id);

-- Garante que cada usuário só pode atualizar suas próprias tarefas
create policy "Usuários podem atualizar suas próprias tarefas"
  on public.tasks
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Garante que cada usuário só pode excluir suas próprias tarefas
create policy "Usuários podem excluir suas próprias tarefas"
  on public.tasks
  for delete
  using (auth.uid() = user_id);
