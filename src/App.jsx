import { useEffect, useState, useCallback, useRef } from 'react';
import './App.css'
import {socket} from './socket';

function App() {

  const [identity, setIdentity] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // connect anonymously on startup
    socket.connect();
  }, []);

  socket.on('chat message', (msg) => {
    console.log('received message', msg);
    setMessages([...messages, msg]);
  });

  const updateMessage = (e) => {
    setMessage(e.target.value);
  };

  const updateIdentity = (e) => {
    setIdentity(e.target.value);
  };

  const chatHandler = (e) => {
      e.preventDefault();
      if (message) {
        console.log('sending message', message);
        socket.emit('chat message', message);
        setMessage('');
      }
  };

  const identityHandler = (e) => {
    e.preventDefault();
    if (identity) {
      socket.connect();
      console.log('sending identity', identity);
      socket.emit('identity', identity);
    }
  };

  return (
    <>
      <h2>Socket Chat - React</h2>
      <form id="identity">
        <input value={identity} placeholder='Your identity' onChange={updateIdentity} autoComplete="off" />
        <button onClick={identityHandler}>Set Identity</button>
      </form>

      <ul id="messages">
        {messages.map((message, index) => (
          <li key={index}>{message.identity}: {message.message}</li>
        ))}
      </ul>

      <form id="form">
        <input id="input" value={message} onChange={updateMessage} autoComplete="off" />
        <button onClick={chatHandler}>Send</button>
      </form>
    </>
  )
}

export default App
