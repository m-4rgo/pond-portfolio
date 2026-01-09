const contentEl = document.getElementById("content");

async function loadPage(page) {
    try {
        const res = await fetch(`pages/${page}.md`);
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

// Handle back/forward & direct links
function loadFromHash() {
    const page = location.hash.replace("#", "") || "intro";
    loadPage(page);
    setActive(page);
}

window.addEventListener("hashchange", loadFromHash);
loadFromHash();
