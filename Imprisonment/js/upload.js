document.getElementById('fileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const character = document.getElementById('character');
    character.src = URL.createObjectURL(file);
});
