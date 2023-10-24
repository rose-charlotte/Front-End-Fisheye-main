export function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    modal.setAttribute("class", "contact_modal_on");
    modal.setAttribute("aria-modal", "true");
    const modalDiv = document.querySelector(".modal");
    modalDiv.setAttribute("tabindex", "-1");

    document.querySelector("#firstname").focus();

    // asset aria-hidden attribute to hyde the rest of html page for assistance tech
    const mainPage = document.querySelector("#main");
    mainPage.setAttribute("aria-hidden", "true");
}

export function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";

    const mainPage = document.querySelector("#main");
    mainPage.setAttribute("aria-hidden", "false");
}
