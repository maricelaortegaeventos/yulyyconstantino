const intro = document.getElementById('intro');
const openInvitation = document.getElementById('openInvitation');
const openText = document.getElementById('openText');
const musicLink = document.getElementById('musicLink');

let invitationOpened = false;
function openExperience() {
  if (invitationOpened) return;
  invitationOpened = true;
  intro.classList.add('opened');
  window.setTimeout(() => document.body.classList.remove('locked'), 900);
}
openInvitation?.addEventListener('click', openExperience);
openText?.addEventListener('click', openExperience);

const weddingDate = new Date('2026-10-03T18:00:00-05:00').getTime();
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
function updateCountdown() {
  const distance = weddingDate - Date.now();
  if (distance <= 0) {
    daysEl.textContent = '0'; hoursEl.textContent = '00'; minutesEl.textContent = '00'; secondsEl.textContent = '00'; return;
  }
  daysEl.textContent = Math.floor(distance / 86400000);
  hoursEl.textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, '0');
  minutesEl.textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, '0');
  secondsEl.textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -30px 0px' });
reveals.forEach((el) => observer.observe(el));
document.querySelector('.hero-card')?.classList.add('visible');
