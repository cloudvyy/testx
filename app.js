const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Start server
app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});
app.get('/api/get-winners', async (req, res) => {
    try {
       const response = await fetch('https://api.random.org/json-rpc/4/invoke', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
             jsonrpc: "2.0",
             method: "generateSignedIntegers",
             params: {
                apiKey: process.env.RANDOM_API_KEY,
                n: 20,          // Number of winners
                min: 1,
                max: 1000,      // Adjust based on your total entries
                replacement: false
             },
             id: 1
          })
       });
 
       const data = await response.json();
       res.json({ winners: data.result.random.data });
    } catch (error) {
       console.error('Error fetching winners:', error);
       res.status(500).json({ error: 'Failed to get winners' });
    }
 });
 