import { getMediaById, getPhotographerById } from "../data/photographer.js";
import { MediaFactory } from "./mediaBuilder.js";

export async function displayLightbox(e) {
    const { mediaId, photographerId } = e.currentTarget.dataset;

    const media = await getMediaById(mediaId);
    const photographer = await getPhotographerById(photographerId);

    const mainPage = document.querySelector(".main_page");
    mainPage.style.display = "none";
    const mediaElement = document.querySelector(".media");
    const lightboxElement = document.querySelector(".lightbox");
    lightboxElement.style.display = "flex";

    console.log(`media-id: ${mediaId}, photographer-id: ${photographerId}`);

    const mediaFactory = new MediaFactory(media, photographer);
    mediaElement.replaceChildren(mediaFactory.build("lightbox-img"));

    // const lightboxImg = document.createElement("img");
    // lightboxImg.setAttribute("src", e.currentTarget.src);
    // lightboxImg.setAttribute("class", "lightbox-img");
    // lightboxImg.dataset.mediaId = e.currentTarget.dataset.mediaId;

    // media.replaceChildren(lightboxImg);
}

export function closeLightbox() {
    const mainPage = document.querySelector(".main_page");
    mainPage.style.display = "block";
    const lightbox = document.querySelector(".lightbox");
    lightbox.style.display = "none";
}
