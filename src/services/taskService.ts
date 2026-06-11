import { supabase } from '../lib/supabase'
import type { Task, TaskFormData } from '../types'

export async function fetchTasks(userId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function createTask(userId: string, form: TaskFormData): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .insert({
      user_id: userId,
      title: form.title.trim(),
      description: form.description.trim() || null,
      category: form.category.trim() || null,
      status: form.status,
      priority: form.priority,
      estimated_time: form.estimated_time ? Number(form.estimated_time) : null,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateTask(taskId: string, form: TaskFormData): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .update({
      title: form.title.trim(),
      description: form.description.trim() || null,
      category: form.category.trim() || null,
      status: form.status,
      priority: form.priority,
      estimated_time: form.estimated_time ? Number(form.estimated_time) : null,
    })
    .eq('id', taskId)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateTaskStatus(taskId: string, status: Task['status']): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .update({ status })
    .eq('id', taskId)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteTask(taskId: string): Promise<void> {
  const { error } = await supabase.from('tasks').delete().eq('id', taskId)
  if (error) throw new Error(error.message)
}
