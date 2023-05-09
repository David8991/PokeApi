const container = document.getElementById("container");
const text = document.getElementById("text");
const search = document.getElementById("search");
const next = document.getElementById("next");
const last = document.getElementById("last");
let url;

function send() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${text.value}/`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        if (container.children.length > 0) {
            for(let i = container.children.length - 1; i >= 0; i--) {
                container.children[i].remove();
            }
        }

        let image = document.createElement("img");
        let name = document.createElement("h2");
        let weight = document.createElement("p");
        let height = document.createElement("p");

        if (data.sprites.other.home.front_default === null) {
            image.setAttribute("src", "");
        } else {
            image.setAttribute("src", data.sprites.other.home.front_default);
        }
        
        container.classList.remove("hidden");
        last.classList.remove("hidden");
        next.classList.remove("hidden");
        image.setAttribute("alt", data.name);
        name.innerText = data.name;
        weight.innerText = `Weight: ${data.weight}`;
        height.innerText = `Height: ${data.height}`;
        container.appendChild(image);
        container.appendChild(name);
        container.appendChild(weight);
        container.appendChild(height);
        url = data.id;
    })
}

search.addEventListener("click", () => {
    if (text.value !== "") {
        send();
    }
})

next.addEventListener("click", () => {
    text.value = +url + 1;
    send();
})

last.addEventListener("click", () => {
    text.value = +url - 1;
    send();
})

document.onkeyup = function(e) {
    if (e.code === "ArrowLeft" && text.value !== "") {
        text.value = +url - 1;
        send();
    } else if (e.code === "ArrowRight" && text.value !== "") {
        text.value = +url + 1;
        send();
    } else if (e.code === "Enter" && text.value !== "") {
        send();
    }
}