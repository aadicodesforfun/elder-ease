// ===== DOM ELEMENTS =====
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
const messageUI = document.querySelector('.message-ui');

const API_KEY = "AIzaSyBupoaW1pNMn-KymvrJHMGreUzE1uLVVcc";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// Store conversation for context
let chatHistory = [];

async function callGemini(userQuery) {
  try {
    // Include previous chat messages for context
    const prompt = chatHistory.concat(`User: ${userQuery}`).join("\n");

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      }),
    });

    const data = await response.json();
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't respond.";

    // Add bot reply to chat history
    chatHistory.push(`Bot: ${botReply}`);
    return botReply;

  } catch (err) {
    console.error(err);
    return "Error: Could not reach AI server.";
  }
}

function addMessage(text, sender = "user") {
  if (!text.trim()) return;

  const msg = document.createElement("div");
  msg.classList.add("message", sender === "user" ? "user-messages" : "bot-messages");
  msg.textContent = text;

  messageUI.appendChild(msg);
  messageUI.scrollTop = messageUI.scrollHeight; // Auto-scroll

  // Add to chat history if user
  if (sender === "user") chatHistory.push(`User: ${text}`);
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  // Hide the greeting if it's visible
  const greet = document.querySelector('.chat-greet');
  if(greet){
    gsap.to(greet, {
      opacity: 0,
      y:-20,
      duration: 0.5,
      onComplete: () => greet.remove()
    })
  }

  addMessage(text, "user");
  input.value = "";

  const botReply = await callGemini(text);
  addMessage(botReply, "bot");
}

send_btn.addEventListener("click", sendMessage);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

discover_btn.addEventListener('click', () => {
  discover.style.display = "flex";
  gsap.fromTo(
    '.discover-more',
    { x: "100%", opacity: 0 },
    { x: "0%", opacity: 1, duration: 0.8, ease: "power2.out" }
  );
});

discover_close.addEventListener('click', () => {
  gsap.to('.discover-more', {
    x: "100%",
    opacity: 0,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => { discover.style.display = "none"; }
  });
});


chat_btn.addEventListener('click', () => {
  chat_page.style.display = "flex";
  gsap.from(chat_page, {
    opacity: 0,
    duration: 0.8,
    translateY: "-30%"
  })
  hero.style.display = "none";
  footer.style.display = "none";

  input.focus();
})

home_btn.addEventListener('click', ()=>{
  chat_page.style.display = "none";
  hero.style.display = "flex";
  footer.style.display = "flex";
})