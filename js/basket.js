var BasketItem = Backbone.Model.extend({
  defaults: {
    "Name": "",
    "Price": 0.0,
    "Quantity": 0
  }
});

var BasketCollection = Backbone.Collection.extend({
  model: BasketItem
});

var BasketView = Backbone.View.extend({
  
  el: $('#basket'),
  
  template: _.template($('#basket-template').html()),
  
  initialize:function () {
    this.model.bind("add", function (item) {
      $('#basket ul').append(new BasketItemView({ model: item }).render().el);
    });
  },
  
  render: function(eventName) {
    $(this.el).html(this.template())
    
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
