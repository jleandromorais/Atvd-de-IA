import type { ReactNode } from 'react'
import { Logo } from '../components/Logo'

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        style={{
          background:
            'radial-gradient(600px circle at 50% 0%, rgba(57, 255, 136, 0.08), transparent 70%)',
        }}
      />
      <div className="w-full max-w-md animate-fadeIn">
        <div className="mb-8 flex justify-center">
          <Logo size="lg" />
        </div>
        <div className="card">
          <div className="mb-6 text-center">
            <h1 className="text-xl font-bold text-white">{title}</h1>
            <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
