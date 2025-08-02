const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "San José Costa Rica",
        location: "Belén, Heredia, Costa Rica",
        dedicated: "2000, June, 4",
        area: 10700,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/san-jose-costa-rica/400x250/san-jose-costa-rica-temple-lds-83515-wallpaper.jpg"
    },
    {
        templeName: "San Diego California",
        location: "San Diego, California, United States",
        dedicated: "1993, April, 25",
        area: 72000,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/san-diego-california/400x250/san-diego-temple-765109-wallpaper.jpg"
    },
    {
        templeName: "Belém Brazil",
        location: "Belém, Brazil",
        dedicated: "2022, November, 20",
        area: 28675,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/belem-brazil/400x250/belem_brazil_temple_exterior2.jpg"
    },
    // Add more temple objects here...
];

function templeCard(temple) {
    return `<section class="tCard">
                <h3>${temple.templeName}</h3>
                <p><spam class="label">Location: </spam>${temple.location}</p>
                <p><spam class="label">Dedicated </spam>${temple.dedicated}</p>
                <p><spam class="label">Size: </spam>${temple.area} sq ft</p>
                <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
            </section>`
}

function templeGrid(templeList) {
    document.querySelector(".templeList").innerHTML = templeList.map(templeCard).join("");
}

templeGrid(temples);

const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

const home = document.getElementById("home");
const old = document.getElementById("old");
const newT = document.getElementById("new");
const large = document.getElementById("large");
const small = document.getElementById("small");

home.addEventListener("click", () => {
    templeGrid(temples);
    document.querySelector("h2").innerHTML = "Home"
});

old.addEventListener("click", () => {
    const filteredTemples = temples.filter(temple => parseInt(temple.dedicated.split(',')[0]) < 1900);
    templeGrid(filteredTemples);
    document.querySelector("h2").innerHTML = "Old Temples"
});

newT.addEventListener("click", () => {
    const filteredTemples = temples.filter(temple => parseInt(temple.dedicated.split(',')[0]) > 2000);
    templeGrid(filteredTemples);
    document.querySelector("h2").innerHTML = "New Temples"
});

large.addEventListener("click", () => {
    const filteredTemples = temples.filter(temple => temple.area > 90000);
    templeGrid(filteredTemples);
    document.querySelector("h2").innerHTML = "Large Temples"
});

small.addEventListener("click", () => {
    const filteredTemples = temples.filter(temple => temple.area < 10000);
    templeGrid(filteredTemples);
    document.querySelector("h2").innerHTML = "Small Temples"
});

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
    if (hamButton.textContent == "☰") {
        hamButton.textContent = "❎";
    } else if (hamButton.textContent == "❎") {
        hamButton.textContent = "☰";
    };
});

