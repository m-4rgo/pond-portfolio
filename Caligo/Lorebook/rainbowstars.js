window.onload = function() {
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');

    let stars = [];
    const numStars = 250;

    // Define the set of possible glow colors
    const glowColors = ['#ffea00', '#00ffff', '#ff00ff', '#ff4500', '#7fff00'];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stars = Array.from({length: numStars}, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 4 + 1,
            a: Math.random() * Math.PI * 2,
            d: Math.random() * 0.02 + 0.005,
            glowColor: glowColors[Math.floor(Math.random() * glowColors.length)] // random glow color
        }));
    }

    function drawStar(x, y, radius, glowColor) {
        const inner = radius * 0.4;
        const outer = radius;

        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI / 4) * i;
            const r = i % 2 === 0 ? outer : inner;
            const px = x + Math.cos(angle) * r;
            const py = y + Math.sin(angle) * r;

            if (i === 0) {
                ctx.moveTo(px, py);
            } else {
                ctx.lineTo(px, py);
            }
        }
        ctx.closePath();

        // Set fill and glow
        ctx.fillStyle = 'white';      // star core color
        ctx.shadowColor = glowColor;  // glow color
        ctx.shadowBlur = 5;            // glow intensity
        ctx.fill();

        // Reset shadowBlur so it doesn't affect other stars
        ctx.shadowBlur = 0;
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const s of stars) {
            s.a += s.d;
            const brightness = (Math.sin(s.a) + 1) / 2; // 0–1 range
            ctx.globalAlpha = brightness;
            drawStar(s.x, s.y, s.r, s.glowColor);
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
};
