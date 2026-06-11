import { Search } from 'lucide-react'
import type { TaskFilter } from '../types'
import { statusLabels } from '../utils/formatters'

interface TaskFiltersProps {
  filter: TaskFilter
  onFilterChange: (filter: TaskFilter) => void
  search: string
  onSearchChange: (search: string) => void
}

const filters: TaskFilter[] = ['all', 'pending', 'in_progress', 'completed']

const filterLabels: Record<TaskFilter, string> = {
  all: 'Todas',
  ...statusLabels,
}

export function TaskFilters({ filter, onFilterChange, search, onSearchChange }: TaskFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => onFilterChange(item)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              filter === item
                ? 'bg-primary/15 text-primary'
                : 'text-gray-400 hover:bg-surface-light hover:text-gray-200'
            }`}
          >
            {filterLabels[item]}
          </button>
        ))}
      </div>
      <div className="relative w-full sm:w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar tarefas..."
          className="input-field pl-9"
        />
      </div>
    </div>
  )
}
