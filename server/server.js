import express from 'express';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
    cors: { origin: '*'}
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.get('/foo', (req, res) => {
    res.json({msg: 'foo'});
});

io.on('connection', (socket) => {
    socket.identity = 'anonymous';

    const sendMessage = (msg) => {
        io.emit('chat message', {identity: socket.identity, message: msg});
    }

    socket.on('chat message', (msg) => {
      sendMessage(msg);
    });

    socket.on('identity', (identity) => {
        console.log('got identity', identity);
        socket.identity = identity;
        sendMessage('joined the chat');
    })

    socket.on('disconnect', () => {
      console.log('user disconnected');
      sendMessage('has left the chat');
    });
});


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

