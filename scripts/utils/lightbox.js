import { getMediaById, getPhotographerById, getPhotographerMediasById } from "../data/photographer.js";
import { MediaFactory } from "./mediaBuilder.js";

async function displayLightBoxMedia(mediaId, photographerId) {
    const mediaElement = document.querySelector(".media");

    console.log(`media-id: ${mediaId}, photographer-id: ${photographerId}`);
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

export async function nextMedia() {
    const selectedImage = document.querySelector(".lightbox-img");
    const photgrapherId = selectedImage.dataset.photographerId;
    const medias = await getPhotographerMediasById(photgrapherId);

    console.log(medias);

    const currentIndex = medias.findIndex(media => media.id == selectedImage.dataset.mediaId);
    console.log(currentIndex);

    const nextMedia = medias[currentIndex + 1].id;
    console.log(nextMedia);
    displayLightBoxMedia(nextMedia, photgrapherId);
}

export async function prevMedia() {
    const selectedImage = document.querySelector(".lightbox-img");
    const photgrapherId = selectedImage.dataset.photographerId;
    const medias = await getPhotographerMediasById(photgrapherId);

    console.log(medias);

    const currentIndex = medias.findIndex(media => media.id == selectedImage.dataset.mediaId);
    console.log(currentIndex);

    const nextMedia = medias[currentIndex - 1].id;
    console.log(nextMedia);
    displayLightBoxMedia(nextMedia, photgrapherId);
}
