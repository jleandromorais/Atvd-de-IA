import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  accent?: 'primary' | 'amber' | 'sky' | 'gray'
}

const accentStyles: Record<NonNullable<StatCardProps['accent']>, string> = {
  primary: 'bg-primary/10 text-primary',
  amber: 'bg-amber-500/10 text-amber-400',
  sky: 'bg-sky-500/10 text-sky-400',
  gray: 'bg-gray-500/10 text-gray-300',
}

export function StatCard({ label, value, icon: Icon, accent = 'primary' }: StatCardProps) {
  return (
    <div className="card flex items-center gap-4 transition-transform hover:-translate-y-0.5">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accentStyles[accent]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  )
}
