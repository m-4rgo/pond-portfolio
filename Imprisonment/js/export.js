// document.getElementById('saveBtn').addEventListener('click', function() {
//     const scene = document.getElementById('scene');
//
//     html2canvas(scene).then(canvas => {
//         // Convert canvas to data URL
//         const imgData = canvas.toDataURL('image/png');
//
//         // Create a temporary link to download
//         const link = document.createElement('a');
//         link.href = imgData;
//         link.download = 'scene.png';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     });
// });


document.getElementById('saveBtn').addEventListener('click', function() {
    const scene = document.getElementById('scene');

    html2canvas(scene, {
        backgroundColor: null, // <-- Makes background transparent
        scale: 1               // Optional: higher resolution
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'scene.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});