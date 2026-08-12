import {MotionReveal} from './motion-reveal'

type HorizonLineProps = {
  className?: string
  tone?: 'default' | 'inverse'
}

export function HorizonLine({className = '', tone = 'default'}: HorizonLineProps) {
  return (
    <MotionReveal
      aria-hidden="true"
      className={`h-6 w-full max-w-56 ${tone === 'inverse' ? 'text-inverse/34' : 'text-accent/48'} ${className}`}
      direction="none"
    >
      <svg className="h-full w-full" fill="none" viewBox="0 0 224 24">
        <path
          className="jp-horizon-path"
          d="M1 15.5C34 15.5 47 9.5 76 10.5C107 11.5 119 16.5 151 14.5C177 13 193 8.5 223 9.5"
          pathLength="1"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1"
        />
      </svg>
    </MotionReveal>
  )
}
