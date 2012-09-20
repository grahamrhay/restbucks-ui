var Order = Backbone.Model.extend({
  defaults: {
    "location": "",
    "cost": 0.0,
    "items": [],
    "status": "orderCreated"
  },
  
  toXmlString: function() {
    var xml = "<?xml version=\"1.0\"?>" +
              "<order xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
              "xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
              "xmlns=\"http://restbuckson.net\">" +
              "<links />" + 
              "<location>" + this.get("location") + "</location>" +
              "<cost>" + this.get("cost") + "</cost>" +
              "<items>"
    
    _.each(this.get("items"), function(item) {
      xml += "<item><name>" + item.name + "</name><quantity>" + item.quantity + "</quantity></item>"
    })
    
    xml += "</items>" +
           "<status>" + this.get("status") + "</status>" +
           "</order>"

    return xml
  }
});
