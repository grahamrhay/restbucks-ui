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

var AppRouter = Backbone.Router.extend({
  routes: {
    "" : "menu"
  },

  menu: function() {
    this.menu = new MenuItemCollection()
    this.basket = new BasketCollection()
    
    var self = this
    
    this.menu.fetch({
      success: function() {
        self.menuView = new MenuView({ model: self.menu })
        self.menuView.render()
        
        self.basketView = new BasketView()
        self.basketView.render()
      },
      error: function(model, response) {
        // TODO: notify error
      }
    });
  },
});

var app = new AppRouter();
Backbone.history.start();
