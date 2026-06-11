import { Zap } from 'lucide-react'

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { box: 'h-7 w-7', icon: 'h-4 w-4', text: 'text-base' },
    md: { box: 'h-9 w-9', icon: 'h-5 w-5', text: 'text-xl' },
    lg: { box: 'h-12 w-12', icon: 'h-6 w-6', text: 'text-2xl' },
  }[size]

  return (
    <div className="flex items-center gap-2.5">
      <div className={`flex ${sizes.box} items-center justify-center rounded-xl bg-primary/10 text-primary shadow-glow`}>
        <Zap className={sizes.icon} fill="currentColor" />
      </div>
      <span className={`${sizes.text} font-bold tracking-tight text-white`}>
        Focus<span className="text-primary">Flow</span>
      </span>
    </div>
  )
}
