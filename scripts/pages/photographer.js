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

const SortBy = {
    Date: "Date",
    Popularity: "Popularity",
    Title: "Title",
};

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

    const newChildren = medias.sort(sortMedia).map(media => buildPhotographerMedia(media, assetsFolder));

    photographMediaDomElement.replaceChildren(...newChildren);
    // photographMediaDomElement.appendChild(newChildren);
}
function sortMedia(media1, media2) {
    const select = document.querySelector(".select");
    const selectedSortBy = select.options[select.selectedIndex].value;
    console.log(selectedSortBy);
    switch (selectedSortBy) {
        case SortBy.Date:
            return new Date(media1.date) - new Date(media2.date);

        case SortBy.Popularity:
            return media1.likes === media2.likes ? 0 : media1.likes < media2.likes ? 1 : -1;

        case SortBy.Title:
            return media1.title.localeCompare(media2.title);

        default:
            throw new Error("aucun résultat!");
    }
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
    allImages.forEach(image => image.addEventListener("click", () => console.log("click")));
    //allImages.forEach(image => image.addEventListener("click", displayLightboxWithMediaFactory));

    // function displayLightboxWithMediaFactory(e) {
    //     console.log(medias);

    //     console.log(e.currentTarget);
    //     const mainPage = document.querySelector(".main_page");
    //     mainPage.style.display = "none";
    //     const media = document.querySelector(".media");
    //     const lightboxElement = document.querySelector(".lightbox");
    //     lightboxElement.style.display = "flex";

    //     const mediaFactory = new MediaFactory(media, assetsFolder);

    //     const mediaFactoryElement = mediaFactory.build();

    //     console.log(mediaFactoryElement);

    //     media.replaceChildren(mediaFactoryElement);
    // }

    const closeBtn = document.querySelector(".close-btn");
    closeBtn.setAttribute("style", "cursor:pointer");
    closeBtn.addEventListener("click", closeLightbox);

    const forwardBtn = document.querySelector(".forward-btn");
    forwardBtn.addEventListener("click", nextPhoto);

    const prevdBtn = document.querySelector(".backward-btn");
    prevdBtn.addEventListener("click", prevPhoto);

    // Navigation through the lightbox page with keyboard buttons:
    const body = document.querySelector("body");
    body.addEventListener("keydown", handleMediaDisplay);
    function handleMediaDisplay(e) {
        console.log(e.code);
        if (e.code === "ArrowRight") {
            nextPhoto();
        } else if (e.code === "ArrowLeft") {
            prevPhoto();
        } else if (e.code === "Escape" || e.code === "Enter") {
            closeLightbox();
        }
    }

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
        const currentIndex = medias.findIndex(media => media.id == selectedImage.dataset.mediaId);

        const prevMedia = medias[currentIndex - 1];

        selectedImage.setAttribute("src", `${assetsFolder}/${prevMedia.image}`);
        selectedImage.dataset.mediaId = prevMedia.id;
    }
}

function buildMediaSort() {
    const select = document.querySelector(".select");

    const popularityOption = document.createElement("option");
    popularityOption.setAttribute("value", SortBy.Popularity);
    popularityOption.textContent = "Popularité";

    const dateOption = document.createElement("option");
    dateOption.setAttribute("value", SortBy.Date);
    dateOption.textContent = "Date";

    const titleOption = document.createElement("option");
    titleOption.setAttribute("value", SortBy.Title);
    titleOption.textContent = "Titre";

    select.appendChild(popularityOption);
    select.appendChild(dateOption);
    select.appendChild(titleOption);

    select.addEventListener("change", changeSortOption);
}

async function changeSortOption() {
    const [photographer, medias] = await getPhotographerInfo();

    buildPhotographerMediaList(photographer, medias);
}

async function buildPage() {
    const [photographer, medias] = await getPhotographerInfo();

    buildMediaSort(medias);
    buildPhotographerInfo(photographer);
    buildPhotographerMediaList(photographer, medias);
    buildPhotographerCardInfo(photographer, medias);
    buildLighBoxMedia(photographer, medias);
}

buildPage();
