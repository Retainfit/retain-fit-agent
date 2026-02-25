const OpenAI = require('openai'); // This is what was missing!
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));

// This is the "Doorbell" Twilio will ring
app.post('/sms', async (req, res) => {
    const incomingMsg = req.body.Body;
    const fromNumber = req.body.From;

    console.log(`📩 New message from ${fromNumber}: ${incomingMsg}`);

    // 1. Ask the AI for a smart reply based on our Retainfit logic
    const aiResponse = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "system", content: "You are the Retainfit Premium Gym Assistant. Answer the gym owner professionally." },
            { role: "user", content: incomingMsg }
        ],
    });

    const replyText = aiResponse.choices[0].message.content;

    // 2. Send the reply back through Twilio
    await twilioClient.messages.create({
        body: replyText,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: fromNumber
    });

    res.status(200).send('Message Handled');
});

// Start the 24/7 listener on Port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Retainfit Live Listener is active on port ${PORT}`);
});