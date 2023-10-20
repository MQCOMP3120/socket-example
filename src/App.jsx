import { io } from 'socket.io-client';
import { useState } from 'react';
import './App.css'

function App() {

  const socket = io('ws://localhost:3000/');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const updateMessage = (e) => {
    setMessage(e.target.value);
  };

  const formHandler = (e) => {
      e.preventDefault();
      if (message) {
        console.log('sending message', message);
        socket.emit('chat message', message);
        setMessage('');
      }
  };

  socket.on('chat message', (msg) => {
    console.log('received message', msg);
    setMessages([...messages, msg]);
  });

  return (
    <>
      <h2>Socket Chat - React</h2>
      <ul id="messages">
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form id="form" onSubmit={formHandler}>
        <input id="input" value={message} onChange={updateMessage} autoComplete="off" /><button>Send</button>
      </form>
    </>
  )
}

export default App
