import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { TaskPriority, TaskStatus } from '../types'

export function formatDate(date: string): string {
  return format(new Date(date), "dd 'de' MMM, yyyy", { locale: ptBR })
}

export function formatRelativeDate(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ptBR })
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}min`
  const hours = Math.floor(minutes / 60)
  const remaining = minutes % 60
  return remaining === 0 ? `${hours}h` : `${hours}h ${remaining}min`
}

export const statusLabels: Record<TaskStatus, string> = {
  pending: 'Pendente',
  in_progress: 'Em andamento',
  completed: 'Concluído',
}

export const priorityLabels: Record<TaskPriority, string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
}

export const statusStyles: Record<TaskStatus, string> = {
  pending: 'bg-gray-500/10 text-gray-300 border-gray-500/30',
  in_progress: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  completed: 'bg-primary/10 text-primary border-primary/30',
}

export const priorityStyles: Record<TaskPriority, string> = {
  low: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  high: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
}
