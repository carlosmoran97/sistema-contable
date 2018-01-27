const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Producto} = require('./models/producto');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

const port = process.env.PORT || 3000;
var dir = __dirname + '/views/partials';
hbs.registerPartials(dir);

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/node_modules'));

//sockets
io.on('connection', (socket) => {
  console.log('Alguien se ha conectado con Sockets');
  Producto.find().then((productos) =>{
    socket.emit('consulta-productos', productos);
    socket.emit('venta-producto', productos);
  });

  // cliente solicita id de producto
  socket.on('obtenerProducto', function(data){
    Producto.findById(data._id).then((producto) => {
      socket.emit('obtenerProducto', {
        nombre: producto.nombre,
        precioUnitario: producto.precioUnitario
      });
    });
  });

  // cliente solicita guardar la Venta
  socket.on('guardar-venta', (data) => {
    console.log('Recibo desde el cliente:\n',data);
  });
});

//páginas

app.get('/', (req, res) => {
  res.send(`<nav>
  <a href="/agregar-productos">Agregar productos</a><br/>
  <a href="/catalogo">Ver catalogo</a><br/>
  <a href="/agregar-venta">Agregar venta</a><br>
  <a href="/movimientos">Movimientos</a>
</nav>
`);
});

app.get('/agregar-productos', (req, res) => {
  res.render('index.hbs');
});

app.post('/agregar-productos', (req, res) => {
  var body = req.body;
  var producto = new Producto({
    nombre: body.nombre,
    descripcion: body.descripcion,
    precioUnitario: body.precioUnitario
  });

  producto.save().then((doc) => {
    res.render('index.hbs', {
      message: 'Producto guardado exitosamente'
    });

    console.log(JSON.stringify(doc, undefined, 2));

  }).catch((e) => {
    console.log(e);
    res.render('index.hbs', {
      message: 'ERROR al guardar el producto. Campos requeridos'
    });
  });
});

app.get('/catalogo', (req, res) => {
  res.render('catalogo.hbs');
});

app.get('/agregar-venta', (req, res) => {
  res.render('agregar-venta.hbs');
});

// app.post('/agregar-venta', (req, res) => {
//   res.render('agregar-venta.hbs', {
//     message: 'Venta agregada'
//   })
// });

server.listen(port, () =>{
  console.log('Listen on port ' + port);
});
