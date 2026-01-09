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
// function setActive(page) {
//     document.querySelectorAll("[data-page]").forEach(link => {
//         link.classList.toggle("active", link.dataset.page === page);
//     });
// }
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
    const page = location.hash.replace("#", "") || "intro";
    loadPage(page);
    setActive(page);
    saveMenu(page);
}

window.addEventListener("hashchange", loadFromHash);
loadFromHash();
