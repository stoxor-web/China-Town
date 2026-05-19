'use client'

import { useMemo, useState } from 'react'
import { generateAffiliateUrl, AffiliateSite } from '@/lib/affiliate'
import { estimateShipping, estimateTotal } from '@/lib/shipping'
import { convertCny, formatMoney } from '@/lib/currency'
import { fallbackRates } from '@/lib/mock'

type Product = {
  id: string
  title: string
  supplier_url: string
  price_cny: number
  weight_kg?: number | null
}

export function BuyPopup({ product, sites }: { product: Product; sites: AffiliateSite[] }) {
  const [open, setOpen] = useState(false)
  const prices = convertCny(product.price_cny, fallbackRates)

  const rows = useMemo(() => sites.filter(s => s.active).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)).map(site => {
    const shipping = estimateShipping(product.weight_kg, site.price_per_kg_eur)
    return {
      ...site,
      affiliateUrl: generateAffiliateUrl(product.supplier_url, site),
      shipping,
      total: estimateTotal(prices.eur, shipping)
    }
  }), [sites, product, prices.eur])

  async function handleClick(site: typeof rows[number]) {
    try {
      await fetch('/api/affiliate-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          affiliateSiteId: site.id,
          landingPage: window.location.href
        })
      })
    } catch (error) {
      console.warn('Tracking non bloquant:', error)
    }

    window.open(site.affiliateUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="w-full rounded-2xl bg-ink px-6 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-[1.01]">
        Acheter
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black">Choisir un site affilié</h2>
                <p className="text-sm text-black/50">Le lien final utilise ton ID configuré dans l'admin.</p>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full border px-3 py-1 text-xl">×</button>
            </div>

            <div className="space-y-3">
              {rows.map(site => (
                <button key={site.id} onClick={() => handleClick(site)} className="flex w-full items-center justify-between gap-4 rounded-2xl border border-black/10 p-4 text-left transition hover:bg-cream">
                  <div className="flex items-center gap-3">
                    {site.logo_url && <img src={site.logo_url} alt={site.name} className="h-11 w-11 rounded-full object-contain" />}
                    <div>
                      <p className="font-bold">{site.name}</p>
                      <p className="text-sm text-black/55">Livraison estimée : {site.shipping ? formatMoney(site.shipping, 'EUR') : 'à compléter'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black">{formatMoney(site.total, 'EUR')}</p>
                    <span className="inline-block rounded-xl bg-ink px-3 py-2 text-sm font-semibold text-white">Continuer</span>
                  </div>
                </button>
              ))}
            </div>

            <p className="mt-5 text-xs text-black/45">Prix indicatifs : les taux de change et les frais de livraison peuvent varier selon l'agent, le transporteur et le poids final du colis.</p>
          </div>
        </div>
      )}
    </>
  )
}
