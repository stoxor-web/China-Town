export type Rates = {
  cnyToEur: number
  cnyToUsd: number
}

export function convertCny(priceCny: number, rates: Rates) {
  return {
    cny: priceCny,
    eur: priceCny * rates.cnyToEur,
    usd: priceCny * rates.cnyToUsd
  }
}

export function formatMoney(value: number, currency: 'EUR' | 'USD' | 'CNY') {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency
  }).format(value)
}
