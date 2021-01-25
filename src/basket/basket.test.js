import Basket, { Item, Rule } from './'
import {
  item1,
  item2,
  item3,
  rule1,
  rule2,
  totalAmountDiscount,
  quantity001Discount,
} from './fixtures'

describe('Basket should', () => {
  it(`return 0 when no item is added`, () => {
    const basket = new Basket()
    expect(typeof basket.total).toBe('number')
    expect(basket.total).toBe(0)
  })

  it(`return the value of a single or multiple items scanned`, () => {
    const basket = new Basket()
    expect(basket.total).toBe(0)
    basket.scan(item1)
    expect(basket.total).toBe(item1.price)
    basket.scan(item2)
    expect(basket.total).toBe(item1.price + item2.price)
    basket.scan(item3)
    expect(basket.total).toBe(item1.price + item2.price + item3.price)
  })

  it(`return the adjusted value of a single or multiple items scanned when created with rules`, () => {
    const basket1 = new Basket(rule1)
    const basket2 = new Basket(rule2)
    const basket3 = new Basket(rule1, rule2)
    expect(basket1.total).toBe(0)
    expect(basket2.total).toBe(0)
    expect(basket3.total).toBe(0)
    // testing rule1
    basket1.scan(item1)
    expect(basket1.total).toBe(item1.price)
    basket1.scan(item2)
    expect(basket1.total).toBe(item1.price + item2.price)
    basket1.scan(item3)
    expect(basket1.total).toBe(
      (item1.price + item2.price + item3.price) * totalAmountDiscount,
    )
    // testing rule2
    basket2.scan(item1)
    expect(basket2.total).toBe(item1.price)
    basket2.scan(item2)
    expect(basket2.total).toBe(item1.price + item2.price)
    basket2.scan(item1)
    expect(basket2.total).toBe(
      item1.price + item2.price + item1.price - quantity001Discount * 2,
    )
    // testing rule1 and rule2, applied in order
    basket3.scan(item1)
    expect(basket3.total).toBe(item1.price)
    basket3.scan(item3)
    expect(basket3.total).toBe(item1.price + item3.price)
    basket3.scan(item1)
    expect(basket3.total).toBe(
      item1.price + item3.price + item1.price - quantity001Discount * 2,
    )
    basket3.scan(item2)
    expect(basket3.total).toBe(
      (item1.price + item3.price + item1.price + item2.price) * 0.9 -
        quantity001Discount * 2,
    )
  })
})
