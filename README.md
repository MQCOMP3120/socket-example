# COMP3120 Websocket Example

This is a small example application that follows the
[Socket.io Tutorial](https://socket.io/docs/v4/tutorial/introduction)
and extends it to a React front-end and to manage user identities.

## Server

The server is implemented in <server/server.js>. Run using the command:

```bash
npm run server
```

The server will listen on <http://localhost:3000/>.

The server delivers a single HTML page that acts as a client for the chat
application following the example code in the tutorial with a few changes.

## React Front End

The React front end implements an enhancement to allow the client to claim
an identity and use that for subsequent chat messages.  Run the development
server with:

```bash
npm run dev
```

To test the application, open either front end in multiple browser windows or tabs and you should be able to exchange messages between them.
