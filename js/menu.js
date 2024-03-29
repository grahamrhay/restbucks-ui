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
    "click btn" : "addToBasket"
  },
  
  addToBasket: function() {
    basket.add([{
      name: this.model.get("Name"),
      price: this.model.get("Price"),
      quantity: 1
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
  },
  
  close: function() {
    $(this.el).empty()
  }
});

var MenuLoadingView = Backbone.View.extend({
  el: $('#menu'),
  
  render: function(eventName) {
    $(this.el).html("Loading menu...")
    return this
  }
})