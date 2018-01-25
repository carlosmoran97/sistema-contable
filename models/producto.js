var mongoose = require('mongoose');

var Producto = mongoose.model('Producto', {
  nombre: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  descripcion: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  precioUnitario: {
    type: Number,
    required: true
  }
});

module.exports = {Producto};
