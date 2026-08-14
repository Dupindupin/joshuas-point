import type {EmailBrand, EmailPurpose} from './types'

export const defaultEmailBrand: EmailBrand = {
  contactEmail: 'mail@joshuaspoint.com',
  location: 'Calango, Zamboanguita, Negros Oriental, Philippines',
  logoUrl: 'https://joshuaspoint.com/brand/logo-light.png',
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
  return `<a class="email-link ${className}" href="${escapeEmailHtml(url)}" style="color:#1f3d3a;text-decoration:underline;text-decoration-color:#c8a26a;text-underline-offset:3px;overflow-wrap:anywhere;word-break:break-word">${escapeEmailHtml(label)}</a>`
}

export function emailButton(url: string, label: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0 18px"><tr><td bgcolor="#1f3d3a" style="border-radius:999px;mso-padding-alt:12px 22px"><a href="${escapeEmailHtml(url)}" style="display:inline-block;padding:12px 22px;color:#f3ede6;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;letter-spacing:.06em;text-decoration:none;text-transform:uppercase">${escapeEmailHtml(label)}</a></td></tr></table>`
}

export function emailParagraph(content: string) {
  return `<p class="email-copy" style="margin:0 0 16px;color:#282828;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.6;overflow-wrap:anywhere;word-break:break-word">${content}</p>`
}

export function emailHeading(content: string) {
  return `<h1 class="email-heading" style="margin:0 0 14px;color:#1f3d3a;font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:400;line-height:1.16">${escapeEmailHtml(content)}</h1>`
}

export function emailKicker(content: string) {
  return `<p class="email-kicker" style="margin:0 0 8px;color:#496b5b;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:.12em;line-height:1.4;text-transform:uppercase">${escapeEmailHtml(content)}</p>`
}

export function emailSummaryCards(rows: Array<[string, string] | [string, string, string]>) {
  const cells = rows.map(
    ([label, value, valueHtml]) =>
      `<td class="summary-cell" width="33.33%" valign="top" bgcolor="#f3ede6" style="width:33.33%;padding:14px 15px;border:1px solid #ded5c9;background:#f3ede6"><p class="summary-label" style="margin:0 0 5px;color:#496b5b;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:.09em;line-height:1.4;text-transform:uppercase">${escapeEmailHtml(label)}</p><p class="summary-value" style="margin:0;color:#282828;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.45;overflow-wrap:anywhere;word-break:break-word">${valueHtml ?? escapeEmailHtml(value).replaceAll('\n', '<br />')}</p></td>`,
  )

  const rowsHtml: string[] = []
  for (let index = 0; index < cells.length; index += 3) {
    const row = cells.slice(index, index + 3)
    while (row.length < 3) {
      row.push(
        '<td class="summary-cell summary-cell--empty" width="33.33%" style="width:33.33%"></td>',
      )
    }
    rowsHtml.push(`<tr>${row.join('')}</tr>`)
  }

  return `<table class="email-summary" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0 18px;border-collapse:separate;border-spacing:6px 6px">${rowsHtml.join('')}</table>`
}

export function emailMessageBlock(title: string, message: string) {
  return `<table class="email-message" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f8f3ec" style="margin:18px 0;border-left:3px solid #c8a26a;background:#f8f3ec"><tr><td style="padding:16px 18px"><p class="email-info-title" style="margin:0 0 7px;color:#496b5b;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:.09em;line-height:1.4;text-transform:uppercase">${escapeEmailHtml(title)}</p><p class="email-copy email-message-copy" style="margin:0;color:#282828;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.55;overflow-wrap:anywhere;word-break:break-word">${escapeEmailHtml(message).replaceAll('\n', '<br />')}</p></td></tr></table>`
}

export function emailDetails(
  rows: Array<[string, string] | [string, string, string]>,
  {operational = false}: {operational?: boolean} = {},
) {
  const className = operational ? 'email-details email-details--operational' : 'email-details'
  const tableStyle = operational
    ? 'margin:28px 0;border:1px solid #d8cec0;border-top:3px solid #c8a26a;background:#f3ede6'
    : 'margin:28px 0;border-top:1px solid #d8cec0'

  return `<table class="${className}" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"${operational ? ' bgcolor="#f3ede6"' : ''} style="${tableStyle}">${rows
    .map(
      ([label, value, valueHtml]) =>
        `<tr><td class="detail-label" style="width:34%;padding:${operational ? '13px 12px 13px 16px' : '12px 12px 12px 0'};border-bottom:1px solid #d8cec0;color:#496b5b;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;vertical-align:top">${escapeEmailHtml(label)}</td><td class="detail-value" style="padding:${operational ? '13px 16px 13px 0' : '12px 0'};border-bottom:1px solid #d8cec0;color:#282828;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.5;vertical-align:top;overflow-wrap:anywhere;word-break:break-word">${valueHtml ?? escapeEmailHtml(value).replaceAll('\n', '<br />')}</td></tr>`,
    )
    .join('')}</table>`
}

export function emailInformationBlock(title: string, lines: readonly string[]) {
  return `<table class="email-info" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f3ede6" style="margin:18px 0;border-left:3px solid #c8a26a;background:#f3ede6"><tr><td style="padding:15px 18px"><p class="email-info-title" style="margin:0 0 6px;color:#496b5b;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase">${escapeEmailHtml(title)}</p><p class="email-copy email-info-copy" style="margin:0;color:#282828;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.55">${lines.map(escapeEmailHtml).join('<br>')}</p></td></tr></table>`
}

