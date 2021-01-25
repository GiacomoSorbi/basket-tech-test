export class Item {
  constructor(id, name, price) {
    this.id = id
    this.name = name
    this.price = price
  }
}

export class Rule {
  constructor(fn = (_, total) => total) {
    this.fn = fn
  }

  apply(items = [], total = 0) {
    return this.fn(items, total)
  }
}

class Basket {
  constructor(...rules) {
    this.rules = rules
    this.items = []
  }

  scan(item) {
    this.items.push(item)
  }

  get total() {
    let total = this.items.reduce((acc, iter) => acc + iter.price, 0)
    total = this.rules.reduce((acc, iter) => iter.apply(this.items, acc), total)
    return total
  }
}

export default Basket
