import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
import { detectIntent } from "../services/dialogflow.js";

// Error messages
const ERRORS = {
  INVALID_MESSAGE: "Invalid message format. Please send a text message.",
  DIALOGFLOW_ERROR:
    "Sorry, I am having trouble processing your request. Please try again.",
  EMPTY_MESSAGE: "Please send a non-empty message.",
};

export function initializeWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    // Generate unique session ID for each connected client
    const sessionId = uuidv4();
    console.log(`Client connected — session: ${sessionId}`);

    // Handle incoming messages
    ws.on("message", async (data) => {
      try {
        // Parse incoming message
        let parsed;
        try {
          parsed = JSON.parse(data);
        } catch {
          ws.send(JSON.stringify({ message: ERRORS.INVALID_MESSAGE }));
          return;
        }

        const { message } = parsed;

        // Validate message
        if (!message || message.trim() === "") {
          ws.send(JSON.stringify({ message: ERRORS.EMPTY_MESSAGE }));
          return;
        }

        console.log(`Message received — session ${sessionId}: ${message}`);

        // Send message to Dialogflow ES and get response
        const botResponse = await detectIntent(sessionId, message);

        // Validate Dialogflow response
        if (!botResponse || botResponse.trim() === "") {
          ws.send(JSON.stringify({ message: ERRORS.DIALOGFLOW_ERROR }));
          return;
        }

        ws.send(JSON.stringify({ message: botResponse }));
      } catch (error) {
        console.error(`Error handling message — session ${sessionId}:`, error);
        ws.send(JSON.stringify({ message: ERRORS.DIALOGFLOW_ERROR }));
      }
    });

    // Handle client disconnect
    ws.on("close", () => {
      console.log(`Client disconnected — session: ${sessionId}`);
    });

    // Handle errors
    ws.on("error", (error) => {
      console.error(`WebSocket error — session ${sessionId}:`, error);
    });
  });

  console.log("WebSocket server initialized");
}
