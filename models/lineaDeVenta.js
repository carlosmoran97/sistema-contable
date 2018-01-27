var mongoose = require('mongoose');

var LineaDeVenta = mongoose.model('LineaDeVenta', {
  idVenta: {
    type: String,
    required: true
  },
  idProducto: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  }
});

module.exports = {LineaDeVenta};
