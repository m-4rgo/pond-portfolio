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
            r: Math.random() * 1.5 + 0.5,
            a: Math.random() * Math.PI * 2,
            d: Math.random() * 0.02 + 0.005
        }));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const s of stars) {
            s.a += s.d;
            const brightness = (Math.sin(s.a) + 1) / 2; // 0–1 range
            ctx.globalAlpha = brightness;
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
};