var basket = new BasketCollection()

var AppRouter = Backbone.Router.extend({
  routes: {
    ""           : "menu",
    "menu"       : "menu",
    "orders/:id" : "order"
  },

  menu: function() {
    this.menu = new MenuItemCollection()
    
    if (this.orderView) {
      this.orderView.close()
    }
    
    new MenuLoadingView().render()
    
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
    var order = new Order({ Id: id })
    order.url = "/Restbucks/order/" + id // not ideal, but real alternative
    
    this.displayOrder(order)
  },
  
  orderCreated: function(location) {
    var id = location.split("/").pop(-1) // bit hacky :(
    app.navigate("/orders/" + id)
    
    var order = new Order({ Id: id })
    order.url = location
    
    this.displayOrder(order)
  },
  
  displayOrder: function(order) {
    if (this.menuView) {
      this.menuView.close()
    }
    
    if (this.basketView) {
      this.basketView.close()
    }
    
    new OrderLoadingView().render()
    
    var self = this
    order.fetch({
      success: function() {
        self.orderView = new OrderView({ model: order })
        self.orderView.render()
      },
      error: function(model, response) {
        console.error("something bad")
      }
    })
  }
});

var dispatcher = _.clone(Backbone.Events)

dispatcher.on("orderCreated", function(location) {
  app.orderCreated(location)
})

var app = new AppRouter()
Backbone.history.start()
