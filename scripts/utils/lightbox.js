import { getMediaById, getPhotographerById } from "../data/photographerData.js";
import { MediaFactory } from "./mediaBuilder.js";

async function displayLightBoxMedia(mediaId, photographerId) {
    const mediaElement = document.querySelector(".media");

    const media = await getMediaById(mediaId);
    const photographer = await getPhotographerById(photographerId);
    const mediaFactory = new MediaFactory(media, photographer);
    mediaElement.replaceChildren(mediaFactory.build("lightbox-img"));
}
export function displayLightbox(e) {
    const { mediaId, photographerId } = e.currentTarget.dataset;
    displayLightBoxMedia(mediaId, photographerId);
    const mainPage = document.querySelector(".main_page");
    mainPage.style.display = "none";

    const lightboxElement = document.querySelector(".lightbox");
    lightboxElement.style.display = "flex";
}

export function closeLightbox() {
    const mainPage = document.querySelector(".main_page");
    mainPage.style.display = "block";
    const lightbox = document.querySelector(".lightbox");
    lightbox.style.display = "none";
}

export async function nextMedia(medias) {
    const selectedImage = document.querySelector(".lightbox-img");
    const photgrapherId = selectedImage.dataset.photographerId;

    const currentIndex = medias.findIndex(media => media.id == selectedImage.dataset.mediaId);
    const nextMedia = medias[currentIndex + 1].id;
    displayLightBoxMedia(nextMedia, photgrapherId);
}

export async function prevMedia(medias) {
    const selectedImage = document.querySelector(".lightbox-img");
    const photgrapherId = selectedImage.dataset.photographerId;
    const currentIndex = medias.findIndex(media => media.id == selectedImage.dataset.mediaId);
    const nextMedia = medias[currentIndex - 1].id;
    displayLightBoxMedia(nextMedia, photgrapherId);
}
