export const fallbackRates = {
  cnyToEur: 0.128,
  cnyToUsd: 0.139
}

export const demoProducts = [
  {
    id: 'demo-1',
    title: 'Yeezy Slides Budget',
    slug: 'yeezy-slides-budget',
    supplier_url: 'https://detail.1688.com/offer/demo.html',
    price_cny: 68,
    weight_kg: 0.7,
    category: 'Slides',
    image_url: '/uploads/placeholder-product.svg',
    qc_count: 9,
    rating: 4.8
  },
  {
    id: 'demo-2',
    title: 'Nike Tech Fleece Black',
    slug: 'nike-tech-fleece-black',
    supplier_url: 'https://detail.1688.com/offer/demo2.html',
    price_cny: 168,
    weight_kg: 0.85,
    category: 'Hoodies',
    image_url: '/uploads/placeholder-product.svg',
    qc_count: 14,
    rating: 4.9
  }
]

export const demoAffiliateSites = [
  {
    id: 'site-cnfans',
    name: 'CNFans',
    slug: 'cnfans',
    affiliate_id: 'TON_ID_CNFANS',
    link_template: 'https://cnfans.com/product?url={PRODUCT_URL}&ref={AFFILIATE_ID}',
    logo_url: '/logos/placeholder-logo.svg',
    active: true,
    sort_order: 1,
    price_per_kg_eur: 11.9
  },
  {
    id: 'site-kakobuy',
    name: 'Kakobuy',
    slug: 'kakobuy',
    affiliate_id: 'TON_ID_KAKOBUY',
    link_template: 'https://kakobuy.com/item?url={PRODUCT_URL}&aff={AFFILIATE_ID}',
    logo_url: '/logos/placeholder-logo.svg',
    active: true,
    sort_order: 2,
    price_per_kg_eur: 12.5
  }
]
