window.onload = function() {
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');

    let stars = [];
    const numStars = 250;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stars = Array.from({length: numStars}, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 4 + 1, // slightly bigger for star points
            a: Math.random() * Math.PI * 2,
            d: Math.random() * 0.02 + 0.005
        }));
    }

    // function drawStar(x, y, radius) {
    //     ctx.beginPath();
    //     // 4-pointed star (like a "+" rotated 45°)
    //     ctx.moveTo(x, y - radius); // top
    //     ctx.lineTo(x + radius, y); // right
    //     ctx.lineTo(x, y + radius); // bottom
    //     ctx.lineTo(x - radius, y); // left
    //     ctx.closePath();
    //     ctx.fill();
    // }

    function drawStar(x, y, radius) {
        const inner = radius * 0.4;   // short diagonal points
        const outer = radius;         // long points

        ctx.beginPath();

        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI / 4) * i; // 45° steps
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
        ctx.fill();
    }


    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const s of stars) {
            s.a += s.d;
            const brightness = (Math.sin(s.a) + 1) / 2; // 0–1 range
            ctx.globalAlpha = brightness;
            ctx.fillStyle = 'white';
            drawStar(s.x, s.y, s.r);
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
};
