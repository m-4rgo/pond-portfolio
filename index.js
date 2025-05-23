
// hide all sections except home
const sections = document.querySelectorAll("section");
for (const section of sections) {
    if (section.id !== "home") {
        section.classList.add("hidden");
    }
}

// function to show/hide sections on navbar clicks
function navToggle() {
const navLinks = document.querySelectorAll("#navbar a");

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionName = link.getAttribute('data-target').replace("#", "")
        sections.forEach(section => section.classList.add("hidden"));

        document.getElementById(sectionName).classList.remove("hidden");
    });
});
}

navToggle()