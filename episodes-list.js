import { renderPage } from "./main.js";

export function render(data) {
  const $table = document.createElement("table"),
    $thead = document.createElement("thead"),
    $trow = document.createElement("tr"),
    $thNumber = document.createElement("th"),
    $thTitle = document.createElement("th"),
    $thEpisode = document.createElement("th"),
    $thDirectorName = document.createElement("th"),
    $thReleaseDate = document.createElement("th");

  const tbody = document.createElement("tbody");

  $table.classList.add("table", "table-primary", "table-hover");
  $thNumber.textContent = "#";
  $thTitle.textContent = "Title";
  $thEpisode.textContent = "Episode";
  $thDirectorName.textContent = "Film director name";
  $thReleaseDate.textContent = "Release date";

  let arrElements = [
    $thNumber,
    $thTitle,
    $thEpisode,
    $thDirectorName,
    $thReleaseDate,
  ];
  for (const items of arrElements) items.setAttribute("scope", "col");

  $trow.append(
    $thNumber,
    $thTitle,
    $thEpisode,
    $thDirectorName,
    $thReleaseDate
  );
  $thead.append($trow);
  $table.append($thead);

  data.results.forEach((items, index) => {
    const trow = document.createElement("tr");
    const thead = document.createElement("th");
    const tTitle = document.createElement("td");
    const tEpisode = document.createElement("td");
    const tDirectorName = document.createElement("td");
    const tReleaseDate = document.createElement("td");
    const link = document.createElement("a");

    thead.setAttribute("scope", "row");
    thead.textContent = `${index + 1}`;

    link.textContent = items.title;
    link.href = `?filmId=${index + 1}`;
    link.id = `${index + 1}`

    tEpisode.textContent = romanize(items.episode_id);
    tDirectorName.textContent = items.director;
    tReleaseDate.textContent = items.release_date;

    tTitle.append(link);
    trow.append(thead, tTitle, tEpisode, tDirectorName, tReleaseDate);
    tbody.append(trow);

    link.addEventListener("click", (e) => {
      e.preventDefault();
      renderPage(
        "./episodes-details.js",
        `https://swapi.dev/api/films/`
      )
      history.pushState(null, "", link.href);
    });
  });

  $table.append(tbody);
  return $table;
}

function romanize(num) {
  var lookup = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    },
    roman = "",
    i;
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}
