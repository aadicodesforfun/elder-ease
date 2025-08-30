const discover = document.querySelector('.discover-more');
const discover_btn = document.querySelector('.discover-btn');
const hero = document.querySelector('.hero');
const footer = document.querySelector('footer');

const send_btn = document.querySelector('.send');

const discover_close = document.querySelector('.discover-close');

const chat_btn = document.querySelector('.chat');
const chat_page = document.querySelector('.chat-ai');

const API_KEY = "AIzaSyBupoaW1pNMn-KymvrJHMGreUzE1uLVVcc";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const query = document.querySelector('.queries');

async function callGemini(query) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: `${query}` }]
        }
      ]
    }),
  });

  const data = await response.json();
  return data.candidates[0].content.parts[0].text
}

let heading = document.querySelector('.chat-ai h2');

send_btn.addEventListener('click', () => {
    let userQuery = query.value;
    callGemini(userQuery).then(response => {heading.textContent = response});
})

discover_btn.addEventListener('click', () => {
    discover.style.display = "flex";
})
discover_close.addEventListener('click', () => {
    discover.style.display = "none";
})

chat_btn.addEventListener('click', () => {
    chat_page.style.display = "flex";
    hero.style.display = "none";
    footer.style.display = "none";
})