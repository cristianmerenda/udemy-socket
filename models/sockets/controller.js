const socketController = (socket) => {
    console.log("cliente conectado", socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente Desconectado', socket.id)
    })
    socket.on('enviar-mensaje', (payload, callback) => {
        //si hiciera lo siguiente, uso el mismo socket generado para emitir información, por lo que va a llegarle solo a quién generó la petición
        //socket.emit('enviar-mensaje', payload)


        socket.broadcast.emit('enviar-mensaje', payload)
        const id = 123456
        callback({id, fecha: new Date().getTime()})

    })
}


module.exports = {
    socketController
}