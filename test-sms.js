require('dotenv').config();
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendTestText() {
  console.log("📱 Attempting to send a test message...");

  try {
    const message = await client.messages.create({
      body: "🚀 BOOM! Your Retain Fit Agent is officially alive and texting!",
      from: process.env.TWILIO_PHONE_NUMBER, 
      to: "+16476422239" // <--- CHANGE THIS TO YOUR ACTUAL CELL PHONE NUMBER
    });

    console.log("✅ Success! Check your phone. Message SID:", message.sid);
  } catch (error) {
    console.error("❌ Failed to send message. Error:", error.message);
  }
}

sendTestText();