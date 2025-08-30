// import {gsap} from "gsap";

const discover = document.querySelector('.discover-more');
const discover_btn = document.querySelector('.discover-btn');
const hero = document.querySelector('.hero');
const footer = document.querySelector('footer');

const discover_close = document.querySelector('.discover-close');

const chat_btn = document.querySelector('.chat');
const chat_page = document.querySelector('.chat-ai');

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