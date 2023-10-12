import { getPhotographers } from "../data/photographerData.js";

export async function handleHomePageDisplay(e) {
    const key = e.code;

    if (key === "Enter") {
        const photographers = await getPhotographers();
        const links = document.querySelectorAll(".link");
        links.forEach(link => link.setAttribute("href", `photographer.html?id=${photographers.id}`));
    }
}
