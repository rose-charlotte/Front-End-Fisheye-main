export function getPhotographerAssetsFolder(photographer) {
    const firstName = photographer.name.split(" ")[0];
    return `assets/photographers/${firstName}/`;
}
