//Mettre le code JavaScript lié à la page photographer.html
import { getPhotographerById } from "../data/photographer.js";

async function getOnePhotographer() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    console.log(typeof id);

    const photographer = await getPhotographerById(id);
    console.log(photographer);
    photographerPageTemplate(photographer);
}

getOnePhotographer();

function photographerPageTemplate(data) {
    const header = document.querySelector("header");
    const logo = document.querySelector(".logo");
    const logoLink = document.createElement("a");
    logoLink.setAttribute("style", "cursor: pointer; text-decoration:none");
    logoLink.setAttribute("aria-label", "lien vers la page d'accueil");
    logoLink.addEventListener("click", () => logoLink.setAttribute("href", "index.html"));

    const { name, city, country, tagline, portrait } = data;
    const photographerHeader = document.querySelector(".photograph-header");

    const photographerInfo = document.createElement("div");
    photographerInfo.setAttribute("aria-label", "information sur le photographe");

    const photographerName = document.createElement("h1");
    photographerName.textContent = name;

    const location = document.createElement("h3");
    location.textContent = `${city}, ${country}`;

    const taglineElement = document.createElement("p");
    taglineElement.textContent = tagline;

    const picture = `assets/photographers/${portrait}`;
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    header.appendChild(logoLink);
    logoLink.appendChild(logo);
    photographerHeader.prepend(photographerInfo);
    photographerInfo.appendChild(photographerName);
    photographerInfo.appendChild(location);
    photographerInfo.appendChild(taglineElement);
    photographerHeader.appendChild(img);
}
