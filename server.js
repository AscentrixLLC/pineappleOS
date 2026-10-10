const { WebSocketServer } = require('ws');

// Render dynamically sets a PORT environment variable. We must listen on it.
const port = process.env.PORT || 8080;
const wss = new WebSocketServer({ port: port });

wss.on('connection', (ws) => {
    console.log('A player connected.');

    ws.on('message', (message) => {
        // Broadcast the data string/voice packet to all OTHER connected players
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === 1) { // 1 means OPEN
                // Convert binary buffer back to string if necessary
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => {
        console.log('A player disconnected.');
    });
});

console.log(`TurboWarp server is running on port ${port}`);
