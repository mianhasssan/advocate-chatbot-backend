export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { question } = req.body;

      if (!question) {
        return res.status(400).json({ 
          success: false, 
          error: 'Question is required' 
        });
      }

      // Generate unique request ID
      const requestId = Date.now().toString() + Math.random().toString(36).substring(7);

      // Return the request ID immediately
      // The Zapier workflow will use this ID to store the response
      return res.status(200).json({
        success: true,
        requestId: requestId,
        message: 'Question received'
      });

    } catch (error) {
      console.error('Error processing question:', error);
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
