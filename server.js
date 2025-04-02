const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const TELEGRAM_TOKEN = '7164624615:AAE_28P52PeaX1L3BWjbCfWRfIfu2QkWoiY';
const CHAT_ID = '7196613507';

app.post('/send-message', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).send('Message is required');

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message })
    });
    const data = await response.json();
    res.status(200).json({ success: true, telegramResponse: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => {
  console.log('✅ Server is running at http://localhost:3000');
});
