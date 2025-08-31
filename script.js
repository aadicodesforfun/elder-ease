// ======== DOM ELEMENTS ========
const discover = document.querySelector('.discover-more');
const discover_btn = document.querySelector('.discover-btn');
const discover_close = document.querySelector('.discover-close');

const hero = document.querySelector('.hero');
const footer = document.querySelector('footer');

const chat_btn = document.querySelector('.chat');
const home_btn = document.querySelector('.home-btn');
const chat_page = document.querySelector('.chat-ai');

const input = document.querySelector('.queries');
const send_btn = document.querySelector('.send');
const messageUI = document.querySelector('.message-ui'); // Container for messages

// ======== Gemini API ========
const API_KEY = "AIzaSyBupoaW1pNMn-KymvrJHMGreUzE1uLVVcc";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// Function to call Gemini AI
async function callGemini(userQuery) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userQuery }] }]
      }),
    });

    const data = await response.json();

    // Return the AI response text
    return data.candidates[0].content.parts[0].text || "Sorry, I couldn't respond.";
  } catch (err) {
    console.error(err);
    return "Error: Could not reach AI server.";
  }
}

// ======== MESSAGE FUNCTIONS ========

// Add a message to the UI
function addMessage(text, sender = "user") {
  if (!text.trim()) return;

  const msg = document.createElement("div");
  msg.classList.add("message", sender === "user" ? "user-messages" : "bot-messages");
  msg.textContent = text;

  messageUI.appendChild(msg);
  messageUI.scrollTop = messageUI.scrollHeight; // Auto-scroll
}

// Handle sending a message
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  // Add user message
  addMessage(text, "user");
  input.value = "";

  // Call Gemini and add bot response
  const botReply = await callGemini(text);
  addMessage(botReply, "bot");
}

// ======== EVENT LISTENERS ========

// Send button
send_btn.addEventListener("click", sendMessage);

// Enter key
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

// Discover overlay toggle
discover_btn.addEventListener('click', () => {
  discover.style.display = "flex";
});
discover_close.addEventListener('click', () => {
  discover.style.display = "none";
});

// Chat page toggle
chat_btn.addEventListener('click', () => {
  chat_page.style.display = "flex";
  hero.style.display = "none";
  footer.style.display = "none";
});

home_btn.addEventListener('click', () => {
  chat_page.style.display = "none";
  hero.style.display = "flex";
  footer.style.display = "flex";
});
