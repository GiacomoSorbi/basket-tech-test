import { Rule } from './index'

export const item1 = {
  id: '001',
  name: 'Lavender heart',
  price: 9.25,
}

export const item2 = {
  id: '002',
  name: 'Personalised cufflinks',
  price: 45.0,
}

export const item3 = {
  id: '003',
  name: 'Kids T-shirt',
  price: 19.95,
}

// rule1 => 10% discount over £60 of overall expenses
export const totalAmountDiscount = 0.9
export const rule1 = new Rule((items, total) =>
  total >= 60 ? total * totalAmountDiscount : total,
)
// rule2 => quantity001Discount discount for each item 001, if 2 or more are bought
export const quantity001Discount = 0.75
export const rule2 = new Rule((items, total) => {
  const total001 = items.reduce((acc, iter) => acc + (iter.id === '001'), 0)
  if (total001 >= 2) return total - total001 * quantity001Discount
  return total
})
