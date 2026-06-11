import { Clock, Pencil, Trash2, Tag } from 'lucide-react'
import type { Task, TaskStatus } from '../types'
import {
  formatMinutes,
  formatRelativeDate,
  priorityLabels,
  priorityStyles,
  statusLabels,
  statusStyles,
} from '../utils/formatters'

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onStatusChange: (taskId: string, status: TaskStatus) => void
}

const statusOrder: TaskStatus[] = ['pending', 'in_progress', 'completed']

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  return (
    <div className="card group flex flex-col gap-3 transition-colors hover:border-primary/30 animate-fadeIn">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-white">{task.title}</h3>
          {task.description && (
            <p className="mt-1 line-clamp-2 text-sm text-gray-400">{task.description}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(task)}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-surface-light hover:text-primary"
            aria-label="Editar tarefa"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
            aria-label="Excluir tarefa"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[task.status]}`}>
          {statusLabels[task.status]}
        </span>
        <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${priorityStyles[task.priority]}`}>
          Prioridade {priorityLabels[task.priority]}
        </span>
        {task.category && (
          <span className="flex items-center gap-1 rounded-full border border-border bg-surface-light px-2.5 py-1 text-xs text-gray-300">
            <Tag className="h-3 w-3" />
            {task.category}
          </span>
        )}
        {task.estimated_time != null && (
          <span className="flex items-center gap-1 rounded-full border border-border bg-surface-light px-2.5 py-1 text-xs text-gray-300">
            <Clock className="h-3 w-3" />
            {formatMinutes(task.estimated_time)}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
        <span className="text-xs text-gray-500">{formatRelativeDate(task.created_at)}</span>
        <div className="flex items-center gap-1">
          {statusOrder.map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(task.id, status)}
              disabled={task.status === status}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                task.status === status
                  ? 'cursor-default bg-primary/15 text-primary'
                  : 'text-gray-400 hover:bg-surface-light hover:text-gray-200'
              }`}
            >
              {statusLabels[status]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
