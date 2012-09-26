var Order = Backbone.Model.extend({
  defaults: {
    "Location": "",
    "Cost": 0.0,
    "Items": [],
    "Status": "orderCreated"
  },

  parse: function(response) {
    // this shouldn't be necessary, but Restbucks-on-Nancy doesn't serialize enums to json as strings :(
    if (response.Location == 0) {
      response.Location = "takeAway"
    } else {
      response.Location = "inShop"
    }
    
    if (response.Status == 0) {
      response.Status = "orderCreated"
    } else if (response.Status == 1) {
      response.Status = "unpaid"
    } else if (response.Status == 2) {
      response.Status = "paid"
    } else if (response.Status == 3) {
      response.Status = "ready"
    } else if (response.Status == 4) {
      response.Status = "canceled"
    } else if (response.Status == 5) {
      response.Status = "delivered"
    }
    
    return response
  },

  toXmlString: function() {
    var xml = "<?xml version=\"1.0\"?>" +
              "<order xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
              "xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
              "xmlns=\"http://restbuckson.net\">" +
              "<links />" + 
              "<location>" + this.get("Location") + "</location>" +
              "<cost>" + this.get("Cost") + "</cost>" +
              "<items>"
    
    _.each(this.get("Items"), function(item) {
      xml += "<item><name>" + item.name + "</name><quantity>" + item.quantity + "</quantity></item>"
    })
    
    xml += "</items>" +
           "<status>" + this.get("Status") + "</status>" +
           "</order>"

    return xml
  }
})

var OrderView = Backbone.View.extend({
  el: $('#order'),
  
  template: _.template($('#order-template').html()),
  
  events: {
    "click button#cancelOrder" : "cancelOrder"
  },

  render: function(eventName) {
    $(this.el).html(this.template(this.model.toJSON()))
    return this
  },
  
  close: function() {
    $(this.el).empty()
  },
  
  cancelOrder: function() {
    var links = this.model.get("Links")
    var cancelLink = _.find(links, function(link) {
      return link.Relation.indexOf("order-cancel") != -1
    })
    
    var self = this
    $.ajax(cancelLink.Uri, {
      type: "DELETE",
      success: function(data, textStatus, jqXHR) {
        console.log("Cancelled order")
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error("Failed to cancel order")
      }
    })
  }
})

var OrderLoadingView = Backbone.View.extend({
  el: $('#order'),
  
  render: function(eventName) {
    $(this.el).html("Loading order details...")
    return this
  }  
})