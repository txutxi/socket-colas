//Comando para establecer la comunicación:
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});


socket.on('disconect', function() {
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', function(resp) {
    label.text(resp.actual);
});


$('button').on('click', function() {
    //console.log('click');
    socket.emit('siguienteTicket', null, function(siguienteTiket) {
        label.text(siguienteTiket);
    });

});