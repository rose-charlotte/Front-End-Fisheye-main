const photographerEndpoint = "data/photographers.json";

export async function getPhotographers() {
    const response = await fetch(photographerEndpoint);

    // et bien retourner le tableau photographers seulement une fois récupéré

    if (response.ok) {
        const data = await response.json();
        const photographers = data.photographers;

        return photographers;
    } else {
        throw new Error("Une erreur est survenue lors de la récupération de la liste des photographes");
    }
}

export async function getPhotographerById(id) {
    const response = await fetch(photographerEndpoint);

    if (response.ok) {
        const data = await response.json();
        const photographers = data.photographers;
        const photographer = photographers.find(photoman => photoman.id === id);

        return photographer;
    } else {
        throw new Error(`Une erreur est survenue lors de la récupération du photographe avec l'id ${id}`);
    }
}

export async function getPhotographerMediaById(id) {
    const response = await fetch(photographerEndpoint);

    if (response.ok) {
        const data = await response.json();
        const allMedia = data.media;
        const photographerMedia = allMedia.filter(media => media.photographerId === id);

        return photographerMedia;
    } else {
        throw new Error(
            `Une erreur est survenue lors de la récupération de la liste des médias correspondant au photographe dont l'id est ${id}`
        );
    }
}
