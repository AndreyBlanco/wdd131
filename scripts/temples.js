const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
    if (hamButton.textContent == "☰") {
        hamButton.textContent = "❎";
    } else if (hamButton.textContent == "❎") {
        hamButton.textContent = "☰";
    };
});