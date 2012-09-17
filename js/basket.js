var BasketItem = Backbone.Model.extend({
  defaults: {
    "name": "",
    "price": 0.0,
    "quantity": 0
  }
});

var BasketCollection = Backbone.Collection.extend({
  
  model: BasketItem,
  
  hasItem: false,
  
  total: 0,
  
  initialize: function () {
    var self = this
    this.on("add", function (item) {
      self.hasItem = true
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
  
  render: function(eventName) {
    $(this.el).html(this.template(this.model))
    
    var list = $('#basket ul')
    _.each(this.model.models, function(item) {
      list.append(new BasketItemView({ model: item }).render().el);
    }, this);
    
    return this;
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
