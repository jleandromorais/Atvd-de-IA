import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { AuthLayout } from '../layouts/AuthLayout'
import { useAuth } from '../contexts/AuthContext'

export function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error)
      setLoading(false)
      return
    }

    const from = (location.state as { from?: string })?.from ?? '/dashboard'
    navigate(from, { replace: true })
  }

  return (
    <AuthLayout title="Bem-vindo de volta" subtitle="Entre para continuar produtivo">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-400">
            {error}
          </div>
        )}

        <div>
          <label className="label" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="voce@exemplo.com"
            autoComplete="email"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="label" htmlFor="password">
              Senha
            </label>
            <Link to="/forgot-password" className="mb-1.5 text-xs font-medium text-primary hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pr-10"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn-primary mt-2" disabled={loading}>
          <LogIn className="h-4 w-4" />
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Não tem uma conta?{' '}
        <Link to="/register" className="font-medium text-primary hover:underline">
          Cadastre-se
        </Link>
      </p>
    </AuthLayout>
  )
}
