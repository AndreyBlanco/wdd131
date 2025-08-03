let counter = getCounter();

function getCounter() {
    return localStorage.getItem('counter');
}

console.log(counter);
document.querySelector("#posts").innerHTML = counter;