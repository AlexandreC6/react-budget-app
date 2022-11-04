// Code can pick everywere

// Intl.NumberFormat = formate les nombres en fonction de la monnaire locale
export const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: "usd",
  style: "currency",
  minimumFractionDigits: 0
})
