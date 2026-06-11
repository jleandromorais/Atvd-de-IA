import { AlertTriangle } from 'lucide-react'

interface ConfirmDialogProps {
  title: string
  description: string
  confirmLabel?: string
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  title,
  description,
  confirmLabel = 'Excluir',
  loading,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fadeIn">
      <div className="card w-full max-w-sm animate-scaleIn">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-rose-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm text-gray-400">{description}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onCancel} className="btn-secondary" disabled={loading}>
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Excluindo...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
