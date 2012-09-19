describe("BasketItem", function() {
  var item

  beforeEach(function() {
    item = new BasketItem()
  })

  it("should return an empty string as the default name", function() {
    expect(item.get("name")).toEqual("")
  })
  
  it("should return zero as the default price", function() {
    expect(item.get("price")).toEqual(0.0)
  })
  
  it("should return one as the default quantity", function() {
    expect(item.get("quantity")).toEqual(1)
  })
})