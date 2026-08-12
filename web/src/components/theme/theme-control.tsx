'use client'

import {useId, useSyncExternalStore} from 'react'

import {themeStorageKey, type ResolvedTheme, type ThemePreference} from '@/lib/theme'

type ThemeControlProps = {
  className?: string
  tone?: 'default' | 'inverse'
}

const options: readonly {label: string; value: ThemePreference}[] = [
  {label: 'Light', value: 'light'},
  {label: 'Dark', value: 'dark'},
  {label: 'System', value: 'system'},
]

const toneClasses = {
  default: {
    control: 'border-border bg-surface-soft',
    option:
      'text-ink-subtle peer-checked:bg-ink peer-checked:text-canvas hover:text-ink peer-focus-visible:outline-focus',
  },
  inverse: {
    control: 'border-inverse/20 bg-inverse/6',
    option:
      'text-inverse/58 peer-checked:bg-inverse peer-checked:text-inverse-surface hover:text-inverse peer-focus-visible:outline-evening-accent',
  },
} as const

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference !== 'system') return preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(preference: ThemePreference, persist = true) {
  const resolved = resolveTheme(preference)
  const root = document.documentElement

  root.dataset.theme = resolved
  root.dataset.themePreference = preference
  root.style.colorScheme = resolved

  if (persist) {
    try {
      window.localStorage.setItem(themeStorageKey, preference)
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
  }

  window.dispatchEvent(
    new CustomEvent('jp-theme-change', {detail: {preference, resolved}}),
  )
}

function getThemePreference(): ThemePreference {
  const preference = document.documentElement.dataset.themePreference
  return preference === 'light' || preference === 'dark' || preference === 'system'
    ? preference
    : 'system'
}

function subscribeToTheme(onStoreChange: () => void) {
  const media = window.matchMedia('(prefers-color-scheme: dark)')

  function handleSystemChange() {
    if (document.documentElement.dataset.themePreference === 'system') {
      applyTheme('system', false)
    }
  }

  media.addEventListener('change', handleSystemChange)
  window.addEventListener('jp-theme-change', onStoreChange)
  return () => {
    media.removeEventListener('change', handleSystemChange)
    window.removeEventListener('jp-theme-change', onStoreChange)
  }
}

export function ThemeControl({className = '', tone = 'default'}: ThemeControlProps) {
  const name = useId()
  const preference = useSyncExternalStore(subscribeToTheme, getThemePreference, () => 'system')

  return (
    <fieldset className={className}>
      <legend className="sr-only">Color theme: choose light, dark, or follow the system</legend>
      <div
        className={`inline-flex rounded-full border p-1 ${toneClasses[tone].control}`}
        data-theme-control
      >
        {options.map((option) => (
          <label className="cursor-pointer" key={option.value}>
            <input
              checked={preference === option.value}
              className="peer sr-only"
              name={name}
              onChange={() => {
                applyTheme(option.value)
              }}
              type="radio"
              value={option.value}
            />
            <span
              className={`flex min-h-10 items-center rounded-full px-3 font-body text-[0.6875rem] font-semibold tracking-[0.04em] transition-colors duration-[var(--jp-motion-duration-hover)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 ${toneClasses[tone].option}`}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
