
// hide all sections except home
const sections = document.querySelectorAll("section");
for (const section of sections) {
    if (section.id !== "home") {
        section.classList.add("hidden");
    }
}

//  track which section is active on screen
let currentSectionName = "home";
let currentSection = document.getElementById(currentSectionName);
let imageViewerState = "none";

// burger menu button toggle
function burgerToggle() {
    // get navbar
    const navbar = document.getElementById("navbar");
    // add event listener to burger button to open navbar on click
    document.getElementById("burger-button").addEventListener('click', function () {
        navbar.classList.toggle("show");
    });

    // get navbar links
    const navLinks = document.querySelectorAll("#navbar a");
    // for each link add event listener that closes navbar when any one is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navbar.classList.remove("show");
        })
    })
}
// call to function
burgerToggle();

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

        // create gallery item div
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");

        // create image
        const img = document.createElement("img");
        img.src = artwork.src;
        img.alt = artwork.title;
        img.dataset.title = artwork.title;
        img.dataset.description = artwork.description;

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

        // add click event listener to all images and call viewArtwork on click, so that images can be viewed fullscreen on click
        img.addEventListener("click", () => {
            viewArtwork(img.src, img.dataset.title, img.dataset.description, artwork.section);
        })
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
            element.classList.add("hidden");
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
    element.classList.remove("hidden");

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

        // get the target section from the link data
        const sectionName = link.getAttribute('data-target').replace("#", "")

        // redundant code as fadein/fadeout changed hiding technique
        // sections.forEach(section => section.classList.add("hidden"));

        // set target section as the section name
        const targetSection = document.getElementById(sectionName);
        // if the target section is already visible, return
        if (targetSection.style.display === "block") {
            return;
        }

        // cycle through sections and if section is target section, then fade in, else, fade out.
        sections.forEach(section => {
            if (section.id === sectionName) {
                currentSectionName = sectionName;
                currentSection = targetSection;
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

// function to open artwork page on gallery image click
function viewArtwork(src, title, description, section) {
    // hide the current section on image click
    fadeOut(currentSection);

    // get image from the viewer
    const viewerImg = document.getElementById("viewer-img");

    // populate the image viewer with image details
    viewerImg.src = src;
    viewerImg.alt = title;
    document.getElementById("viewer-title").textContent = title;
    document.getElementById("viewer-description").textContent = description;

    // remove pixel class so it is not applied to all classes
    viewerImg.classList.remove("pixel");

    // apply pixel class if image is in pixel section
    if (section === "pixel") {
        viewerImg.classList.add("pixel");
    }

    // show the image viewer
    const imageViewer = document.getElementById("image-viewer");

    setTimeout(() => fadeIn(imageViewer), 300);
}

// function to add functionality to image viewer close button
function closeImageViewer() {
// close image-viewer button functionality
    document.getElementById("close-viewer").addEventListener("click", () => {
        fadeOut(document.getElementById("image-viewer"));
        document.getElementById("image-viewer").classList.add("viewer-hidden");
        //     re-show the current section when close button is clicked
        const section = document.getElementById(currentSectionName);

        setTimeout(() => fadeIn(section), 300);
    })
}
// call so close button works
closeImageViewer();