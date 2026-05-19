import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { supabaseAdmin } from '@/lib/supabase'

function hashIp(ip: string) {
  return crypto
    .createHash('sha256')
    .update(`${ip}:${process.env.IP_HASH_SECRET || 'dev-secret'}`)
    .digest('hex')
}

function parseDevice(userAgent: string) {
  if (/mobile/i.test(userAgent)) return 'mobile'
  if (/tablet|ipad/i.test(userAgent)) return 'tablet'
  return 'desktop'
}

function parseBrowser(userAgent: string) {
  if (/edg/i.test(userAgent)) return 'Edge'
  if (/chrome/i.test(userAgent)) return 'Chrome'
  if (/safari/i.test(userAgent)) return 'Safari'
  if (/firefox/i.test(userAgent)) return 'Firefox'
  return 'Unknown'
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { productId, affiliateSiteId, landingPage } = body

    if (!productId || !affiliateSiteId) {
      return NextResponse.json({ error: 'productId and affiliateSiteId are required' }, { status: 400 })
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ success: true, mode: 'demo' })
    }

    const forwardedFor = req.headers.get('x-forwarded-for') || ''
    const ip = forwardedFor.split(',')[0]?.trim() || 'unknown'
    const userAgent = req.headers.get('user-agent') || ''
    const referrer = req.headers.get('referer') || ''
    const country = req.headers.get('x-vercel-ip-country') || null

    const { error } = await supabaseAdmin.from('affiliate_clicks').insert({
      product_id: productId,
      affiliate_site_id: affiliateSiteId,
      user_country: country,
      user_device: parseDevice(userAgent),
      user_browser: parseBrowser(userAgent),
      referrer,
      landing_page: landingPage,
      ip_hash: hashIp(ip),
      user_agent: userAgent
    })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
