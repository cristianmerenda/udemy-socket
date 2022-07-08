const TicketControl = require("../ticket-control")

const ticketControl = new TicketControl();



const socketController = (socket) => {

    socket.emit( 'ultimo-ticket', ticketControl.ultimo )
    socket.emit( 'estado-actual', ticketControl.ultimos4 )
    socket.emit( 'ticket-pendientes', ticketControl.tickets.length)

    socket.on('disconnect', () => {
        console.log('Cliente Desconectado', socket.id)
    })

    
    socket.on('siguiente-ticket', (payload, callback) => {
        //si hiciera lo siguiente, uso el mismo socket generado para emitir información, por lo que va a llegarle solo a quién generó la petición
        //socket.emit('enviar-mensaje', payload)
        const siguiente = ticketControl.siguiente();

        socket.broadcast.emit('ticket-pendientes', ticketControl.tickets.length)
        callback( siguiente );       
    })

    //el parámetro { escritorio } lo que hace es desestructurar el objeto que llega por referencia y se queda con el atributo escritorio
    socket.on('atender-ticket', ({ escritorio }, callback) => {
        if ( !escritorio) {
            return callback({
                ok: false, 
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.atenderTicket( escritorio );

        //Notificación de los 4 últimos eventos.
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4)
        socket.broadcast.emit('ticket-pendientes', ticketControl.tickets.length)
        if ( !ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            })
        }
        else {
            callback({
                ok: true,
                ticket,
                pendientes: ticketControl.tickets.length
            })
        }   
     })

    socket.on('ultimo-ticket', (payload, callback) => {
        const ultimo = ticketControl.ultimoTicket()
        callback( ultimo )
    })
}


module.exports = {
    socketController
}