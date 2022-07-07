
// Referencias del HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear  = document.querySelector('button');


const socket = io();



socket.on('connect', () => {
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnCrear.disabled = true;

});


socket.on('enviar-mensaje', (payload) => {
    console.log( payload )
})

socket.emit( 'ultimo-ticket', null, ( ticket) => {
    lblNuevoTicket.innerHTML = ticket
})

btnCrear.addEventListener( 'click', () => {
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerHTML = ticket
    });

});