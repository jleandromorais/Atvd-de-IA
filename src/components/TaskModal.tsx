import { useEffect, useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import type { Task, TaskFormData } from '../types'
import { priorityLabels, statusLabels } from '../utils/formatters'

interface TaskModalProps {
  task?: Task | null
  onClose: () => void
  onSubmit: (form: TaskFormData) => Promise<void>
}

const emptyForm: TaskFormData = {
  title: '',
  description: '',
  category: '',
  status: 'pending',
  priority: 'medium',
  estimated_time: '',
}

export function TaskModal({ task, onClose, onSubmit }: TaskModalProps) {
  const [form, setForm] = useState<TaskFormData>(emptyForm)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description ?? '',
        category: task.category ?? '',
        status: task.status,
        priority: task.priority,
        estimated_time: task.estimated_time != null ? String(task.estimated_time) : '',
      })
    } else {
      setForm(emptyForm)
    }
  }, [task])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('O título é obrigatório.')
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      await onSubmit(form)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar tarefa.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fadeIn">
      <div className="card max-h-[90vh] w-full max-w-lg overflow-y-auto animate-scaleIn">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">{task ? 'Editar tarefa' : 'Nova tarefa'}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-surface-light hover:text-gray-200"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-400">
              {error}
            </div>
          )}

          <div>
            <label className="label" htmlFor="title">
              Título *
            </label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input-field"
              placeholder="Ex: Finalizar relatório mensal"
              autoFocus
            />
          </div>

          <div>
            <label className="label" htmlFor="description">
              Descrição
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input-field min-h-[80px] resize-none"
              placeholder="Detalhes sobre a tarefa..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="category">
                Categoria
              </label>
              <input
                id="category"
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="input-field"
                placeholder="Ex: Trabalho"
              />
            </div>
            <div>
              <label className="label" htmlFor="estimated_time">
                Tempo estimado (min)
              </label>
              <input
                id="estimated_time"
                type="number"
                min="0"
                value={form.estimated_time}
                onChange={(e) => setForm({ ...form, estimated_time: e.target.value })}
                className="input-field"
                placeholder="Ex: 60"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as TaskFormData['status'] })}
                className="input-field"
              >
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="priority">
                Prioridade
              </label>
              <select
                id="priority"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as TaskFormData['priority'] })}
                className="input-field"
              >
                {Object.entries(priorityLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn-secondary" disabled={submitting}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Salvando...' : task ? 'Salvar alterações' : 'Criar tarefa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
