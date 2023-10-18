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
    console.log(e.currentTarget);
    const { mediaId, photographerId } = e.currentTarget.dataset;
    displayLightBoxMedia(mediaId, photographerId);

    const mainPage = document.querySelector(".main_page");
    mainPage.style.display = "none";

    const lightboxElement = document.querySelector(".lightbox");
    lightboxElement.style.display = "flex";

    const mediaElement = document.querySelector(".media");
    mediaElement.focus();
}

export function closeLightbox() {
    const mainPage = document.querySelector(".main_page");
    mainPage.style.display = "block";
    const lightbox = document.querySelector(".lightbox");
    lightbox.style.display = "none";
}

export async function nextMedia(medias) {
    const selectedImage = document.querySelector(".lightbox-img");
    const photographerId = selectedImage.dataset.photographerId;

    const currentIndex = medias.findIndex(media => media.id == selectedImage.dataset.mediaId);
    const nextMedia = medias[currentIndex + 1].id;
    displayLightBoxMedia(nextMedia, photographerId);
}

export async function prevMedia(medias) {
    const selectedImage = document.querySelector(".lightbox-img");
    const photographerId = selectedImage.dataset.photographerId;
    const currentIndex = medias.findIndex(media => media.id == selectedImage.dataset.mediaId);
    const nextMedia = medias[currentIndex - 1].id;
    displayLightBoxMedia(nextMedia, photographerId);
}

export function initLightbox(medias) {
    const closeBtn = document.querySelector(".close-btn");
    closeBtn.setAttribute("style", "cursor:pointer");
    closeBtn.addEventListener("click", closeLightbox);
    closeBtn.addEventListener("keydown", e => {
        if (e.code === "Enter") {
            closeLightbox();
        }
    });

    const forwardBtn = document.querySelector(".forward-btn");
    forwardBtn.addEventListener("click", () => nextMedia(medias));

    const prevdBtn = document.querySelector(".backward-btn");
    prevdBtn.addEventListener("click", () => prevMedia(medias));

    // Navigation through the lightbox page with keyboard buttons:
    const lightbox = document.querySelector(".lightbox");
    lightbox.addEventListener("keydown", handleMediaDisplay);

    function handleMediaDisplay(e) {
        const mediaElement = document.querySelector(".media");

        if (e.code === "ArrowRight") {
            nextMedia(medias);
            mediaElement.focus();
        } else if (e.code === "ArrowLeft") {
            prevMedia(medias);
            mediaElement.focus();
        } else if (e.code === "Escape") {
            closeLightbox();
        }
    }
}
