//Desde el cliente hay que establecer las conexiones al socket

const lbnOnline = document.querySelector('#lbnOnline')

const lbnOffline = document.querySelector('#lbnOffline')
txtMensaje = document.querySelector('#txtMensaje')
btnEnviar = document.querySelector('#btnEnviar')

const socket = io();


//El evento ON es para escuchar eventos enviados del servidor
socket.on('connect', () => {
    // console.log('conectado')
    lbnOffline.style.display = 'none'
    lbnOnline.style.display = ''
})

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor')
    lbnOnline.style.display = 'none'
    lbnOffline.style.display = ''
})

socket.on('enviar-mensaje', (payload) => {
    console.log(payload)
})


btnEnviar.addEventListener('click', () =>{
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: "11244asdf",
        fecha: new Date().getTime()
    }
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log("Se recibe esto desde el server", id)
    });
    

})