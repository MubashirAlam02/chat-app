import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";

export function initializeWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    // Generate unique session ID for each connected client
    const sessionId = uuidv4();
    console.log(`Client connected — session: ${sessionId}`);

    // Handle incoming messages
    ws.on("message", async (data) => {
      try {
        const { message } = JSON.parse(data);
        console.log(`Message received: ${message}`);

        // Dummy response
        const botResponse = `You said: "${message}" — Dialogflow response coming soon!`;

        ws.send(JSON.stringify({ message: botResponse }));
      } catch (error) {
        console.error("Error handling message:", error);
        ws.send(
          JSON.stringify({
            message: "Something went wrong, please try again.",
          }),
        );
      }
    });

    // Handle client disconnect
    ws.on("close", () => {
      console.log(`Client disconnected — session: ${sessionId}`);
    });

    // Handle errors
    ws.on("error", (error) => {
      console.error(`WebSocket error — session: ${sessionId}:`, error);
    });
  });

  console.log("WebSocket server initialized");
}
