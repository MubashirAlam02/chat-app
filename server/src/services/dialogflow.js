import dialogflow from "@google-cloud/dialogflow";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to service account key file
const keyFilePath = path.join(__dirname, "../../service-account.json");

// Create Dialogflow sessions client
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: keyFilePath,
});

export async function detectIntent(sessionId, message) {
  const projectId = process.env.DIALOGFLOW_PROJECT_ID;

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
  const result = response.queryResult;

  return result.fulfillmentText;
}
