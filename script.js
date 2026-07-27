function toggleMusic() {
    const audio = document.getElementById('bg-music');
    const btn = document.getElementById('music-btn');
    if (audio.paused) {
        audio.play();
        btn.classList.add('playing');
        btn.innerHTML = '&#10074;&#10074;';
    } else {
        audio.pause();
        btn.classList.remove('playing');
        btn.innerHTML = '&#9835;';
    }
}

function enterSite() {
    document.getElementById('intro-overlay').classList.add('hidden');
    toggleMusic();
    triggerConfetti();
}

const track = document.getElementById('gallery-track');
const gallery = document.getElementById('gallery');
const totalImages = 22;
let loadedCount = 0;

for (let i = 1; i <= totalImages; i++) {
    const img = document.createElement('img');
    img.src = `pngs/${i}.png`;
    img.alt = `Memory ${i}`;
    img.loading = 'lazy';
    img.draggable = false;

    img.addEventListener('load', () => {
        img.classList.add('loaded');
        loadedCount++;
        if (loadedCount <= 4) {
            setGalleryHeight();
        }
    });

    img.addEventListener('error', () => {
        img.classList.add('error');
        img.alt = '';
    });

    track.appendChild(img);
}

function setGalleryHeight() {
    const totalWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollableWidth = Math.max(totalWidth - viewportWidth, 0);
    gallery.style.height = `calc(100vh + ${scrollableWidth}px)`;
}

setGalleryHeight();
window.addEventListener('resize', setGalleryHeight);

let ticking = false;

function updateHorizontalScroll() {
    const rect = gallery.getBoundingClientRect();
    const galleryHeight = gallery.offsetHeight;
    const viewportHeight = window.innerHeight;
    const maxScroll = galleryHeight - viewportHeight;

    if (maxScroll <= 0) return;

    const progress = Math.max(0, Math.min(1, (-rect.top) / maxScroll));
    const maxTranslate = Math.max(track.scrollWidth - window.innerWidth, 0);

    track.style.transform = `translateX(${-progress * maxTranslate}px)`;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateHorizontalScroll();
            ticking = false;
        });
        ticking = true;
    }
});

function updateImageFocus() {
    const trackRect = track.getBoundingClientRect();
    const centerX = trackRect.left + trackRect.width / 2;
    const images = track.querySelectorAll('img.loaded');

    images.forEach((img) => {
        const imgRect = img.getBoundingClientRect();
        const imgCenterX = imgRect.left + imgRect.width / 2;
        const distance = Math.abs(imgCenterX - centerX);
        const maxDistance = window.innerWidth / 2 + 200;
        const normalized = Math.min(1, distance / maxDistance);

        const zIndex = Math.round(100 - normalized * 10);
        const opacity = 1 - normalized * 0.25;

        img.style.zIndex = zIndex;
        img.style.opacity = Math.max(0.5, opacity);

        const dockScale = img.dataset.dockScale ? parseFloat(img.dataset.dockScale) : 1;
        img.style.transform = `scale(${dockScale})`;
    });
}

let focusTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(focusTimeout);
    focusTimeout = setTimeout(updateImageFocus, 30);
});

updateImageFocus();

track.addEventListener('mousemove', (e) => {
    const images = track.querySelectorAll('img.loaded');
    const maxDist = 160;

    images.forEach((img) => {
        const imgRect = img.getBoundingClientRect();
        const imgCenterX = imgRect.left + imgRect.width / 2;
        const distance = Math.abs(e.clientX - imgCenterX);

        let scale = 1;
        if (distance < maxDist) {
            scale = 1 + (1 - distance / maxDist) * 0.45;
            img.style.zIndex = 200;
        }

        img.dataset.dockScale = scale;
        img.style.transform = `scale(${scale})`;
    });
});

track.addEventListener('mouseleave', () => {
    track.querySelectorAll('img').forEach((img) => {
        img.dataset.dockScale = 1;
    });
    updateImageFocus();
});

track.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const images = track.querySelectorAll('img.loaded');
    const maxDist = 160;

    images.forEach((img) => {
        const imgRect = img.getBoundingClientRect();
        const imgCenterX = imgRect.left + imgRect.width / 2;
        const distance = Math.abs(touch.clientX - imgCenterX);

        let scale = 1;
        if (distance < maxDist) {
            scale = 1 + (1 - distance / maxDist) * 0.45;
            img.style.zIndex = 200;
        }

        img.dataset.dockScale = scale;
        img.style.transform = `scale(${scale})`;
    });
}, { passive: true });

track.addEventListener('touchend', () => {
    track.querySelectorAll('img').forEach((img) => {
        img.dataset.dockScale = 1;
    });
    setTimeout(updateImageFocus, 150);
});

const messageContent = document.querySelector('.message-content');
if (messageContent) {
    const messageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    messageObserver.observe(messageContent);
}

const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confettiPieces = [];
let animationId = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class ConfettiPiece {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * -1 - 20;
        this.w = Math.random() * 10 + 5;
        this.h = Math.random() * 6 + 3;
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = Math.random() * 3 + 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        const colors = ['#ff69b4', '#e91e63', '#c2185b', '#ff4081', '#f48fb1', '#ffd54f', '#ff8a65', '#ce93d8'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = 1;
        this.fadeSpeed = Math.random() * 0.008 + 0.003;
    }

    update() {
        this.x += this.vx;
        this.vy += 0.05;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.opacity -= this.fadeSpeed;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
        ctx.restore();
    }
}

function triggerConfetti() {
    for (let i = 0; i < 200; i++) {
        confettiPieces.push(new ConfettiPiece());
    }

    if (!animationId) {
        animateConfetti();
    }

    const btn = document.getElementById('celebrate-btn');
    btn.textContent = 'Happy Birthday!';
    btn.style.pointerEvents = 'none';
    setTimeout(() => {
        btn.textContent = 'Celebrate!';
        btn.style.pointerEvents = '';
    }, 2500);
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces = confettiPieces.filter((p) => p.opacity > 0 && p.y < canvas.height + 20);

    confettiPieces.forEach((p) => {
        p.update();
        p.draw();
    });

    if (confettiPieces.length > 0) {
        animationId = requestAnimationFrame(animateConfetti);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationId = null;
    }
}

window.addEventListener('load', () => {
    setTimeout(() => {
        setGalleryHeight();
        updateHorizontalScroll();
        updateImageFocus();
    }, 200);
});
