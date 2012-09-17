var BasketItem = Backbone.Model.extend({
  defaults: {
    "name": "",
    "price": 0.0,
    "quantity": 0
  }
});

var BasketCollection = Backbone.Collection.extend({
  model: BasketItem
});

var BasketView = Backbone.View.extend({
  
  el: $('#basket'),
  
  template: _.template($('#basket-template').html()),
  
  initialize:function () {
    var self = this
    this.model.bind("add", function (item) {
      self.render()
    })
  },
  
  render: function(eventName) {
    var viewModel = {
      hasItem: this.model.models.length > 0,
      total: _.reduce(this.model.models, function(sum, item) {
        return sum += item.get("price")
      }, 0)
    }
    $(this.el).html(this.template(viewModel))
    
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
