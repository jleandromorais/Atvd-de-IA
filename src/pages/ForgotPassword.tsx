import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react'
import { AuthLayout } from '../layouts/AuthLayout'
import { useAuth } from '../contexts/AuthContext'

export function ForgotPassword() {
  const { resetPassword } = useAuth()

  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await resetPassword(email)
    setLoading(false)

    if (error) {
      setError(error)
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <AuthLayout title="Verifique seu e-mail" subtitle="Enviamos as instruções de recuperação">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <p className="text-sm text-gray-300">
            Se existir uma conta para <span className="font-medium text-white">{email}</span>, você receberá um link
            para redefinir sua senha.
          </p>
          <Link to="/login" className="btn-primary w-full">
            Voltar para o login
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Recuperar senha" subtitle="Enviaremos um link para redefinir sua senha">
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

        <button type="submit" className="btn-primary mt-2" disabled={loading}>
          <Mail className="h-4 w-4" />
          {loading ? 'Enviando...' : 'Enviar link de recuperação'}
        </button>
      </form>

      <Link to="/login" className="mt-6 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-400 hover:text-primary">
        <ArrowLeft className="h-4 w-4" />
        Voltar para o login
      </Link>
    </AuthLayout>
  )
}
