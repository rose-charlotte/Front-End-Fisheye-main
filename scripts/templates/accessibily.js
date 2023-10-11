import { getPhotographers } from "../data/photographerData.js";

export async function handleHomePageDisplay(e) {
    const photographers = await getPhotographers();
    console.log(photographers);
    console.log(e.code);
    const links = document.querySelectorAll(".link");
    console.log(links);

    const key = e.code;

    switch (key) {
        case "Enter":
            links.forEach(link => link.setAttribute("href", `photographer.html?id=${photographers.id}`));
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            break;
        default:
            console.log("pas de touche");
    }
}
