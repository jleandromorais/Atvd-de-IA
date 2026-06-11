import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Logo } from './Logo'

export function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  const initial = user?.email?.[0]?.toUpperCase() ?? '?'

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-surface/80 px-4 py-4 backdrop-blur-md sm:px-6">
      <div className="lg:hidden">
        <Logo size="sm" />
      </div>

      <div className="hidden lg:block">
        <h1 className="text-lg font-semibold text-white">Visão geral</h1>
        <p className="text-sm text-gray-400">Acompanhe suas tarefas e produtividade</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {initial}
          </div>
          <span className="max-w-[160px] truncate text-sm text-gray-300">{user?.email}</span>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center justify-center rounded-lg p-2 text-gray-400 transition-colors hover:bg-surface-light hover:text-rose-400 lg:hidden"
          aria-label="Sair"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
