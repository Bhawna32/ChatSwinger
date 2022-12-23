import { Server } from 'socket.io'

const SocketHandler = (req, res) => {
    const io = new Server(res.socket.server)
    res.socket.server.io = io;

    io.on('connection', (socket) => 
    {
      socket.on('send-message', (msg) => {
        io.emit('receive-message', msg)
      })
    })
    console.log("Connected");
  res.end()
}
export default SocketHandler