export function emailFallbackUrl(url: string) {
  return `<p class="email-copy" style="margin:0 0 16px;color:#496b5b;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.55">If the button does not open, copy this address:<br>${link(url, url)}</p>`
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
  const footerNavigation =
    purpose === 'subscription'
      ? ([
          ['Visit Joshua’s Point', '/'],
          ['Privacy', '/privacy'],
        ] as const)
      : ([
          ['Visit Joshua’s Point', '/'],
          ['Contact', '/contact'],
        ] as const)
  const social = brand.socialLinks.map(({label, url}) => link(url, label)).join(' &nbsp;·&nbsp; ')

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><meta name="color-scheme" content="light dark"><meta name="supported-color-schemes" content="light dark"><title>${escapeEmailHtml(brand.siteName)}</title><style>
html,body,table,td,p,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse}img{-ms-interpolation-mode:bicubic}
@media screen and (max-width:520px){.email-outer{padding:8px 4px!important}.email-header{padding:20px 20px 18px!important}.email-header img{max-width:240px!important}.email-content{padding:26px 22px 22px!important}.email-heading{font-size:27px!important}.email-footer{padding:20px 22px!important;font-size:13px!important;line-height:1.55!important}.email-summary,.email-summary tbody,.email-summary tr,.email-summary td{display:block!important;width:100%!important}.summary-cell{margin-bottom:6px!important;padding:12px 14px!important}.summary-cell--empty{display:none!important}.email-details,.email-details tbody,.email-details tr,.email-details td{display:block!important;width:100%!important}.detail-label{padding:10px 0 2px!important;border-bottom:0!important}.detail-value{padding:0 0 10px!important}.email-details--operational .detail-label{padding:10px 13px 2px!important}.email-details--operational .detail-value{padding:0 13px 10px!important}.footer-link{display:inline-block!important;margin:4px 6px!important}}
@media (prefers-color-scheme:dark){.email-body{background:#151a18!important}.email-card{background:#202420!important;border-color:#496b5b!important}.email-header{background:#1f3d3a!important;border-color:#496b5b!important}.email-content,.email-copy,.detail-value,.summary-value{color:#f3ede6!important}.email-heading{color:#f3ede6!important}.email-kicker,.detail-label,.email-info-title,.summary-label{color:#d8b77e!important}.email-details,.detail-value{border-color:#496b5b!important}.email-details--operational,.email-info,.email-message,.summary-cell{background:#293732!important;border-color:#496b5b!important}.email-info-copy,.email-message-copy{color:#f3ede6!important}.email-content .email-link{color:#e7c78f!important}.email-footer{background:#14211f!important;color:#f3ede6!important}.email-footer .email-link{color:#f3ede6!important}}
[data-ogsc] .email-card{background:#202420!important}[data-ogsc] .email-header{background:#1f3d3a!important}[data-ogsc] .email-content,[data-ogsc] .email-copy,[data-ogsc] .detail-value,[data-ogsc] .summary-value{color:#f3ede6!important}[data-ogsc] .email-heading{color:#f3ede6!important}[data-ogsc] .email-kicker,[data-ogsc] .detail-label,[data-ogsc] .email-info-title,[data-ogsc] .summary-label{color:#d8b77e!important}[data-ogsc] .email-details--operational,[data-ogsc] .email-info,[data-ogsc] .email-message,[data-ogsc] .summary-cell{background:#293732!important}[data-ogsc] .email-content .email-link{color:#e7c78f!important}[data-ogsc] .email-footer{background:#14211f!important;color:#f3ede6!important}[data-ogsc] .email-footer .email-link{color:#f3ede6!important}
</style><!--[if mso]><style>.email-card{width:600px!important}.email-copy,.detail-value,.summary-value{font-family:Georgia,'Times New Roman',serif!important}.email-heading{font-family:Georgia,'Times New Roman',serif!important}</style><![endif]--></head>
<body style="margin:0;padding:0;background:#f3ede6;color:#282828">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeEmailHtml(preheader)}</div>
<table class="email-body" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f3ede6"><tr><td class="email-outer" align="center" style="padding:24px 12px">
<table class="email-card" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#faf7f2;border:1px solid #ded5c9">
<tr><td class="email-header" align="center" bgcolor="#1f3d3a" style="padding:22px 28px 20px;border-bottom:3px solid #c8a26a;background:#1f3d3a"><a href="${escapeEmailHtml(baseUrl)}"><img src="${escapeEmailHtml(brand.logoUrl)}" width="260" alt="${escapeEmailHtml(brand.siteName)}" style="display:block;width:100%;max-width:260px;height:auto;border:0;color:#f3ede6;font-family:Georgia,'Times New Roman',serif;font-size:20px"></a></td></tr>
<tr><td class="email-content" style="padding:32px 34px 28px;color:#282828">${content}</td></tr>
<tr><td class="email-footer" bgcolor="#14211f" style="padding:22px 28px;background:#14211f;color:#d8cec0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;text-align:center">
<p style="margin:0 0 9px;color:#f3ede6;font-weight:700">${purpose === 'subscription' ? 'Joshua’s Point updates' : 'Joshua’s Point'}</p>
<p style="margin:0 0 9px">${footerNavigation.map(([label, path]) => link(`${baseUrl}${path}`, label, 'footer-link')).join(' &nbsp;·&nbsp; ')}</p>
${social ? `<p style="margin:0 0 9px">${social}</p>` : ''}
<p style="margin:0">${escapeEmailHtml(brand.location)}<br>${link(`mailto:${brand.contactEmail}`, brand.contactEmail)}</p>
</td></tr></table></td></tr></table></body></html>`
}
