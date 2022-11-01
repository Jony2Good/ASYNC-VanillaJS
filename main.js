const cssPromises = {};
const style =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css";

const loadResource = (src) => {
  //модуль
  if (src.endsWith(".js")) {
    return import(src);
  }
  //файл со стилями
  if (src.endsWith(".css")) {
    if (!cssPromises[src]) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = src;
      cssPromises[src] = new Promise((resolve) => {
        link.addEventListener("load", () => resolve);
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  //данные с сервера
  return fetch(src).then((res) => res.json());
};

const container = document.querySelector(".container");

export function renderPage(modulName, apiURL) {
  try {
    Promise.all([modulName, apiURL].map((res) => loadResource(res))).then(
      ([filmsPage, data]) => {
        container.innerHTML = "";
        container.append(filmsPage.render(data));
      }
    );
  } catch (error) {
    console.log(error);
  }
}

const searchParams = new URLSearchParams(window.location.search);
const filmId = searchParams.get("filmId");
if (filmId) {
  renderPage("./episodes-details.js", `https://swapi.dev/api/films/${filmId}`);
} else {
  renderPage("./episodes-list.js", "https://swapi.dev/api/films");
}

window.addEventListener("popstate", () => {
  const searchParams = new URLSearchParams(window.location.search);
  const filmId = searchParams.get("filmId");

  if (filmId) {
    renderPage(
      "./episodes-details.js",
      `https://swapi.dev/api/films/${filmId}`
    );
  } else {
    renderPage("./episodes-list.js", "https://swapi.dev/api/films");
  }
});
