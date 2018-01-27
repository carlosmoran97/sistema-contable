var mongoose = require('mongoose');

var Venta = mongoose.model('Venta', {
  numero: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    required: true
  }
});

module.exports = {Venta};
