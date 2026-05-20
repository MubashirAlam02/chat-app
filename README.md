# Flight Booking Assistant

A real-time chat application that lets users book flights through a conversational interface. Built with React on the frontend and Node.js on the backend, connected via WebSocket for real-time communication, with Google Dialogflow ES handling the natural language understanding.

## Prerequisites

Before running this project you will need:

- Node.js v18 or higher
- A Google account
- A Dialogflow ES agent (setup instructions below)

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/MubashirAlam02/chat-app.git
cd chat-app
```

### 2. Install dependencies

```bash
npm install
```

This installs both frontend and backend dependencies in one command.

### 3. Set up Google Cloud

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project
3. Search for **Dialogflow API** and enable it
4. Go to **IAM & Admin** → **Service Accounts**
5. Click **Create Service Account**
6. Give it a name and assign the **Dialogflow API Client** role
7. Go to the **Keys** tab → **Add Key** → **Create new key** → select **JSON**
8. Rename the downloaded file to `service-account.json`
9. Place it inside the `server` folder

### 4. Import the Dialogflow Agent

1. Go to [dialogflow.cloud.google.com](https://dialogflow.cloud.google.com)
2. Create a new agent and link it to your Google Cloud project
3. Click the settings gear icon next to your agent name
4. Go to the **Export and Import** tab
5. Click **Import From Zip** and upload the provided `agent.zip` file

### 5. Configure environment variables

Create a `.env` file inside the `server` folder:

```
DIALOGFLOW_PROJECT_ID=your-google-cloud-project-id
```

Your project ID is visible on the Google Cloud console homepage under your project name.

### 6. Run the application

```bash
npm run dev
```

This starts both the frontend and backend at the same time.

- Frontend runs at http://localhost:5173
- Backend runs at http://localhost:8080

## How it works

The user types a message in the chat interface. The frontend sends it to the Node.js server over a WebSocket connection. The server forwards the message to Dialogflow ES via the REST API using the user's unique session ID to maintain conversation context. Dialogflow processes the message, matches it to an intent, and returns a response. The server sends that response back to the frontend over the same WebSocket connection and it appears in the chat.

Each user gets a unique session ID when they connect, so multiple users can have separate conversations simultaneously without interference.

## Conversation flow

The bot handles a complete flight booking conversation:

```
User: I need to book a flight
Bot:  Where are you flying from, and where would you like to go?

User: From London to Calgary
Bot:  Got it! Flying from London to Calgary. How many passengers
      are traveling, and in which class would you prefer:
      economy, business, or first class?

User: Just one passenger in economy class
Bot:  Let me confirm: A flight from London to Calgary for
      1 passenger in economy class. Is that correct?

User: Yes that's right
Bot:  Great! I'll search for the best available flights for you.
```

## Project structure

```
chat-app/
├── src/                          # React frontend
│   ├── components/
│   │   ├── ChatWindow.jsx        # Main chat container
│   │   ├── Header.jsx            # App header
│   │   ├── MessageBubble.jsx     # Individual message bubble
│   │   ├── BubblePointer.jsx     # WhatsApp style message pointer
│   │   ├── MessageText.jsx       # Message text with read more
│   │   ├── ReadMoreButton.jsx    # Expand or collapse long messages
│   │   ├── Timestamp.jsx         # Message timestamp
│   │   ├── ChatInput.jsx         # Message input and send button
│   │   ├── TypingIndicator.jsx   # Animated typing indicator
│   │   └── WelcomeMessage.jsx    # Empty state screen
│   └── hooks/
│       └── useWebSocket.js       # WebSocket connection and reconnection logic
├── server/                       # Node.js backend
│   ├── src/
│   │   ├── config/
│   │   │   └── env.js            # Environment variable setup
│   │   ├── handlers/
│   │   │   └── websocket.js      # WebSocket server and message handling
│   │   └── services/
│   │       └── dialogflow.js     # Dialogflow ES API integration
│   ├── .env                      # Environment variables (not in repo)
│   ├── service-account.json      # Google credentials (not in repo)
│   └── index.js                  # Server entry point
└── README.md
```

## Available scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Starts frontend and backend together |
| `npm run frontend` | Starts only the frontend             |
| `npm run backend`  | Starts only the backend              |
| `npm run build`    | Builds the frontend for production   |
