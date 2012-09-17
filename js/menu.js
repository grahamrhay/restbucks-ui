var MenuItem = Backbone.Model.extend({
  defaults: {
    "Name":  "",
    "Price":  0.0
  }
});

var MenuItemCollection = Backbone.Collection.extend({
  model: MenuItem,
  url: "/restbucks/menu",
  parse: function(response) {
    return response.Items;
  }
});

var MenuItemView = Backbone.View.extend({
  
  tagName: "li",
  
  template: _.template($('#menu-item-template').html()),
  
  render: function(eventName) {
    $(this.el).html(this.template(this.model.toJSON()))
    return this
  },
  
  events: {
    "click btn.takeAway" : "purchaseTakeAway",
    "click btn.inShop" : "purchaseInShop"
  },
  
  purchaseTakeAway: function() {
    this.purchase("takeAway")
  },
  
  purchaseInShop: function() {
    this.purchase("inShop")
  },

  purchase: function(location) {
    basket.add([{
      name: this.model.get("Name"),
      price: this.model.get("Price"),
      quantity: 1,
      location: location
    }])
  }
});

var MenuView = Backbone.View.extend({
  el: $('#menu'),
  
  template: _.template($('#menu-template').html()),
  
  render: function(eventName) {
    $(this.el).html(this.template())
    var list = $('#menu ul')
    _.each(this.model.models, function(item) {
      list.append(new MenuItemView({ model: item }).render().el);
    }, this);
    return this;
  }
});
