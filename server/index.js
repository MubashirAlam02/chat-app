import express from "express";
import { createServer } from "http";
import { initializeWebSocket } from "./src/handlers/websocket.js";
import env from "./src/config/env.js";

// Initialize Express app
const app = express();

// Create HTTP server from Express app
const server = createServer(app);

// Initialize WebSocket server
initializeWebSocket(server);

// Start server
server.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
