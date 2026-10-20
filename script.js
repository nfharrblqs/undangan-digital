window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if(loadingScreen){
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500); 
    }
    
});

const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('to');
if (guestName) {
    const guestElem = document.getElementById('guest-name');
    if (guestElem) guestElem.innerText = guestName;
}

function openWedding() {
    const cover = document.getElementById('cover');
    const mainContent = document.getElementById('main-content');

    if(mainContent){
            mainContent.classList.remove('content-hidden');
    }

    setTimeout(() => {
        if(cover){
            cover.classList.add('cover-hidden');
        }
    })
    
    window.scrollTo(0,0);
        
    if (typeof playMusic === 'function'){
        playMusic();
    }

    if (typeof createPetals === 'function'){
        createPetals();
    }
}

const audio = document.getElementById('background-music');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');

function playMusic(){
    audio.play().then(() => {
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
    }).catch(err => console.log("Autoplay blocked:", err));
}

function toggleMusic(){
    if (audio.paused) {
        audio.play();
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
    } else {
        audio.pause();
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
    }
}

const weddingDate = new Date('November 15, 2026 08:00:00').getTime();

const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0){
        clearInterval(countdownTimer);
        document.getElementById('countdown').innerHTML = "<h3 class='text-gold'>Acara Telah Berlangsung</h3>";
        return;
    }

    document.getElementById('days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById('hours').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById('minutes').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById('seconds').innerText = Math.floor((distance % (1000 * 60)) / 1000);
}, 1000);

function createPetals() {
    const container = document.getElementById('petals-container');

    if (!container) return;

    container.innerHTML = '';

    const petalCount = 20;

    for (let i=0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        const size = Math.random() * 15 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${Math.random() * 5 + 5}s`;
        petal.style.animationDelay = `${Math.random() * 5}s`;

        container.appendChild(petal);
    }
}

function showToast(message) {
    document.getElementById('toast-body').innerText = message;
    const toastEl = document.getElementById('toast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

function submitRSVP(e) {
    e.preventDefault();

    const nameEl = document.getElementById('rsvp-name');
    const statusEl = document.getElementById('rsvp-status');
    const messageEl = document.getElementById('rsvp-message');

    if (!nameEl || !statusEl || !messageEl) {
        console.error("Elemen input RSP tidakditemuka di HTML!");
        return;
    }

    const name = nameEl.value.trim();
    const status = statusEl.value;
    const message = messageEl.value.trim();

    if (!name) {
        alert("Harap isi nama anda!");
        return;
    }

    const wishesList = document.getElementById('wishes-list');
    if (wishesList){
        const wishItem = document.createElement('div');
        wishItem.className = 'list-group-item list-group-item-action flex-column align-items-start mb-2 shadow-sm rounded';
        wishItem.innerHTML = `
        <div class="d-flex w-100 justify-content-between align-items-center">
            <h6 class="mb-1 fw-bold">${escapeHtml(name)}</h6>
            <span class="badge ${status == 'Hadir' ? 'bg-success' : 'bg-secondary'}">${status}</span>
        </div>
        <p class="mb-1 text-muted small">${escapeHtml(message || '-')}</p>
        `;
        wishesList.prepend(wishItem);
    }
    
    if (typeof showToast === 'function'){
        showToast('Terima kasih, konfirmasi Anda telah dikirim! :)');
    }

    document.getElementById('rsvp-form').reset();
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}