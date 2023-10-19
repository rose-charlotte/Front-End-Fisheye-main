//Mettre le code JavaScript lié à la page photographer.html
import { getPhotographerById } from "../data/photographerData.js";
import { getPhotographerMediasById } from "../data/photographerData.js";
import { MediaFactory } from "../utils/mediaBuilder.js";
import {
    buildPhotographerLocation,
    buildPhotographerName,
    buildPhotographerTagline,
} from "../utils/buildPhotographerName.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import { displayLightbox, initLightbox } from "../utils/lightbox.js";

const SortBy = {
    Date: "Date",
    Popularity: "Popularity",
    Title: "Title",
};

const photographerInfos = {
    photographer: undefined,
    medias: undefined,
};

async function getPhotographerInfo() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    const [photographer, medias] = await Promise.all([getPhotographerById(id), getPhotographerMediasById(id)]);
    photographerInfos.photographer = photographer;
    photographerInfos.medias = medias;
}

function buildPhotographerMediaList() {
    const photographMediaDomElement = document.querySelector(".photograph-media");
    const newChildren = photographerInfos.medias
        .sort(sortMedia)
        .map(media => buildPhotographerMedia(media, photographerInfos.photographer));

    photographMediaDomElement.replaceChildren(...newChildren);
}
function sortMedia(media1, media2) {
    const select = document.querySelector(".selectSortedOrder");
    const selectedSortBy = select.options[select.selectedIndex].value;

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

function buildPhotographerInfo() {
    const header = document.querySelector("header");
    const logo = document.querySelector(".logo");

    const logoLink = document.createElement("a");
    logoLink.setAttribute("tabindex", "0");
    logoLink.setAttribute("style", "cursor: pointer; text-decoration:none");
    logoLink.addEventListener("click", () => logoLink.setAttribute("href", "index.html"));
    logoLink.addEventListener("keydown", closePhotographerPage);

    function closePhotographerPage(e) {
        if (e.code === "Enter") {
            logoLink.setAttribute("href", "index.html");
        }
    }

    const { name, city, country, tagline, portrait } = photographerInfos.photographer;
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

function buildPhotographerMedia(mediaData, photographer) {
    const { likes, title, id } = mediaData;

    const article = document.createElement("article");

    const mediaFactory = new MediaFactory(mediaData, photographer);

    const mediaInfo = document.createElement("div");
    mediaInfo.setAttribute("class", "media-info");
    mediaInfo.setAttribute("aria-label", "media info");
    const mediaTitle = document.createElement("p");
    mediaTitle.textContent = title;

    const mediaLikes = document.createElement("div");
    mediaLikes.setAttribute("class", "media-likes");
    mediaLikes.setAttribute("tabindex", "0");
    let mediaLikesNumber = document.createElement("p");
    mediaLikesNumber.textContent = likes;
    mediaLikesNumber.setAttribute("class", "media-likes-number");
    mediaLikesNumber.setAttribute("aria-label", "likes");

    const heartIcon = document.createElement("img");
    const heartIconFilled = document.createElement("img");
    heartIcon.setAttribute("class", "media-likes-img");
    heartIcon.setAttribute("src", "assets/icons/likeStroke.svg");
    heartIcon.setAttribute("aria-label", "like non cliqué");
    heartIconFilled.setAttribute("class", "media-likes-img-fill");
    heartIconFilled.setAttribute("src", "assets/icons/likes.svg");
    heartIconFilled.setAttribute("aria-label", "like non cliqué");

    const mediaElement = mediaFactory.build();
    article.appendChild(mediaElement);
    article.appendChild(mediaInfo);
    mediaInfo.appendChild(mediaTitle);
    mediaInfo.appendChild(mediaLikes);
    mediaLikes.appendChild(mediaLikesNumber);
    mediaLikes.appendChild(heartIcon);
    mediaLikes.appendChild(heartIconFilled);

    mediaElement.addEventListener("click", displayLightbox);
    mediaElement.addEventListener("keydown", displayLightBoxWithKeyboard);

    function displayLightBoxWithKeyboard(e) {
        if (e.code === "Enter") {
            displayLightbox(e);
        }
    }

    // Handle toggle like
    mediaLikes.addEventListener("click", toggleLike);
    mediaLikes.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            toggleLike();
        }
    });

    function toggleLike() {
        const mediaId = id;
        mediaLikesNumber.textContent = parseInt(mediaLikesNumber.textContent) === likes ? likes + 1 : likes;
        heartIcon.classList.toggle("media-likes-img-toggle");
        heartIconFilled.classList.toggle("media-likes-img-fill-toggle");
        const numberOfLikes = parseInt(mediaLikesNumber.textContent);
        handleAddLikes(numberOfLikes, mediaId);
    }

    return article;
}

async function handleAddLikes(numberOfLikes, mediaId) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const medias = await getPhotographerMediasById(id);

    const media = medias.find(media => media.id === mediaId);

    media.likes = numberOfLikes;

    refreshLikeCount(medias);
}

function refreshLikeCount(photographerMedias) {
    const totalLikes = photographerMedias.reduce((totalLikes, media) => totalLikes + media.likes, 0);

    document.querySelector(".total-likes-count").textContent = totalLikes;
}

function buildPhotographerCardInfo() {
    const price = photographerInfos.photographer.price;
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

    const totalLikesCount = document.createElement("div");
    totalLikesCount.setAttribute("class", "total-likes-count");
    totalLikesCount.ariaLabel = "Nombre total de likes";

    const likeImg = document.createElement("img");
    likeImg.setAttribute("aria-hidden", "true");
    likeImg.setAttribute("src", "assets/icons/likesBlack.svg");

    mainSection.appendChild(cardInfo);
    cardInfo.appendChild(cardInfoLike);
    cardInfoLike.appendChild(totalLikesCount);
    cardInfoLike.appendChild(likeImg);
    cardInfo.appendChild(cardInfoPrice);

    refreshLikeCount(photographerInfos.medias);
}

function buildMediaSort() {
    const select = document.querySelector(".selectSortedOrder");

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

function changeSortOption() {
    buildPhotographerMediaList();
}

async function buildPage() {
    try {
        await getPhotographerInfo();
    } catch (err) {
        window.location.href = "photographerNotFound.html";
        return;
    }

    try {
        buildMediaSort();
        buildPhotographerInfo();
        buildPhotographerMediaList();
        buildPhotographerCardInfo();
        initLightbox(photographerInfos.medias);
    } catch (err) {
        window.location.href = "error.html";
    }
}

buildPage();
