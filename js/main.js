var AppRouter = Backbone.Router.extend({
  routes: {
    "" : "menu",
    "menu" : "menu",
  },

  menu: function() {
    this.menu = new MenuItemCollection()
    this.basket = new BasketCollection()
    
    var self = this
    
    this.menu.fetch({
      success: function() {
        self.menuView = new MenuView({ model: self.menu })
        self.menuView.render()
        
        self.basketView = new BasketView({ model: self.basket })
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
