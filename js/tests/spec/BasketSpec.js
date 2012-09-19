describe("BasketCollection", function() {
  var basket

  beforeEach(function() {
    basket = new BasketCollection()
  })

  it("should return false for hasItems when empty", function() {
    expect(basket.hasItems).toEqual(false)
  })
  
  it("should return true for hasItems once an item is added", function() {
    basket.add()
    
    expect(basket.hasItems).toEqual(true)
  })
  
  it("should return zero for total when empty", function() {
    expect(basket.total).toEqual(0)
  })
  
  it("should return sum of prices for all items for total", function() {
    basket.add([
      { price: 1.4 },
      { price: 2.2 },
      { price: 0.8 }
    ])

    expect(basket.total).toEqual(4.4)
  })
})