import dialogflow from "@google-cloud/dialogflow";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to service account key file
const keyFilePath = path.join(__dirname, "../../service-account.json");

// Create Dialogflow sessions client
let sessionClient;

try {
  sessionClient = new dialogflow.SessionsClient({
    keyFilename: keyFilePath,
  });
  console.log("Dialogflow client initialized successfully");
} catch (error) {
  console.error("Failed to initialize Dialogflow client:", error);
  process.exit(1);
}

export async function detectIntent(sessionId, message) {
  const projectId = process.env.DIALOGFLOW_PROJECT_ID;

  if (!projectId) {
    throw new Error(
      "DIALOGFLOW_PROJECT_ID is not set in environment variables",
    );
  }

  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId,
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: "en",
      },
    },
  };

  const [response] = await sessionClient.detectIntent(request);

  if (!response.queryResult) {
    throw new Error("No query result returned from Dialogflow");
  }

  return response.queryResult.fulfillmentText;
}
