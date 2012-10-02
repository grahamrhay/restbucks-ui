var Alert = Backbone.Model.extend({
  defaults: {
    "heading": ""
  }
})

var AlertView = Backbone.View.extend({
  el: $('#alert'),
  
  template: _.template($('#alert-template').html()),
  
  render: function(eventName) {
    $(this.el).html(this.template(this.model.toJSON()))
    return this
  }
})

var errorAlert = function(message) {
  displayAlert("error", message)
}

var successAlert = function(message) {
  displayAlert("success", message)
}

var displayAlert = function(type, message) {
  var alert = new Alert({ type: type, message: message })
  new AlertView({ model: alert }).render()
}