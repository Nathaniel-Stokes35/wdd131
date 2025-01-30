function generateSrcSet(imageName, sizes) {
  return sizes.map(size => `./images/temple-images/images-min/${imageName}-${size}.webp ${size}w`).join(", ");
}

function title(str) {
  return str
    .split(/[-\s]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function handleLastRow(albumBox, cards, columns){
  const lastRow = cards.length % columns;

  if (lastRow === 0) return;
  
  const lastRowCards = Array.from(albumBox.children).slice(-lastRow);
  lastRowCards.forEach(card => {
    card.classList.add("last-row");
    card.style.gridColumn = `span ${columns}`;
    card.style.display = "flex";
    card.style.justifyContent = "center";
  });
}

function displayTemples(temples){
  albumBox.innerHTML = "";
  let templeCards = [];
  temples.forEach(temple => {
    const templeTitle = title(temple.templeName);
    const templeFile = temple.templeName.toLowerCase().replace(/\s+/g, '-');

    const card = document.createElement("div");
    card.classList.add("temple-card");

    const imgSrcSet = `./images/temple-images/280px/${templeFile}-280w.webp 280w, 
    ./images/temple-images/540px/${templeFile}-540w.webp 540w, 
    ./images/temple-images/600px/${templeFile}-600w.webp 600w`;

    const img = document.createElement("img");
    img.setAttribute("srcset", imgSrcSet);
    img.setAttribute("sizes", "(max-width: 599px) 280px, (max-width: 1199px) 540px, (max-width: 1599px) 600px, 600px");
    img.setAttribute("src", `./images/temple-images/600px/${templeFile}-600w.webp`);
    img.setAttribute("alt", templeTitle);
    img.setAttribute("loading", "lazy");

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = `${templeTitle} Temple`;

    const figure = document.createElement("figure");
    figure.appendChild(img);
    figure.appendChild(figcaption);

    const info = document.createElement("div");
    info.classList.add("temple-info");

    const name = document.createElement("p");
    name.textContent = `Temple Name: ${templeTitle}`;

    const location = document.createElement("p");
    location.textContent = `Location: ${temple.location}`;

    const dedicated = document.createElement("p");
    dedicated.textContent = `Dedicated: ${temple.dedicated}`;

    const area = document.createElement("p");
    area.textContent = `Area: ${temple.area.toLocaleString()} sq ft`;

    info.append(name, location, dedicated, area);
    card.appendChild(figure);
    card.appendChild(info);
    card.classList.add("temple-card");
    templeCards.push(card);

    albumBox.appendChild(card);
  });
  handleLastRow(albumBox, templeCards, columns);
}

function filterTemples(filter) {
  let filteredTemples;
  let selection = document.getElementById('selection')
  switch(filter) {
    case "old":
      selection.textContent = `${title(filter)} Temples`;
      filteredTemples = temples.filter(temple => new Date(temple.dedicated).getFullYear() < 1900);
      break;
    case "new":
      selection.textContent = `${title(filter)} Temples`;
      filteredTemples = temples.filter(temple => new Date(temple.dedicated).getFullYear() > 2000);
      break;
    case "large":
      selection.textContent = `${title(filter)} Temples`;
      filteredTemples = temples.filter(temple => temple.area > 90000);
      break;
    case "small":
      selection.textContent = `${title(filter)} Temples`;
      filteredTemples = temples.filter(temple => temple.area < 10000);
      break;
    case "home":
      selection.textContent = "Temple Album";
      filteredTemples = temples;
      break;
    default:
      selection.textContent = title(filter);
      filteredTemples = temples;
      break;
  }
  displayTemples(filteredTemples);
}

function navigation_respond() {
    const ham = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const titles = document.getElementById("titles");

    ham.classList.toggle("active");
    if (navLinks.style.display === "none" || navLinks.style.display === "") {
        navLinks.style.display = "grid"
        titles.style.display = "none";
    } else {
        navLinks.style.display = "none";
        titles.style.display = "flex";
    }
}

const temples = [
    {
      templeName: "Aba Nigeria",
      location: "Aba, Nigeria",
      dedicated: "2005, August, 7",
      area: 11500,
    },
    {
      templeName: "Manti Utah",
      location: "Manti, Utah, United States",
      dedicated: "1888, May, 21",
      area: 74792,
    },
    {
      templeName: "Payson Utah",
      location: "Payson, Utah, United States",
      dedicated: "2015, June, 7",
      area: 96630,
    },
    {
      templeName: "Yigo Guam",
      location: "Yigo, Guam",
      dedicated: "2020, May, 2",
      area: 6861,
    },
    {
      templeName: "Washington DC",
      location: "Kensington, Maryland, United States",
      dedicated: "1974, November, 19",
      area: 156558,
    },
    {
      templeName: "Lima Peru",
      location: "Lima, Perú",
      dedicated: "1986, January, 10",
      area: 9600,
    },
    {
      templeName: "Mexico City Mexico",
      location: "Mexico City, Mexico",
      dedicated: "1983, December, 2",
      area: 116642,
    },
    {
        templeName: "Kansas City",
        location: "Kansas City, Missouri",
        dedicated: "2012, May, 6",
        area: 32000,
      },
      {
        templeName: "Bentonville Arkansas",
        location: "Bentonville, Arkansas",
        dedicated: "2023, September, 17",
        area: 28472,
      },
      {
        templeName: "Laie Hawaii",
        location: "Laie, Hawaii",
        dedicated: "1919, November, 30",
        area: 42100,
      }
];

const getColumns = () => {
  if (window.innerWidth > 1599) return 3;
  if (window.innerWidth > 1199) return 2;
  return 1;
};

const columns = getColumns();

const albumBox = document.querySelector(".album-box");

const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(item => {
  item.addEventListener("click", function() {
    const filter = item.dataset.filter;
    filterTemples(filter);
  });
});

displayTemples(temples)

const year_container = document.getElementById('currentYear');
const modified_container = document.getElementById('lastModified');
const today = new Date();
const modified_date = document.lastModified;

year_container.innerHTML = today.getFullYear();
modified_container.innerHTML = `Last Modified: ${modified_date}`;