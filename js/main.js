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
        errorAlert("Failed to retrieve menu")
      }
    });
  },
  
  order: function(id) {
    var location = "/Restbucks/order/" + id // not ideal, but no real alternative
    this.showOrderView(id, location)
  },
  
  displayOrder: function(location) {
    var id = location.split("/").pop(-1) // also not ideal
    app.navigate("/orders/" + id)
    this.showOrderView(id, location)
  },
  
  showOrderView: function(id, location) {
    var order = new Order({ Id: id })
    order.url = location
    
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
        self.orderView = new OrderView({ model: order, dispatcher: dispatcher })
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
  app.displayOrder(location)
})
dispatcher.on("orderCancelled", function(location) {
  app.displayOrder(location)
  errorAlert("Order cancelled")
})
dispatcher.on("orderUpdated", function(location) {
  app.displayOrder(location)
  successAlert("Order updated")
})

var app = new AppRouter()
Backbone.history.start()
