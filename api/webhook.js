// In-memory storage for responses (will reset when server restarts)
// For production, you'd use a database, but this works for demo
const responses = new Map();

// Clean up old responses after 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of responses.entries()) {
    if (now - value.timestamp > 300000) { // 5 minutes
      responses.delete(key);
    }
  }
}, 60000); // Check every minute

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    // Receive response from Zapier
    try {
      const { question, answer, source, requestId } = req.body;
      
      // Generate ID if not provided
      const id = requestId || Date.now().toString();
      
      // Store the response
      responses.set(id, {
        question,
        answer,
        source,
        timestamp: Date.now()
      });

      console.log('Stored response:', id, question);

      return res.status(200).json({ 
        success: true, 
        message: 'Response stored',
        id 
      });
    } catch (error) {
      console.error('Error storing response:', error);
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  if (req.method === 'GET') {
    // Retrieve response
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing id parameter' 
      });
    }

    const response = responses.get(id);

    if (response) {
      // Delete after retrieving
      responses.delete(id);
      return res.status(200).json({
        success: true,
        data: response
      });
    } else {
      return res.status(404).json({
        success: false,
        error: 'Response not found or expired'
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
