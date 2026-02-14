# Advocate Chatbot Backend

This is the backend API for the Advocate Assistant chatbot that connects with Zapier.

## Endpoints

### POST /api/ask
Receives questions from the frontend chatbot.

**Request:**
```json
{
  "question": "What is Article 4 about?"
}
```

**Response:**
```json
{
  "success": true,
  "requestId": "1234567890abc",
  "message": "Question received"
}
```

### POST /api/webhook
Receives AI responses from Zapier.

**Request:**
```json
{
  "requestId": "1234567890abc",
  "question": "What is Article 4 about?",
  "answer": "Article 4 is about...",
  "source": "Article 4 - Converted"
}
```

### GET /api/webhook?id=REQUEST_ID
Retrieves stored responses.

**Response:**
```json
{
  "success": true,
  "data": {
    "question": "What is Article 4 about?",
    "answer": "Article 4 is about...",
    "source": "Article 4 - Converted",
    "timestamp": 1234567890
  }
}
```

## Deployment

1. Push this code to GitHub
2. Import repository in Vercel
3. Deploy!

Your API will be available at: `https://your-project.vercel.app`

## Usage in Zapier

Update your Zap Step 4 (POST) to send data to:
```
https://your-project.vercel.app/api/webhook
```

## Files Structure

```
chatbot-backend/
├── api/
│   ├── ask.js          # Receives questions from chatbot
│   └── webhook.js      # Receives responses from Zapier
├── package.json        # Project configuration
├── vercel.json         # Vercel deployment config
└── README.md           # This file
```
