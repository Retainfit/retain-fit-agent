require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');
const twilio = require('twilio');
const cron = require('node-cron');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const sms = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const delay = ms => new Promise(res => setTimeout(res, ms));

async function runRetainFitAgent() {
  console.log("🚀 STARTING GLOBAL AUDIT...");

  // 1. Fetch all gyms that have paid and are active
  const { data: gyms, error: gymError } = await supabase
    .from('Gyms')
    .select('*')
    .eq('Is_active', true);

  if (gymError) return console.error("Gym Error:", gymError);

  for (const gym of gyms) {
    console.log(`📍 Processing ${gym.Owner_name}'s Gym (ID: ${gym.id})`);

    // 2. Fetch only members for THIS specific gym
    const { data: members, error: memError } = await supabase
      .from('members')
      .select('*')
      .eq('gym_id', gym.id);

    if (memError) continue;

    for (const member of members) {
      // (The rest of your logic tree: Ghost, Slipper, Superstar)
      // This part ensures personalized messages for every gym's members
      console.log(`🤖 Analyzing ${member.first_name}...`);
      
      // AI Logic & Twilio Sending here...
      
      await delay(2000); 
    }
  }
}

// Set it for 9:00 AM daily
cron.schedule('0 9 * * *', () => {
  runRetainFitAgent();
});

console.log("🤖 Multi-Tenant Agent is STANDING BY for all gyms.");