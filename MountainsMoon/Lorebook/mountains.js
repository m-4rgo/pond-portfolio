const m = document.getElementById('mountains');
const ctxM = m.getContext('2d');

function resizeCanvas() {
    m.width = window.innerWidth;
    m.height = window.innerHeight;
}

function getVar(name) {
    return getComputedStyle(document.body).getPropertyValue(name).trim();
}

// ---------- Draw glowing moon ----------
function drawMoon() {
    const moonX = m.width * 0.5;
    const moonY = m.height * 0.65;
    const moonRadius = 300;

    const gradient = ctxM.createRadialGradient(moonX, moonY, 0, moonX, moonY, moonRadius * 3);
    gradient.addColorStop(0, 'rgba(255,255,200,0.71)');
    gradient.addColorStop(0.5, 'rgba(255,255,200,0.1)');
    gradient.addColorStop(1, 'rgba(255,255,200,0)');

    ctxM.fillStyle = gradient;
    ctxM.beginPath();
    ctxM.arc(moonX, moonY, moonRadius * 3, 0, Math.PI * 2);
    ctxM.fill();

    ctxM.fillStyle = getVar('--moon');
    ctxM.beginPath();
    ctxM.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
    ctxM.fill();
}

// ---------- Draw mountains ----------
function drawMountains() {
    ctxM.fillStyle = getVar('--mountains');

    // ctxM.beginPath();
    // ctxM.moveTo(0, m.height);
    // ctxM.lineTo(0, m.height * 0.7);
    // ctxM.lineTo(m.width * 0.3, m.height * 0.55);
    // ctxM.lineTo(m.width * 0.6, m.height * 0.75);
    // ctxM.lineTo(m.width, m.height * 0.65);
    // ctxM.lineTo(m.width, m.height);
    // ctxM.closePath();
    // ctxM.fill();

    ctxM.beginPath();
    ctxM.moveTo(0, m.height);

// left rise (steep, clean)
    ctxM.lineTo(0, m.height * 0.55);

// first sharp peak
    ctxM.lineTo(m.width * 0.02, m.height * 0.56);
    ctxM.lineTo(m.width * 0.08, m.height * 0.48);
    ctxM.lineTo(m.width * 0.1, m.height * 0.51);
    ctxM.lineTo(m.width * 0.12, m.height * 0.52);
    ctxM.lineTo(m.width * 0.16, m.height * 0.56);

// second higher peak (main mass)
    ctxM.lineTo(m.width * 0.2, m.height * 0.52);
    ctxM.lineTo(m.width * 0.26, m.height * 0.50);
    ctxM.lineTo(m.width * 0.32, m.height * 0.42);
    ctxM.lineTo(m.width * 0.36, m.height * 0.50);

// jagged ridge down
    ctxM.lineTo(m.width * 0.42, m.height * 0.55);
    ctxM.lineTo(m.width * 0.48, m.height * 0.59);

// valley dip
    ctxM.lineTo(m.width * 0.54, m.height * 0.60);

// smaller secondary peak
    ctxM.lineTo(m.width * 0.60, m.height * 0.58);
    ctxM.lineTo(m.width * 0.64, m.height * 0.59);

// right main peak (tall but simpler)
    ctxM.lineTo(m.width * 0.72, m.height * 0.46);
    ctxM.lineTo(m.width * 0.78, m.height * 0.55);

// long slope down
    ctxM.lineTo(m.width * 0.82, m.height * 0.56);
    ctxM.lineTo(m.width * 0.88, m.height * 0.60);
    ctxM.lineTo(m.width * 0.9, m.height * 0.59);
    ctxM.lineTo(m.width * 0.95, m.height * 0.52);
    ctxM.lineTo(m.width, m.height * 0.55);

// close shape
    ctxM.lineTo(m.width, m.height);
    ctxM.closePath();
    ctxM.fill();
}

// function drawScene() {
//     ctxM.clearRect(0, 0, m.width, m.height);
//     if (document.body.classList.contains('night')) {
//         drawMoon();
//     }
//     drawMountains();
// }
function drawScene() {
    ctxM.clearRect(0, 0, m.width, m.height);

    // Draw moon if night or midnight
    // if (document.body.classList.contains('night') || document.body.classList.contains('midnight') || document.body.classList.contains('sunset')) {
    //     drawMoon();
    // }
    drawMoon();
    drawMountains();
}


// initial
resizeCanvas();
drawScene();

// resize
window.addEventListener('resize', () => {
    resizeCanvas();
    drawScene();
});

// 🔑 listen for theme change
// const observer = new MutationObserver(drawScene);
// observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
