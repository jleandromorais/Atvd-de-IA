import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import * as taskService from '../services/taskService'
import type { Task, TaskFormData, TaskFilter, TaskStats } from '../types'

export function useTasks() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadTasks = useCallback(async () => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const data = await taskService.fetchTasks(user.id)
      setTasks(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar tarefas')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  async function addTask(form: TaskFormData) {
    if (!user) return
    const newTask = await taskService.createTask(user.id, form)
    setTasks((prev) => [newTask, ...prev])
  }

  async function editTask(taskId: string, form: TaskFormData) {
    const updated = await taskService.updateTask(taskId, form)
    setTasks((prev) => prev.map((task) => (task.id === taskId ? updated : task)))
  }

  async function changeStatus(taskId: string, status: Task['status']) {
    const updated = await taskService.updateTaskStatus(taskId, status)
    setTasks((prev) => prev.map((task) => (task.id === taskId ? updated : task)))
  }

  async function removeTask(taskId: string) {
    await taskService.deleteTask(taskId)
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const stats: TaskStats = useMemo(() => {
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.status === 'completed').length,
      pending: tasks.filter((t) => t.status === 'pending').length,
      inProgress: tasks.filter((t) => t.status === 'in_progress').length,
      totalEstimatedTime: tasks.reduce((sum, t) => sum + (t.estimated_time ?? 0), 0),
    }
  }, [tasks])

  function filterTasks(filter: TaskFilter, search: string): Task[] {
    return tasks.filter((task) => {
      const matchesFilter = filter === 'all' || task.status === filter
      const matchesSearch =
        search.trim() === '' ||
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        (task.category ?? '').toLowerCase().includes(search.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }

  return {
    tasks,
    loading,
    error,
    stats,
    addTask,
    editTask,
    changeStatus,
    removeTask,
    filterTasks,
    refresh: loadTasks,
  }
}
