'use client'

import {useState, useSyncExternalStore} from 'react'

type ShareControlsProps = {
  title: string
  url: string
}

const subscribeToBrowserCapability = () => () => undefined

function getNativeShareSupport() {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function'
}

function getServerNativeShareSupport() {
  return false
}

async function copyWithFallback(value: string) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(value)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()

  const copied = document.execCommand('copy')
  textarea.remove()

  if (!copied) throw new Error('Copy was not available.')
}

const actionClassName =
  'inline-flex min-h-11 items-center rounded-sm border-b border-ink/25 px-0.5 font-body text-xs font-medium uppercase tracking-[0.16em] text-ink-muted transition-colors duration-150 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus motion-reduce:transition-none'

export function ShareControls({title, url}: ShareControlsProps) {
  const [status, setStatus] = useState('')
  const supportsNativeShare = useSyncExternalStore(
    subscribeToBrowserCapability,
    getNativeShareSupport,
    getServerNativeShareSupport,
  )
  const encodedUrl = encodeURIComponent(url)
  const encodedWhatsAppMessage = encodeURIComponent(`${title}\n${url}`)

  async function handleCopy() {
    try {
      await copyWithFallback(url)
      setStatus('Link copied.')
    } catch {
      setStatus('The link could not be copied. You can copy it from the browser address bar.')
    }
  }

  async function handleNativeShare() {
    try {
      await navigator.share({title, url})
      setStatus('Share sheet opened.')
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setStatus('Sharing is not available right now. You can copy the link instead.')
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {supportsNativeShare ? (
          <button
            aria-label={`Share ${title} using your device`}
            className={actionClassName}
            onClick={handleNativeShare}
            type="button"
          >
            Share
          </button>
        ) : null}
        <a
          aria-label={`Share ${title} on WhatsApp (opens in a new tab)`}
          className={actionClassName}
          href={`https://wa.me/?text=${encodedWhatsAppMessage}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          WhatsApp
        </a>
        <a
          aria-label={`Share ${title} on Facebook (opens in a new tab)`}
          className={actionClassName}
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Facebook
        </a>
        <button
          aria-label={`Copy link to ${title}`}
          className={actionClassName}
          onClick={handleCopy}
          type="button"
        >
          Copy link
        </button>
      </div>
      <p aria-atomic="true" aria-live="polite" className="sr-only" role="status">
        {status}
      </p>
    </div>
  )
}
