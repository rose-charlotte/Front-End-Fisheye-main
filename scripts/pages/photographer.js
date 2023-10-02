//Mettre le code JavaScript lié à la page photographer.html
import { getPhotographerById } from "../data/photographer.js";
import { getPhotographerMediaById } from "../data/photographer.js";
import { MediaFactory } from "../utils/mediaBuilder.js";
import {
    buildPhotographerLocation,
    buildPhotographerName,
    buildPhotographerTagline,
} from "../utils/buildPhotographerName.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import { closeLightbox, displayLightbox } from "../utils/lightbox.js";

function getPhotographerInfo() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    try {
        return Promise.all([getPhotographerById(id), getPhotographerMediaById(id)]);
    } catch (e) {
        console.log(e);
    }
}

function getPhotographerAssetsFolder(photographer) {
    const firstName = photographer.name.split(" ")[0];
    return `assets/photographers/${firstName}/`;
}

function buildPhotographerMediaList(photographer, medias) {
    const photographMediaDomElement = document.querySelector(".photograph-media");
    const assetsFolder = getPhotographerAssetsFolder(photographer);

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

    // Contact modal display
    const contactMeButton = document.querySelector(".contact_button");
    contactMeButton.addEventListener("click", displayModal);
    const closeModalButton = document.querySelector(".close_btn");
    closeModalButton.addEventListener("click", closeModal);

    const modalContactInfo = document.querySelector(".contact_info");
    const modalNameElement = document.createElement("h2");
    modalNameElement.textContent = name;
    modalContactInfo.appendChild(modalNameElement);

    const contactForm = document.querySelector(".contact-form");
    const firstName = document.querySelector("#firstname");
    const lastName = document.querySelector("#lastname");
    const email = document.querySelector("#Email");
    const message = document.querySelector("#message");

    contactForm.addEventListener("submit", onSubmit);

    function onSubmit(e) {
        e.preventDefault();
        console.log(
            `mon formulaire  indique: prénom:${firstName.value}, nom de famille:${lastName.value}, email:${email.value} , et message: ${message.value}`
        );
        closeModal();
    }

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

    const mediaElement = mediaFactory.build();
    article.appendChild(mediaElement);
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

function buildLighBoxMedia(photographer, medias) {
    const allImages = document.querySelectorAll(".picture");
    allImages.forEach(image => image.addEventListener("click", displayLightbox));

    const closeBtn = document.querySelector(".close-btn");
    closeBtn.setAttribute("style", "cursor:pointer");
    closeBtn.addEventListener("click", closeLightbox);

    const forwardBtn = document.querySelector(".forward-btn");
    forwardBtn.addEventListener("click", nextPhoto);

    const prevdBtn = document.querySelector(".backward-btn");
    prevdBtn.addEventListener("click", prevPhoto);

    const assetsFolder = getPhotographerAssetsFolder(photographer);

    function nextPhoto() {
        const selectedImage = document.querySelector(".lightbox-img");
        const currentIndex = medias.findIndex(media => media.id == selectedImage.dataset.mediaId);

        const nextMedia = medias[currentIndex + 1];

        selectedImage.setAttribute("src", `${assetsFolder}/${nextMedia.image}`);
        selectedImage.dataset.mediaId = nextMedia.id;
    }

    function prevPhoto() {
        const selectedImage = document.querySelector(".lightbox-img");
        const selectedImageTitle = selectedImage.src.split("/");
        const imageArray = [];
        medias.forEach(media => imageArray.push(media.image));
        let imageTitle = imageArray.find(element => element === selectedImageTitle[6]);
        const currentIndex = imageArray.indexOf(imageTitle);

        const prev = currentIndex - 1;
        const prevPhoto = imageArray[prev];

        selectedImageTitle.pop();
        selectedImageTitle.push(prevPhoto);

        const prevImageSrc = selectedImageTitle.toString().replace(/,/g, "/");
        selectedImage.setAttribute("src", prevImageSrc);
    }
}

async function buildPage() {
    const [photographer, medias] = await getPhotographerInfo();

    buildPhotographerInfo(photographer);
    buildPhotographerMediaList(photographer, medias);
    buildPhotographerCardInfo(photographer, medias);
    buildLighBoxMedia(photographer, medias);
}

buildPage();
