const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const today = new Date();
let oLastModif = new Date(document.lastModified);
currentYear.innerHTML = today.getFullYear();
lastModified.innerHTML = `Last Modification: ${oLastModif}`;