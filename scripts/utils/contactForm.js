export function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    modal.setAttribute("class", "contact_modal_on");

    // asset aria-hidden attribute to hyde the rest of html page for assistance tech
    const mainPage = document.querySelector("#main");
    mainPage.setAttribute("aria-hidden", "true");
}

export function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
