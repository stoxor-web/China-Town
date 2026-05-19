export function estimateShipping(weightKg: number | null | undefined, pricePerKgEur: number | null | undefined) {
  if (!weightKg || !pricePerKgEur) return null
  return weightKg * pricePerKgEur
}

export function estimateTotal(productPriceEur: number, shippingEur: number | null, safetyMargin = 1) {
  return (productPriceEur + (shippingEur || 0)) * safetyMargin
}
