import { getPhotographers } from "../data/photographer.js";

export function handleHomePageDisplay(photographers) {
    console.log(photographers);

    // const link = document.querySelector(".link");
    // console.log(photographers);
    // const touch = e.code;
    // switch (touch) {
    //     case "Enter":
    //         link.setAttribute("href", `photographer.html?id=${photographers.id}`);
    //         break;
    //     case "ArrowRight":
    //         console.log("ArrowRight");
    //         break;
    //     default:
    //         console.log("pas de touche");
    // }
}

async function useData() {
    const photographers = await getPhotographers();
    handleHomePageDisplay(photographers);
}
useData();
