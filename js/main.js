var basket = new BasketCollection()

var AppRouter = Backbone.Router.extend({
  routes: {
    ""           : "menu",
    "menu"       : "menu",
    "orders/:id" : "order"
  },

  menu: function() {
    this.menu = new MenuItemCollection()
    
    var self = this
    
    this.menu.fetch({
      success: function() {
        self.menuView = new MenuView({ model: self.menu })
        self.menuView.render()
        
        self.basketView = new BasketView({ model: basket, dispatcher: dispatcher })
        self.basketView.render()
      },
      error: function(model, response) {
        // TODO: notify error
      }
    });
  },
  
  order: function(id) {
  }
});

var dispatcher = _.clone(Backbone.Events)

dispatcher.on("orderCreated", function(location) {
  var id = location.split("/").pop(-1)
  app.navigate("/orders/" + id, true);
})

var app = new AppRouter()
Backbone.history.start()
