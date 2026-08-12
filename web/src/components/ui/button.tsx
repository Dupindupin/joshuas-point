import type {ButtonHTMLAttributes} from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'quiet'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-ink bg-ink text-canvas hover:border-accent hover:bg-accent hover:text-canvas',
  secondary:
    'border-ink bg-transparent text-ink hover:bg-ink hover:text-canvas',
  quiet:
    'border-transparent bg-transparent text-ink underline decoration-border underline-offset-4 hover:decoration-ink',
}

export function Button({
  className = '',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center rounded-full border px-6 py-3 font-body text-sm font-semibold tracking-[0.01em] transition-colors duration-[var(--jp-motion-duration-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-45 ${variantClasses[variant]} ${className}`}
      type={type}
      {...props}
    />
  )
}
