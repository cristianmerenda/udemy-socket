//Referencias HTML

const lblEscritorio = document.querySelector('h1')
const btnAtender = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlerta = document.querySelector( '.alert' )
const lblPendientes = document.querySelector('#lblPendientes')


const searchParams = new URLSearchParams(window.location.search)
if ( !searchParams.has('escritorio') ) {
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio')
lblEscritorio.innerHTML = escritorio

divAlerta.style.display = 'none'


// // Referencias del HTML
// const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
// const btnAtender  = document.querySelector('button');


const socket = io();



socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnAtender.disabled = true;

});


socket.on('enviar-mensaje', (payload) => {
    console.log( payload )
})

socket.on('ticket-pendientes', (pendientes) => {
    lblPendientes.innerHTML = pendientes
})

btnAtender.addEventListener( 'click', () => {
 
    socket.emit( 'atender-ticket', { escritorio }, ( { ok, ticket, pendientes } ) => {

        if ( !ok ) {
            lblTicket.innerHTML = 'Nadie.'
            return divAlerta.style.display = ''
        }

        lblTicket.innerHTML = 'Ticket ' + ticket.numero
        divAlerta.style.display = 'none'
        lblPendientes.innerHTML = pendientes    
        
        //lblNuevoTicket.innerHTML = ticket
    });

});