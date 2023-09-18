//Mettre le code JavaScript lié à la page photographer.html
import { getPhotographerById } from "../data/photographer.js";

async function showOnePhotographer() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    console.log(typeof id);

    const photographer = await getPhotographerById(id);
    console.log(photographer);
}

showOnePhotographer();
