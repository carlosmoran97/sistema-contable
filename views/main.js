var socket = io.connect('http://localhost:3000',{'forceNew':true});

socket.on('consulta-productos', (data) => {
  console.log(data);
});
