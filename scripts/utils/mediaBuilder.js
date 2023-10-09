import { getPhotographerAssetsFolder } from "./assetsUtils.js";

export class MediaFactory {
    #media;
    #photographer;

    constructor(media, photographer) {
        this.#media = media;
        this.#photographer = photographer;
    }

    build(classOverride) {
        if (this.#isVideo()) {
            return new VideoBuilder(this.#media, this.#photographer).build(classOverride);
        }

        return new ImageBuilder(this.#media, this.#photographer).build(classOverride);
    }

    #isVideo() {
        return this.#media.video != undefined;
    }
}

class ImageBuilder {
    #media;
    #photographer;

    constructor(media, photographer) {
        this.#media = media;
        this.#photographer = photographer;
    }

    build(classOverride) {
        const assetsFolder = getPhotographerAssetsFolder(this.#photographer);

        const img = document.createElement("img");
        img.setAttribute("class", classOverride ?? "picture");
        img.setAttribute("src", `${assetsFolder}${this.#media.image}`);
        img.setAttribute("alt", "photo");
        img.dataset.mediaId = this.#media.id;
        img.dataset.photographerId = this.#photographer.id;
        return img;
    }
}

class VideoBuilder {
    #media;
    #photographer;

    constructor(media, photographer) {
        this.#media = media;
        this.#photographer = photographer;
    }

    build(classOverride) {
        const assetsFolder = getPhotographerAssetsFolder(this.#photographer);

        const video = document.createElement("video");
        video.setAttribute("class", classOverride ?? "video");
        video.setAttribute("controls", "controls");
        video.setAttribute("src", `${assetsFolder}${this.#media.video}`);
        video.dataset.mediaId = this.#media.id;
        video.dataset.photographerId = this.#photographer.id;
        return video;
    }
}
