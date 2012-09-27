describe("Order", function() {
  var order

  beforeEach(function() {
    order = new Order()
  })

  describe("defaults", function() {
    it("should return an empty string as the default location", function() {
      expect(order.get("Location")).toEqual("")
    })
    
    it("should return zero as the default cost", function() {
      expect(order.get("Cost")).toEqual(0.0)
    })
    
    it("should contain zero items by default", function() {
      expect(order.get("Items").length).toEqual(0)
    })
    
    it("should return orderCreated as the default status", function() {
      expect(order.get("Status")).toEqual("orderCreated")
    })
  })
  
  describe("toXmlString", function() {
    it("should include the location in the xml", function() {
      order.set("Location", "takeAway")
      
      expect(order.toXmlString()).toContain("<location>takeAway</location>")
    })
    
    it("should include the cost in the xml", function() {
      order.set("Cost", "15.99")
      
      expect(order.toXmlString()).toContain("<cost>15.99</cost>")
    })
    
    it("should include the status in the xml", function() {
      order.set("Status", "paid")
      
      expect(order.toXmlString()).toContain("<status>paid</status>")
    })
    
    it("should include empty items element in the xml if there are none", function() {    
      expect(order.toXmlString()).toContain("<items></items>")
    })
    
    it("should include all items in the xml", function() {
      order.set("Items", [{ Name: "coffee", Quantity: 1 }, { Name: "tea", Quantity: 2 }])
      
      expect(order.toXmlString()).toContain("<items><item><name>coffee</name><quantity>1</quantity></item><item><name>tea</name><quantity>2</quantity></item></items>")
    })
  })
})