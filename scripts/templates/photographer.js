function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");
        const img = document.createElement("img");
        img.setAttribute("src", picture);

        const nameElement = document.createElement("h2");
        nameElement.textContent = name;

        const location = document.createElement("h3");
        location.textContent = `${city}, ${country}`;

        const taglineElement = document.createElement("p");
        taglineElement.textContent = tagline;

        const priceElement = document.createElement("p");
        priceElement.textContent = `${price}€/jour`;

        article.appendChild(img);
        article.appendChild(nameElement);
        article.appendChild(location);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);
        return article;
    }
    return { name, picture, getUserCardDOM };
}
