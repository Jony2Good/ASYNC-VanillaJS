import { renderPage } from "./main.js";

export function render(data) {
  const $container = document.createElement("div"),
    $cardContainer = document.createElement("div"),
    $itemTitle = document.createElement("h1"),
    $text = document.createElement("p"),
    $imgContainer = document.createElement("div"),
    $img = document.createElement("img"),
    $listWrap = document.createElement("div"),
    $btnWrap = document.createElement("div"),
    $btn = document.createElement("button");

  $container.classList.add("card", "d-flex", "flex-row");

  $imgContainer.classList.add("p-2", "flex-fill", "d-flex", "flex-column");
  $img.classList.add("card-img-top", "img-thumbnail", "rounded");

  const searchParams = new URLSearchParams(window.location.search);
  const filmId = searchParams.get("filmId");

  data.results.forEach((item, index) => {
    let num = `${index + 1}`;
    if (filmId === num) {
      $itemTitle.textContent = item.title;
      $text.innerHTML = item.opening_crawl;
      $img.src = `./img/SW-${item.episode_id}.jpg`;
      renderInfo("Planets", item.planets, $listWrap);
      renderInfo("Starships", item.starships, $listWrap);
      renderInfo("Species", item.species, $listWrap);
    }
  });

  $cardContainer.classList.add("card-body");

  $itemTitle.classList.add("card-title");

  $text.classList.add("card-text");

  $btn.textContent = "Back to episodes";
  $btn.classList.add("btn", "btn-dark");
  $btnWrap.classList.add("mt-3");
  $btnWrap.append($btn);

  $btn.addEventListener("click", () => {
    history.back();
    renderPage("./episodes-list.js", "https://swapi.dev/api/films");
  });

  $listWrap.classList.add("container");

  $imgContainer.append($img, $btnWrap);
  $cardContainer.append($itemTitle, $text, $listWrap);
  $container.append($imgContainer, $cardContainer);

  return $container;
}

function renderInfo(title, data, wrapper) {
  const response = data.map((url) => fetch(url).then((res) => res.json()));
  const dataArr = Promise.all(response).then((res) =>
    res.map((item) => {
      return item;
    })
  );
  dataArr.then((item) => {
    const $container = document.createElement("div");
    $container.classList.add("row", "mb-3");
    const $h2 = document.createElement("h2");
    $h2.classList.add("h2", "text-center");
    $h2.textContent = title;
    const $list = document.createElement("ol");
    $list.classList.add("list-group", "list-group-numbered");

    item.forEach((elem) => {
      const $li = document.createElement("li");
      $li.classList.add("list-group-item");
      $li.textContent = elem.name;
      $list.append($li);
      $container.append($h2, $list);

      switch (title) {
        case "Planets":
          $li.classList.add("list-group-item-primary");
          break;
        case "Starships":
          $li.classList.add("list-group-item-danger");
          break;
        case "Species":
          $li.classList.add("list-group-item-warning");
          break;
        default:
          $li.classList.add("list-group-item-success");
      }
    });

    wrapper.append($container);
  });
}
