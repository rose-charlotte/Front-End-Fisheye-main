const photographerEndpoint = "data/photographers.json";
let photographerData = undefined;

export async function getPhotographers() {
    const data = await getData();
    return data.photographers;
}

export async function getPhotographerById(id) {
    const data = await getData();
    const photographer = data.photographers.find(photoman => photoman.id == id);

    if (!photographer) {
        throw new Error("Photographer  not found");
    }

    return photographer;
}

export async function getPhotographerMediasById(id) {
    const data = await getData();
    return data.media.filter(media => media.photographerId == id);
}

export async function getMediaById(id) {
    const data = await getData();
    return data.media.find(media => media.id == id);
}

async function getData() {
    if (photographerData) {
        return photographerData;
    }

    const response = await fetch(photographerEndpoint);

    if (response.ok) {
        photographerData = await response.json();

        return photographerData;
    } else {
        throw new Error(`Une erreur est survenue lors de la récupération de la liste des médias`);
    }
}
