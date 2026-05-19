import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const response = await fetch('https://api.frankfurter.app/latest?from=CNY&to=EUR,USD', { cache: 'no-store' })
  const json = await response.json()

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ success: true, mode: 'demo', rates: json.rates })
  }

  const rows = [
    { base_currency: 'CNY', target_currency: 'EUR', rate: json.rates.EUR },
    { base_currency: 'CNY', target_currency: 'USD', rate: json.rates.USD }
  ]

  const { error } = await supabaseAdmin.from('exchange_rates').upsert(rows, {
    onConflict: 'base_currency,target_currency'
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, rates: json.rates })
}
