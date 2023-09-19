//Mettre le code JavaScript lié à la page photographer.html
import { getPhotographerById } from "../data/photographer.js";
import { getPhotographerMedia } from "../data/photographer.js";

async function getOnePhotographer() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    const photographer = await getPhotographerById(id);
    photographerPageTemplate(photographer);
}

getOnePhotographer();

async function getOnePhotographerMedia() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    const medias = await getPhotographerMedia(id);
    const photographMediaDomElement = document.querySelector(".photograph-media");

    medias.forEach(media => {
        const photographerMedia = showPhotographerMedia(media);
        const mediaCardDOM = photographerMedia.getMediaCardDom();
        photographMediaDomElement.appendChild(mediaCardDOM);
    });
}
getOnePhotographerMedia();

function photographerPageTemplate(data) {
    const header = document.querySelector("header");
    const logo = document.querySelector(".logo");
    const logoLink = document.createElement("a");
    logoLink.setAttribute("style", "cursor: pointer; text-decoration:none");
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

function showPhotographerMedia(mediaData) {
    const { date, image, likes, price, title } = mediaData;

    function getMediaCardDom() {
        const article = document.createElement("article");

        const mediaTitle = document.createElement("p");
        mediaTitle.textContent = title;

        const heartIcon = document.createElement("img");
        heartIcon.setAttribute("src", "assets/icons/likes.svg");

        const mediaLikes = document.createElement("div");

        mediaLikes.textContent = likes;
        mediaLikes.setAttribute("aria-label", "likes");

        article.appendChild(mediaTitle);
        article.appendChild(mediaLikes);
        mediaLikes.appendChild(heartIcon);

        return article;
    }
    return { title, getMediaCardDom };
}
