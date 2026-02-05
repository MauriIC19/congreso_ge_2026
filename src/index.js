
const routes = {
    "#/": {
        linkLabel: "Congreso 2026",
        view: "src/views/2026.html"
    },
    "#/2025": {
        linkLabel: "Congreso 2025",
        view: "src/views/2025.html"
    }
};

const updateActiveNavLink = (activeHash) => {
    document.querySelectorAll(".main-nav").forEach(link => {
        link.classList.remove("active");
        console.log(activeHash.split('?'))

        if (link.getAttribute("href") === activeHash.split('?')[0]) {
            link.classList.add("active");
        }
    });
};

const app = document.querySelector("#app");
const nav = document.querySelector("#nav");

const renderContent = async (route) => {
    const [path, queryString] = route.split('?');
    const selectedRoute = routes[path] || routes["#/"];


    try {
        const response = await fetch(selectedRoute.view);
        if (!response.ok) throw new Error("Page not found");
        const html = await response.text();
        app.innerHTML = html;
        updateActiveNavLink(route);
        scrollTo(0, 0);
        if (queryString) {
            const urlParams = new URLSearchParams(queryString);
            const sectionId = urlParams.get('section');
            const element = document.getElementById(sectionId);

            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    } catch (error) {
        app.innerHTML = `<h1>404</h1><p>La página no existe.</p>`;
    }
};

const navigate = async (e) => {
    const route = e.target.getAttribute("href");
    window.location.hash = route;
};

const registerNavLinks = () => {
    nav.addEventListener("click", (e) => {
        e.preventDefault();
        navigate(e);
    });
};

const renderNavlinks = () => {
    const navFragment = document.createDocumentFragment();
    Object.keys(routes).forEach((route) => {
        const { linkLabel } = routes[route];

        const linkElement = document.createElement("a");
        linkElement.href = route;
        linkElement.textContent = linkLabel;
        linkElement.className = "main-nav";
        navFragment.appendChild(linkElement);
    });
    nav.append(navFragment);
};

const registerBrowserBackAndForth = () => {
    window.addEventListener("hashchange", () => {
        renderContent(window.location.hash);
    });
};

const renderInitialPage = () => {
    const route = window.location.hash || "#/";
    renderContent(route);
};

(function bootup() {
    renderNavlinks();
    registerNavLinks();
    registerBrowserBackAndForth();
    renderInitialPage();
})();
