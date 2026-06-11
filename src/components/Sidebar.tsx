import { LayoutDashboard, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Logo } from './Logo'
import { useAuth } from '../contexts/AuthContext'

export function Sidebar() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface px-4 py-6 lg:flex">
      <div className="px-2">
        <Logo />
      </div>

      <nav className="mt-10 flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2.5 text-sm font-medium text-primary">
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </div>
      </nav>

      <button
        onClick={handleSignOut}
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-surface-light hover:text-rose-400"
      >
        <LogOut className="h-5 w-5" />
        Sair
      </button>
    </aside>
  )
}
