//Mettre le code JavaScript lié à la page photographer.html
import { getPhotographerById } from "../data/photographer.js";
import { getPhotographerMediaById } from "../data/photographer.js";
import { MediaFactory } from "../utils/mediaBuilder.js";
import {
    buildPhotographerLocation,
    buildPhotographerName,
    buildPhotographerTagline,
} from "../utils/buildPhotographerName.js";

function getPhotographerInfo() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    try {
        return Promise.all([getPhotographerById(id), getPhotographerMediaById(id)]);
    } catch (e) {
        console.log(e);
    }
}

function buildPhotographerMediaList(photographer, medias) {
    const photographMediaDomElement = document.querySelector(".photograph-media");
    const firstName = photographer.name.split(" ")[0];
    const assetsFolder = `assets/photographers/${firstName}/`;

    medias.forEach(media => {
        const photographerMedia = buildPhotographerMedia(media, assetsFolder);
        photographMediaDomElement.appendChild(photographerMedia);
    });
}

function buildPhotographerInfo(photographer) {
    const header = document.querySelector("header");
    const logo = document.querySelector(".logo");
    const logoLink = document.createElement("a");
    logoLink.setAttribute("style", "cursor: pointer; text-decoration:none");
    logoLink.addEventListener("click", () => logoLink.setAttribute("href", "index.html"));

    const { name, city, country, tagline, portrait } = photographer;
    const photographerHeader = document.querySelector(".photograph-header");

    const photographerInfo = document.createElement("div");
    photographerInfo.setAttribute("aria-label", "information sur le photographe");

    const photographerName = buildPhotographerName(name);

    const location = buildPhotographerLocation(city, country);

    const taglineElement = buildPhotographerTagline(tagline);

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

    return { name };
}

function buildPhotographerMedia(mediaData, assetsFolder) {
    const { likes, title } = mediaData;
    const article = document.createElement("article");

    const mediaFactory = new MediaFactory(mediaData, assetsFolder);

    const mediaInfo = document.createElement("div");
    mediaInfo.setAttribute("class", "media-info");
    mediaInfo.setAttribute("aria-label", "media info");
    const mediaTitle = document.createElement("p");
    mediaTitle.textContent = title;

    const heartIcon = document.createElement("img");
    heartIcon.setAttribute("src", "assets/icons/likes.svg");

    const mediaLikes = document.createElement("div");

    mediaLikes.textContent = likes;
    mediaLikes.setAttribute("aria-label", "likes");

    article.appendChild(mediaFactory.build());
    article.appendChild(mediaInfo);
    mediaInfo.appendChild(mediaTitle);
    mediaInfo.appendChild(mediaLikes);
    mediaLikes.appendChild(heartIcon);

    return article;
}

function buildPhotographerCardInfo(photographer, medias) {
    const price = photographer.price;
    const mainSection = document.querySelector("#main");

    const cardInfo = document.createElement("div");
    cardInfo.setAttribute("class", "card-info");
    cardInfo.setAttribute("aria-label", "information photographe");

    const cardInfoPrice = document.createElement("p");
    cardInfoPrice.setAttribute("class", "info-price");
    cardInfoPrice.setAttribute("aria-label", "prix par jour");
    cardInfoPrice.textContent = `${price}€ / jour`;

    const cardInfoLike = document.createElement("div");
    cardInfoLike.setAttribute("class", "info-like");
    cardInfoLike.setAttribute("aria-label", "nombre de likes");
    const likeImg = document.createElement("img");
    likeImg.setAttribute("aria-hidden", "true");
    likeImg.setAttribute("src", "assets/icons/likesBlack.svg");

    // Add like number: creation of an empty array to stock likes values for each media
    // Use the reduce methode to get the sum of all likes.
    const likesArray = [];
    medias.forEach(like => likesArray.push(like.likes));
    const totalLike = likesArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    cardInfoLike.textContent = totalLike;

    mainSection.appendChild(cardInfo);
    cardInfo.appendChild(cardInfoLike);
    cardInfoLike.appendChild(likeImg);
    cardInfo.appendChild(cardInfoPrice);
}

async function buildPage() {
    const [photographer, medias] = await getPhotographerInfo();

    buildPhotographerInfo(photographer);
    buildPhotographerMediaList(photographer, medias);
    buildPhotographerCardInfo(photographer, medias);
}

buildPage();
