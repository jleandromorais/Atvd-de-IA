export type TaskStatus = 'pending' | 'in_progress' | 'completed'

export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  user_id: string
  title: string
  description: string | null
  category: string | null
  status: TaskStatus
  priority: TaskPriority
  estimated_time: number | null
  created_at: string
}

export interface TaskFormData {
  title: string
  description: string
  category: string
  status: TaskStatus
  priority: TaskPriority
  estimated_time: string
}

export interface TaskStats {
  total: number
  completed: number
  pending: number
  inProgress: number
  totalEstimatedTime: number
}

export type TaskFilter = 'all' | TaskStatus
