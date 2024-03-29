var BasketItem = Backbone.Model.extend({
  defaults: {
    "name": "",
    "price": 0.0,
    "quantity": 1
  }
});

var BasketCollection = Backbone.Collection.extend({
  
  model: BasketItem,
  
  hasItems: false,
  
  total: 0,
  
  initialize: function () {
    var self = this
    this.on("add", function (item) {
      console.log("Adding " + item.get("quantity") + " x " + item.get("name") + " to basket")
      self.hasItems = true
      self.total += (item.get("price") * item.get("quantity")) // ignore rounding issues (IRL use something like BigDecimal.js)
    })
  },
  
  empty: function() {
    this.reset()
    this.hasItems = false
    this.total = 0
  }
});

var BasketView = Backbone.View.extend({
  
  el: $('#basket'),
  
  template: _.template($('#basket-template').html()),
  
  initialize: function () {
    var self = this
    this.model.bind("add", function (item) {
      self.render()
    })
  },
  
  events: {
    "click btn#takeAway" : "placeTakeAwayOrder",
    "click btn#inShop" : "placeInShopOrder"
  },
  
  render: function(eventName) {
    $(this.el).html(this.template(this.model))
    
    var list = $('#basket ul')
    _.each(this.model.models, function(item) {
      list.append(new BasketItemView({ model: item }).render().el);
    }, this);
    
    return this;
  },

  placeTakeAwayOrder: function() {
    this.placeOrder("takeAway")
  },

  placeInShopOrder: function() {
    this.placeOrder("inShop")
  },
  
  placeOrder: function(location) {
    console.log("Placing order: " + location)
    
    var items = _.map(this.model.models, function(model) {
      return { Name: model.get("name"), Quantity: model.get("quantity") }
    })
    order = new Order({
      Location: location,
      Cost: this.model.total,
      Items: items
    })

    var self = this
    $.ajax("/restbucks/orders", {
      type: "POST",
      data: order.toXmlString(),
      contentType: "text/xml",
      success: function(data, textStatus, jqXHR) {
        var location = jqXHR.getResponseHeader("Location")
        self.options.dispatcher.trigger("orderCreated", location)
        self.model.empty()
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error(jqXHR.status)
        console.error(errorThrown)
      }
    })
  },
  
  close: function() {
    $(this.el).empty()
  }
});

var BasketItemView = Backbone.View.extend({
  tagName: "li",
  template: _.template($('#basket-item-template').html()),
  render: function(eventName) {
    $(this.el).html(this.template(this.model.toJSON()))
    return this
  }
});
