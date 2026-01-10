const contentEl = document.getElementById("content");

async function loadPage(page) {
    try {
        const res = await fetch(`/Caligo/Lorebook/Pages/${page}.md`);
        if (!res.ok) throw new Error("Page not found");

        const md = await res.text();
        contentEl.innerHTML = marked.parse(md);
    } catch (err) {
        contentEl.innerHTML = "<h2>Page not found</h2>";
    }
}

// Handle TOC clicks
document.querySelectorAll("[data-page]").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const page = link.dataset.page;
        window.location.hash = page;
        loadPage(page);
    });
});

// highlights active page
function setActive(page) {
    document.querySelectorAll("[data-page]").forEach(link => {
        link.classList.toggle("active", link.dataset.page === page);
    });
}
// function setActive(page) {
//     document.querySelectorAll("#lore-contents li").forEach(li => {
//         const link = li.querySelector("[data-page]");
//         li.classList.toggle("active", link && link.dataset.page === page);
//     });
// }
function saveMenu(page) {
    document.querySelectorAll("#lore-contents a").forEach(link => {
        link.classList.toggle("active", link.dataset.page === page);
    });

    // Expand parent menus of the active link only if they were not manually closed
    const activeLink = document.querySelector(`#lore-contents [data-page="${page}"]`);
    if (!activeLink) return;

    let parent = activeLink.parentElement;
    const menuState = JSON.parse(localStorage.getItem('menuState') || '{}');
    while (parent && parent.id !== "lore-contents") {
        if (parent.tagName === "LI" && parent.classList.contains("collapsible")) {
            const id = parent.querySelector('span').textContent.trim();
            // Only expand if user hasn't manually closed it
            if (menuState[id] !== false) {
                parent.classList.add("active");
            }
        }
        parent = parent.parentElement;
    }
}




// Handle back/forward & direct links
function loadFromHash() {
    const page = location.hash.replace("#", "") || "welcome";
    loadPage(page);
    setActive(page);
    saveMenu(page);
}

window.addEventListener("hashchange", loadFromHash);
loadFromHash();

/* =========================
   LINEAR PAGE NAVIGATION
   ========================= */

// Build ordered page list from the TOC
const pageLinks = Array.from(
    document.querySelectorAll("#lore-contents a[data-page]")
);
const pages = pageLinks.map(link => link.dataset.page);

const prevBtn = document.getElementById("prev-page");
const nextBtn = document.getElementById("next-page");

function getCurrentIndex() {
    const current = location.hash.replace("#", "") || "welcome";
    return pages.indexOf(current);
}

function goToPage(index) {
    if (index < 0 || index >= pages.length) return;
    const page = pages[index];
    location.hash = page;
    loadPage(page);
    setActive(page);
    saveMenu(page);
}

function updateNavButtons() {
    const index = getCurrentIndex();
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index === -1 || index >= pages.length - 1;
}

// Button handlers
prevBtn.addEventListener("click", () => {
    goToPage(getCurrentIndex() - 1);
});

nextBtn.addEventListener("click", () => {
    goToPage(getCurrentIndex() + 1);
});

// Keyboard navigation
document.addEventListener("keydown", e => {
    // Ignore typing in inputs/textareas
    if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

    const index = getCurrentIndex();

    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goToPage(index - 1);
    }

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goToPage(index + 1);
    }
});

// Keep buttons in sync
window.addEventListener("hashchange", updateNavButtons);
updateNavButtons();
