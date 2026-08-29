const body = document.body;
const intro = document.getElementById('intro');
const openInvitation = document.getElementById('openInvitation');
const openText = document.getElementById('openText');
const music = document.getElementById('music');
const musicToggle = document.getElementById('musicToggle');

function openSite(){
  body.classList.add('opened');
  body.classList.remove('locked');
  setTimeout(() => { intro?.setAttribute('aria-hidden','true'); }, 900);
  playMusic();
}

async function playMusic(){
  try{
    await music.play();
    body.classList.add('music-on');
  }catch(e){ /* autoplay may be blocked */ }
}
function pauseMusic(){ music.pause(); body.classList.remove('music-on'); }
function toggleMusic(){ music.paused ? playMusic() : pauseMusic(); }

openInvitation?.addEventListener('click', openSite);
openText?.addEventListener('click', openSite);
musicToggle?.addEventListener('click', toggleMusic);

const targetDate = new Date('2026-10-03T18:00:00-05:00').getTime();
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateCountdown(){
  const now = Date.now();
  const diff = Math.max(targetDate - now, 0);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  daysEl.textContent = days;
  hoursEl.textContent = String(hours).padStart(2,'0');
  minutesEl.textContent = String(minutes).padStart(2,'0');
  secondsEl.textContent = String(seconds).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown,1000);

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>{
  if(!el.classList.contains('visible')) observer.observe(el);
});
