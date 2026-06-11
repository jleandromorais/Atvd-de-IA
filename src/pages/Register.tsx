import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, UserPlus, CheckCircle2 } from 'lucide-react'
import { AuthLayout } from '../layouts/AuthLayout'
import { useAuth } from '../contexts/AuthContext'

export function Register() {
  const { signUp } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    setLoading(true)
    const { error } = await signUp(email, password)
    setLoading(false)

    if (error) {
      setError(error)
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <AuthLayout title="Verifique seu e-mail" subtitle="Falta pouco para começar">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <p className="text-sm text-gray-300">
            Enviamos um link de confirmação para <span className="font-medium text-white">{email}</span>. Verifique sua
            caixa de entrada para ativar sua conta.
          </p>
          <Link to="/login" className="btn-primary w-full">
            Voltar para o login
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Crie sua conta" subtitle="Comece a organizar suas tarefas hoje mesmo">
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
          <label className="label" htmlFor="password">
            Senha
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pr-10"
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
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

        <div>
          <label className="label" htmlFor="confirmPassword">
            Confirmar senha
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </div>

        <button type="submit" className="btn-primary mt-2" disabled={loading}>
          <UserPlus className="h-4 w-4" />
          {loading ? 'Criando conta...' : 'Criar conta'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Já tem uma conta?{' '}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Entrar
        </Link>
      </p>
    </AuthLayout>
  )
}
