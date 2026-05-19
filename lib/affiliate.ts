export type AffiliateSite = {
  id: string
  name: string
  slug: string
  affiliate_id: string
  link_template: string
  logo_url?: string | null
  active: boolean
  sort_order?: number | null
  price_per_kg_eur?: number | null
}

export function generateAffiliateUrl(supplierUrl: string, site: AffiliateSite) {
  return site.link_template
    .replaceAll('{PRODUCT_URL}', encodeURIComponent(supplierUrl))
    .replaceAll('{AFFILIATE_ID}', encodeURIComponent(site.affiliate_id))
}
