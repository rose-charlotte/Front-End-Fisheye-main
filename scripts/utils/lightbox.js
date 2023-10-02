export function displayLightbox(e) {
    const mainPage = document.querySelector(".main_page");
    mainPage.style.display = "none";
    const media = document.querySelector(".media");
    const lightboxElement = document.querySelector(".lightbox");
    lightboxElement.style.display = "flex";

    const lightboxImg = document.createElement("img");
    lightboxImg.setAttribute("src", e.currentTarget.src);
    lightboxImg.setAttribute("class", "lightbox-img");
    lightboxImg.dataset.mediaId = e.currentTarget.dataset.mediaId;

    media.replaceChildren(lightboxImg);
}

export function closeLightbox() {
    const mainPage = document.querySelector(".main_page");
    mainPage.style.display = "block";
    const lightbox = document.querySelector(".lightbox");
    lightbox.style.display = "none";
}
