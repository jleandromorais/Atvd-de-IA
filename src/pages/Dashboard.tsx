import { useState } from 'react'
import { CheckCircle2, Clock, ListTodo, Loader2, Plus, AlertCircle, ClipboardList } from 'lucide-react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { StatCard } from '../components/StatCard'
import { TaskCard } from '../components/TaskCard'
import { TaskFilters } from '../components/TaskFilters'
import { TaskModal } from '../components/TaskModal'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { useTasks } from '../hooks/useTasks'
import { formatMinutes } from '../utils/formatters'
import type { Task, TaskFilter, TaskFormData } from '../types'

export function Dashboard() {
  const { loading, error, stats, addTask, editTask, changeStatus, removeTask, filterTasks } = useTasks()

  const [filter, setFilter] = useState<TaskFilter>('all')
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)
  const [deleting, setDeleting] = useState(false)

  const filteredTasks = filterTasks(filter, search)

  function openCreateModal() {
    setEditingTask(null)
    setModalOpen(true)
  }

  function openEditModal(task: Task) {
    setEditingTask(task)
    setModalOpen(true)
  }

  async function handleSubmit(form: TaskFormData) {
    if (editingTask) {
      await editTask(editingTask.id, form)
    } else {
      await addTask(form)
    }
  }

  async function handleConfirmDelete() {
    if (!taskToDelete) return
    setDeleting(true)
    try {
      await removeTask(taskToDelete.id)
      setTaskToDelete(null)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div className="lg:hidden">
            <h1 className="text-lg font-semibold text-white">Visão geral</h1>
            <p className="text-sm text-gray-400">Acompanhe suas tarefas</p>
          </div>
          <button onClick={openCreateModal} className="btn-primary ml-auto">
            <Plus className="h-4 w-4" />
            Nova tarefa
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total de tarefas" value={stats.total} icon={ListTodo} accent="primary" />
          <StatCard label="Concluídas" value={stats.completed} icon={CheckCircle2} accent="primary" />
          <StatCard label="Pendentes" value={stats.pending} icon={AlertCircle} accent="amber" />
          <StatCard label="Tempo total estimado" value={formatMinutes(stats.totalEstimatedTime)} icon={Clock} accent="sky" />
        </div>

        <div className="card">
          <div className="mb-5">
            <TaskFilters filter={filter} onFilterChange={setFilter} search={search} onSearchChange={setSearch} />
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-sm">Carregando tarefas...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-rose-400">
              <AlertCircle className="h-6 w-6" />
              <p className="text-sm">{error}</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-gray-400">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-light">
                <ClipboardList className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium text-gray-300">Nenhuma tarefa encontrada</p>
                <p className="text-sm">Crie uma nova tarefa para começar a organizar seu tempo.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={openEditModal}
                  onDelete={setTaskToDelete}
                  onStatusChange={changeStatus}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <TaskModal task={editingTask} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} />
      )}

      {taskToDelete && (
        <ConfirmDialog
          title="Excluir tarefa"
          description={`Tem certeza que deseja excluir "${taskToDelete.title}"? Essa ação não pode ser desfeita.`}
          loading={deleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </DashboardLayout>
  )
}
