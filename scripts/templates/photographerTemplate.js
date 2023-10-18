import {
    buildPhotographerLocation,
    buildPhotographerName,
    buildPhotographerTagline,
} from "../utils/buildPhotographerName.js";
import { handleHomePageDisplay } from "./accessibily.js";

function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const body = document.querySelector("body");
        const article = document.createElement("article");

        const link = document.createElement("a");
        link.setAttribute("tabindex", "0");
        link.setAttribute("class", "link");
        link.dataset.photographerId = id;
        link.setAttribute("aria-label", `lien vers la page de ${name}`);

        link.addEventListener("click", () => link.setAttribute("href", `photographer.html?id=${id}`));

        // accessibility management of the main page
        body.addEventListener("keydown", handleHomePageDisplay);

        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", `photo de ${name}`);

        const nameElement = buildPhotographerName(name);

        const location = buildPhotographerLocation(city, country);

        const taglineElement = buildPhotographerTagline(tagline);

        const priceElement = document.createElement("p");
        priceElement.textContent = `${price}€/jour`;

        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(nameElement);

        article.appendChild(location);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);

        return article;
    }
    return { name, picture, getUserCardDOM };
}

export default photographerTemplate;
