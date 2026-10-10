const { WebSocketServer } = require('ws');
const http = require('http'); // 1. Import the built-in HTTP module

const port = process.env.PORT || 8080;

// 2. Create a basic HTTP server that handles UptimeRobot pings
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is Alive!');
});

// 3. Attach the WebSocket server to our HTTP server
const wss = new WebSocketServer({ server: server });

wss.on('connection', (ws) => {
    console.log('A player connected.');

    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === 1) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => {
        console.log('A player disconnected.');
    });
});

// Start listening on the combined port
server.listen(port, () => {
    console.log(`TurboWarp server is running on port ${port}`);
});
