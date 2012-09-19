describe("Order", function() {
  var order

  beforeEach(function() {
    order = new Order()
  })

  describe("defaults", function() {
    it("should return an empty string as the default location", function() {
      expect(order.get("location")).toEqual("")
    })
    
    it("should return zero as the default cost", function() {
      expect(order.get("cost")).toEqual(0.0)
    })
    
    it("should contain zero items by default", function() {
      expect(order.get("items").length).toEqual(0)
    })
    
    it("should return orderCreated as the default status", function() {
      expect(order.get("status")).toEqual("orderCreated")
    })
  })
  
  describe("toXmlString", function() {
    it("should include the location in the xml", function() {
      order.set("location", "takeAway")
      
      expect(order.toXmlString()).toContain("<location>takeAway</location>")
    })
    
    it("should include the cost in the xml", function() {
      order.set("cost", "15.99")
      
      expect(order.toXmlString()).toContain("<cost>15.99</cost>")
    })
    
    it("should include the status in the xml", function() {
      order.set("status", "paid")
      
      expect(order.toXmlString()).toContain("<status>paid</status>")
    })
    
    it("should include empty items element in the xml if there are none", function() {    
      expect(order.toXmlString()).toContain("<items></items>")
    })
    
    it("should include all items in the xml", function() {
      order.set("items", [{ name: "coffee", quantity: 1 }, { name: "tea", quantity: 2 }])
      
      expect(order.toXmlString()).toContain("<items><item><name>coffee</name><quantity>1</quantity></item><item><name>tea</name><quantity>2</quantity></item></items>")
    })
  })
})