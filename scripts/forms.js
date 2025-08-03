const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

let productList = document.getElementById("product");

products.forEach(product => {
    let option = document.createElement("option");
    option.setAttribute("value", product.name);
    option.setAttribute("id", product.id);
    option.textContent = product.name;

    productList.appendChild(option);
});

let form = document.querySelector("form");

function getCounter() {
    return localStorage.getItem('counter');
};

function setCounter(count) {
    localStorage.setItem('counter', count);
};

form.addEventListener("submit", function () {
    let count = parseInt(getCounter()) || 0;
    
    count += 1;

    setCounter(count);
});