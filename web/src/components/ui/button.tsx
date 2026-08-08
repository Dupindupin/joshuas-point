import type {ButtonHTMLAttributes} from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'quiet'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-atmosphere-text bg-atmosphere-text text-atmosphere-canvas hover:border-atmosphere-accent hover:bg-atmosphere-accent',
  secondary:
    'border-atmosphere-text bg-transparent text-atmosphere-text hover:bg-atmosphere-text hover:text-atmosphere-canvas',
  quiet:
    'border-transparent bg-transparent text-atmosphere-text underline decoration-atmosphere-border underline-offset-4 hover:decoration-atmosphere-text',
}

export function Button({
  className = '',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center rounded-full border px-6 py-3 font-body text-sm font-semibold tracking-[0.01em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-atmosphere-brand disabled:cursor-not-allowed disabled:opacity-45 ${variantClasses[variant]} ${className}`}
      type={type}
      {...props}
    />
  )
}
