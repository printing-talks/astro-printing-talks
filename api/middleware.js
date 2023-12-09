const express = require('express');
const app = express();
const port = 3000;

// Mock function to simulate 'get' from '@vercel/edge-config'
// In a real scenario, replace this with your actual configuration retrieval logic
async function getGreeting() {
  // Simulate an asynchronous operation, like fetching from a database or API
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ message: "Hello from Express!" });
    }, 1000);
  });
}

app.get('/welcome', async (req, res) => {
  try {
    const greeting = await getGreeting();
    res.json(greeting);
  } catch (error) {
    res.status(500).send('Error occurred');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
