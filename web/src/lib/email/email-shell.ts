import type {EmailBrand, EmailPurpose} from './types'

export const defaultEmailBrand: EmailBrand = {
  contactEmail: 'mail@joshuaspoint.com',
  location: 'Calango, Zamboanguita, Negros Oriental, Philippines',
  logoUrl: 'https://joshuaspoint.com/brand/logo-horizontal.png',
  siteName: "Joshua's Point",
  siteUrl: 'https://joshuaspoint.com',
  socialLinks: [],
}

export function escapeEmailHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function link(url: string, label: string, className = '') {
  return `<a class="${className}" href="${escapeEmailHtml(url)}" style="color:#1f3d3a;text-decoration:underline;text-decoration-color:#c8a26a;text-underline-offset:3px;overflow-wrap:anywhere;word-break:break-word">${escapeEmailHtml(label)}</a>`
}

export function emailButton(url: string, label: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0"><tr><td bgcolor="#1f3d3a" style="border-radius:999px;mso-padding-alt:13px 24px"><a href="${escapeEmailHtml(url)}" style="display:inline-block;padding:13px 24px;color:#f3ede6;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;letter-spacing:.08em;text-decoration:none;text-transform:uppercase">${escapeEmailHtml(label)}</a></td></tr></table>`
}

export function emailParagraph(content: string) {
  return `<p class="email-copy" style="margin:0 0 20px;color:#282828;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.7;overflow-wrap:anywhere;word-break:break-word">${content}</p>`
}

export function emailHeading(content: string) {
  return `<h1 style="margin:0 0 26px;color:#1f3d3a;font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:400;line-height:1.15">${escapeEmailHtml(content)}</h1>`
}

export function emailDetails(rows: Array<[string, string] | [string, string, string]>) {
  return `<table class="email-details" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;border-top:1px solid #d8cec0">${rows
    .map(
      ([label, value, valueHtml]) =>
        `<tr><td class="detail-label" style="width:34%;padding:12px 12px 12px 0;border-bottom:1px solid #d8cec0;color:#496b5b;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;vertical-align:top">${escapeEmailHtml(label)}</td><td class="detail-value" style="padding:12px 0;border-bottom:1px solid #d8cec0;color:#282828;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.5;vertical-align:top;overflow-wrap:anywhere;word-break:break-word">${valueHtml ?? escapeEmailHtml(value).replaceAll('\n', '<br />')}</td></tr>`,
    )
    .join('')}</table>`
}

export function emailInformationBlock(title: string, lines: readonly string[]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f3ede6" style="margin:28px 0;border-left:3px solid #c8a26a"><tr><td style="padding:18px 20px"><p style="margin:0 0 8px;color:#496b5b;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase">${escapeEmailHtml(title)}</p><p class="email-copy" style="margin:0;color:#282828;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.65">${lines.map(escapeEmailHtml).join('<br>')}</p></td></tr></table>`
}

export function emailFallbackUrl(url: string) {
  return `<p class="email-copy" style="margin:0 0 20px;color:#496b5b;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6">If the button does not open, copy this address:<br>${link(url, url)}</p>`
}

export function renderEmailShell({
  brand = defaultEmailBrand,
  content,
  preheader,
  purpose = 'transactional',
}: {
  brand?: EmailBrand
  content: string
  preheader: string
  purpose?: EmailPurpose
}) {
  const baseUrl = brand.siteUrl.replace(/\/$/, '')
  const navigation = [
    ['The House', '/the-house'],
    ['Destinations', '/destinations'],
    ['Dive Sites', '/dive-sites'],
    ['Getting Here', '/getting-here'],
    ['FAQ', '/faq'],
  ] as const
  const footerNavigation =
    purpose === 'subscription' ? ([['Joshua’s Point', '/']] as const) : navigation
  const social = brand.socialLinks.map(({label, url}) => link(url, label)).join(' &nbsp;·&nbsp; ')

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><meta name="supported-color-schemes" content="light dark"><title>${escapeEmailHtml(brand.siteName)}</title><style>
@media screen and (max-width:520px){.email-outer{padding:12px 6px!important}.email-header{padding:28px 22px 24px!important}.email-content{padding:34px 24px 30px!important}.email-footer{padding:26px 24px!important;font-size:13px!important}.email-details,.email-details tbody,.email-details tr,.email-details td{display:block!important;width:100%!important}.detail-label{padding:12px 0 3px!important;border-bottom:0!important}.detail-value{padding:0 0 12px!important}.footer-link{display:inline-block!important;margin:4px 7px!important}}
@media (prefers-color-scheme:dark){.email-body{background:#191c1a!important}.email-card{background:#202420!important;border-color:#496b5b!important}.email-content,.email-copy,.detail-value{color:#f3ede6!important}.email-content h1{color:#f3ede6!important}.email-details,.detail-value{border-color:#496b5b!important}.email-footer{background:#14211f!important;color:#f3ede6!important}.email-footer a{color:#f3ede6!important}}
</style></head>
<body style="margin:0;padding:0;background:#f3ede6;color:#282828">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeEmailHtml(preheader)}</div>
<table class="email-body" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f3ede6"><tr><td class="email-outer" align="center" style="padding:24px 12px">
<table class="email-card" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:640px;background:#faf7f2;border:1px solid #ded5c9">
<tr><td class="email-header" align="center" style="padding:38px 32px 30px;border-bottom:1px solid #ded5c9"><a href="${escapeEmailHtml(baseUrl)}"><img src="${escapeEmailHtml(brand.logoUrl)}" width="300" alt="${escapeEmailHtml(brand.siteName)}" style="display:block;width:100%;max-width:300px;height:auto;border:0"></a></td></tr>
<tr><td class="email-content" style="padding:44px 40px 38px;color:#282828">${content}</td></tr>
<tr><td class="email-footer" bgcolor="#e9e1d6" style="padding:30px 40px;color:#496b5b;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.8;text-align:center">
<p style="margin:0 0 12px">${purpose === 'subscription' ? 'Joshua’s Point updates' : 'A message about your Joshua’s Point enquiry'}</p>
<p style="margin:0 0 12px">${footerNavigation.map(([label, path]) => link(`${baseUrl}${path}`, label, 'footer-link')).join(' &nbsp;·&nbsp; ')}</p>
${social ? `<p style="margin:0 0 12px">${social}</p>` : ''}
<p style="margin:0">${escapeEmailHtml(brand.location)}<br>${link(baseUrl, brand.siteName)} &nbsp;·&nbsp; ${link(`mailto:${brand.contactEmail}`, brand.contactEmail)}</p>
</td></tr></table></td></tr></table></body></html>`
}
