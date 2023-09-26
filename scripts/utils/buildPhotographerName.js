// Functions that create DOMElement for differents informations used in differents functions

export function buildPhotographerName(name) {
    const photograperName = document.createElement("h1");
    photograperName.textContent = name;
    return photograperName;
}

export function buildPhotographerLocation(city, country) {
    const location = document.createElement("h2");
    location.textContent = `${city}, ${country}`;
    return location;
}

export function buildPhotographerTagline(tagline) {
    const taglineElement = document.createElement("p");
    taglineElement.textContent = tagline;
    return taglineElement;
}
