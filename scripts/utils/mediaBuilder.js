export class MediaFactory {
    #media;
    #assetsFolder;

    constructor(media, assetsFolder) {
        this.#media = media;
        this.#assetsFolder = assetsFolder;
    }

    build() {
        if (this.#isVideo()) {
            return new VideoBuilder(this.#media, this.#assetsFolder).build();
        }

        return new ImageBuilder(this.#media, this.#assetsFolder).build();
    }

    #isVideo() {
        return this.#media.video != undefined;
    }
}

class ImageBuilder {
    #media;
    #assetsFolder;

    constructor(media, assetsFolder) {
        this.#media = media;
        this.#assetsFolder = assetsFolder;
    }

    build() {
        const img = document.createElement("img");
        img.setAttribute("class", "picture");
        img.setAttribute("src", `${this.#assetsFolder}${this.#media.image}`);
        img.setAttribute("alt", "photo");
        img.setAttribute("style", "cursor: pointer");
        img.dataset.mediaId = this.#media.id;
        return img;
    }
}

class VideoBuilder {
    #media;
    #assetsFolder;

    constructor(media, assetsFolder) {
        this.#media = media;
        this.#assetsFolder = assetsFolder;
    }

    build() {
        const video = document.createElement("video");
        video.setAttribute("class", "video");
        video.setAttribute("src", `${this.#assetsFolder}${this.#media.video}`);
        video.setAttribute("style", "cursor: pointer");
        video.addEventListener("click", () => console.log("good"));
        return video;
    }
}
