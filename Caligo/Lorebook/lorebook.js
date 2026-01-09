fetch('lore/lore-index.json')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('lore-contents');
        container.appendChild(buildList(data, 'lore'));
    });

function buildList(obj, basePath) {
    const ul = document.createElement('ul');

    for (const key in obj) {
        const li = document.createElement('li');

        if (typeof obj[key] === 'string') {
            const a = document.createElement('a');
            a.href = `lore-viewer.html?file=${basePath}/${key}`;
            a.textContent = obj[key];
            li.appendChild(a);
        } else {
            const span = document.createElement('span');
            span.textContent = key.replace(/-/g, ' ');
            li.appendChild(span);

            li.appendChild(buildList(obj[key], `${basePath}/${key}`));
        }

        ul.appendChild(li);
    }

    return ul;
}


function buildBreadcrumbs(path) {
    const nav = document.getElementById('breadcrumbs');
    const parts = path.replace('lore/', '').split('/');
    let currentPath = 'lore';

    nav.innerHTML = '<a href="lore.html">Lore</a>';

    parts.forEach((part, index) => {
        currentPath += '/' + part;
        const name = part.replace('.md', '').replace(/-/g, ' ');
        nav.innerHTML += ` › <span>${name}</span>`;
    });
}
buildBreadcrumbs(file);
