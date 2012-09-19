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
      self.hasItems = true
      self.total += item.get("price")
    })
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
    "click btn" : "placeOrder",
  },
  
  render: function(eventName) {
    $(this.el).html(this.template(this.model))
    
    var list = $('#basket ul')
    _.each(this.model.models, function(item) {
      list.append(new BasketItemView({ model: item }).render().el);
    }, this);
    
    return this;
  },
   
  placeOrder: function() {
    toOrderXml(this.model.models)
  }
});

var toOrderXml = function(basket) {
}

var BasketItemView = Backbone.View.extend({
  tagName: "li",
  template: _.template($('#basket-item-template').html()),
  render: function(eventName) {
    $(this.el).html(this.template(this.model.toJSON()))
    return this
  }
});
