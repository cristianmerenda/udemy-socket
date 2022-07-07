const TicketControl = require("../ticket-control")

const ticketControl = new TicketControl();



const socketController = (socket) => {

    socket.on('disconnect', () => {
        console.log('Cliente Desconectado', socket.id)
    })

    
    socket.on('siguiente-ticket', (payload, callback) => {
        //si hiciera lo siguiente, uso el mismo socket generado para emitir información, por lo que va a llegarle solo a quién generó la petición
        //socket.emit('enviar-mensaje', payload)

        const siguiente = ticketControl.siguiente();
        callback( siguiente );       
    })


    socket.on('ultimo-ticket', (payload, callback) => {
        const ultimo = ticketControl.ultimoTicket()
        callback( ultimo )
    })
}


module.exports = {
    socketController
}