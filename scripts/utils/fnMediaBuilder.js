import { getPhotographerAssetsFolder } from "./assetsUtils.js";

export function fnMediaBuilder(media, photographer, classOverride) {
    if (media.video) {
        return buildVideo(media, photographer, classOverride);
    }

    return buildImage(media, photographer, classOverride);
}

function buildImage(media, photographer, classOverride) {
    const assetsFolder = getPhotographerAssetsFolder(photographer);

    const img = document.createElement("img");
    img.setAttribute("tabindex", "0");
    img.setAttribute("class", classOverride ?? "picture");
    img.setAttribute("src", `${assetsFolder}${media.image}`);
    img.setAttribute("alt", media.title);
    img.dataset.mediaId = media.id;
    img.dataset.photographerId = photographer.id;
    return img;
}

function buildVideo(media, photographer, classOverride) {
    const assetsFolder = getPhotographerAssetsFolder(photographer);

    const video = document.createElement("video");
    video.setAttribute("tabindex", "0");
    video.setAttribute("alt", media.title);
    video.setAttribute("class", classOverride ?? "video");
    video.setAttribute("controls", "controls");
    video.setAttribute("src", `${assetsFolder}${media.video}`);

    video.dataset.mediaId = media.id;
    video.dataset.photographerId = photographer.id;
    return video;
}
