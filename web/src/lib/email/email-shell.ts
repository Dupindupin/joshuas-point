import type {EmailBrand} from './types'

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

function link(url: string, label: string) {
  return `<a href="${escapeEmailHtml(url)}" style="color:#1f3d3a;text-decoration:underline;text-decoration-color:#c8a26a;text-underline-offset:3px">${escapeEmailHtml(label)}</a>`
}

export function emailButton(url: string, label: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0"><tr><td bgcolor="#1f3d3a" style="border-radius:999px"><a href="${escapeEmailHtml(url)}" style="display:inline-block;padding:13px 24px;color:#f3ede6;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;letter-spacing:.08em;text-decoration:none;text-transform:uppercase">${escapeEmailHtml(label)}</a></td></tr></table>`
}

export function emailParagraph(content: string) {
  return `<p style="margin:0 0 20px;color:#282828;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.7">${content}</p>`
}

export function emailHeading(content: string) {
  return `<h1 style="margin:0 0 26px;color:#1f3d3a;font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:400;line-height:1.15">${escapeEmailHtml(content)}</h1>`
}

export function emailDetails(rows: Array<[string, string]>) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;border-top:1px solid #d8cec0">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="width:34%;padding:12px 12px 12px 0;border-bottom:1px solid #d8cec0;color:#496b5b;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;vertical-align:top">${escapeEmailHtml(label)}</td><td style="padding:12px 0;border-bottom:1px solid #d8cec0;color:#282828;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.5;vertical-align:top">${escapeEmailHtml(value).replaceAll('\n', '<br />')}</td></tr>`,
    )
    .join('')}</table>`
}

export function renderEmailShell({
  brand = defaultEmailBrand,
  content,
  preheader,
}: {
  brand?: EmailBrand
  content: string
  preheader: string
}) {
  const baseUrl = brand.siteUrl.replace(/\/$/, '')
  const navigation = [
    ['The House', '/the-house'],
    ['Destinations', '/destinations'],
    ['Dive Sites', '/dive-sites'],
    ['Getting Here', '/getting-here'],
    ['FAQ', '/faq'],
  ] as const
  const social = brand.socialLinks.map(({label, url}) => link(url, label)).join(' &nbsp;·&nbsp; ')

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeEmailHtml(brand.siteName)}</title></head>
<body style="margin:0;padding:0;background:#f3ede6;color:#282828">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeEmailHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f3ede6"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:640px;background:#faf7f2;border:1px solid #ded5c9">
<tr><td align="center" style="padding:38px 32px 30px;border-bottom:1px solid #ded5c9"><a href="${escapeEmailHtml(baseUrl)}"><img src="${escapeEmailHtml(brand.logoUrl)}" width="300" alt="${escapeEmailHtml(brand.siteName)}" style="display:block;width:100%;max-width:300px;height:auto;border:0"></a></td></tr>
<tr><td style="padding:44px 40px 38px">${content}</td></tr>
<tr><td bgcolor="#e9e1d6" style="padding:30px 40px;color:#496b5b;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.8;text-align:center">
<p style="margin:0 0 12px">${navigation.map(([label, path]) => link(`${baseUrl}${path}`, label)).join(' &nbsp;·&nbsp; ')}</p>
${social ? `<p style="margin:0 0 12px">${social}</p>` : ''}
<p style="margin:0">${escapeEmailHtml(brand.location)}<br>${link(baseUrl, brand.siteName)} &nbsp;·&nbsp; ${link(`mailto:${brand.contactEmail}`, brand.contactEmail)}</p>
</td></tr></table></td></tr></table></body></html>`
}
