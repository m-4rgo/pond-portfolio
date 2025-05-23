
// hide all sections except home
const sections = document.querySelectorAll("section");
for (const section of sections) {
    if (section.id !== "home") {
        section.classList.add("hidden");
    }
}

// load artworks from JSON file
function loadArtworks() {
    fetch('./gallery.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            displayGallery(data)})
        .catch(error => console.error('failed to fetch data', error));
}
// call loadArtworks to fetch data from json file
loadArtworks()

// function to generate gallery from json data
function displayGallery(data) {
    data.forEach((artwork) => {

        // greate gallery item div
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");

        // create image
        const img = document.createElement("img");
        img.src = artwork.src;
        img.alt = artwork.title;

        // create description box
        const info = document.createElement("p");
        info.textContent = artwork.description;

        // add image and info to gallery item
        galleryItem.appendChild(img);
        // galleryItem.appendChild(info);

        // pull the right gallery from the json file
        const galleryId = `${artwork.section}-gallery`;
        // add gallery item to the right gallery
        document.getElementById(galleryId).appendChild(galleryItem);
    })
}


// function to add a fade out animation when switching sections
function fadeOut(element) {
    let opacity = 1;

    function animate() {
        opacity -= 0.05;
        if (opacity <= 0) {
            element.style.opacity = 0;
            element.style.display= "none";
        } else {
            element.style.opacity = opacity;
            requestAnimationFrame(animate);
        }
    }
    animate();
}

// function to add fade in animation when switching sections
function fadeIn(element) {
    let opacity = 0;
    element.style.display= "block";
    element.style.opacity = opacity;

    function animate() {
        opacity += 0.05;
        if (opacity >= 1) {
            element.style.opacity = 1;
        } else {
        element.style.opacity = opacity;
        requestAnimationFrame(animate);
        }
    }
    animate();
}

// function to show/hide sections on navbar clicks
function navToggle() {
const navLinks = document.querySelectorAll("#navbar a");

// cycle through nav a elements
navLinks.forEach(link => {
    // add "on click" event listener for when each link is clicked
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // remove the active class style for all links
        navLinks.forEach(l => l.classList.remove("active"));

        // add active style to clicked link
        link.classList.add("active");

        const sectionName = link.getAttribute('data-target').replace("#", "")
        // sections.forEach(section => section.classList.add("hidden"));
        const targetSection = document.getElementById(sectionName);
        if (targetSection.style.display === "block") {
            return;
        }

        sections.forEach(section => {
            if (section.id === sectionName) {
                setTimeout(() => fadeIn(section), 300);
            } else {
                fadeOut(section);
            }
        });
    });
});
}


// call navToggle to allow navigation links to work.
navToggle()