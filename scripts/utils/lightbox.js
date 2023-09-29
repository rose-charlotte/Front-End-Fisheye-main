export function displayLightbox(e) {
    const media = document.querySelector("#media");
    const lightboxElement = document.querySelector(".lightbox");
    lightboxElement.style.display = "block";

    const lightboxImg = document.createElement("img");
    lightboxImg.setAttribute("src", e.currentTarget.src);
    lightboxImg.setAttribute("class", "lightbox-img");

    media.replaceChildren(lightboxImg);
}

export function closeLightbox() {
    const lightbox = document.querySelector(".lightbox");
    lightbox.style.display = "none";
}
