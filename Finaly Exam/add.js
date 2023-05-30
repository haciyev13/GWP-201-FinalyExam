let title = document.querySelector("#title");
let description = document.querySelector("#description");
let photo = document.querySelector("#photo");
let form = document.querySelector("form");
let button = document.querySelector("#form-btn");
let favData = [];



async function editCard() {
    let obj = {
        caption: caption.value,
        description: description.value,
        photo: photo.value ? `./assets/img/${photo.value.split("\\")[2]}` : "./assets/img/edit.png",
    };
    await axios.patch(`${API_URL}/${id}`, obj);
    await axios.patch(`${API_URL}/${id}`, obj);
}

async function addCard() {
    let obj = {
        caption: caption.value,
        description: description.value,
        photo: photo.value
            ? `./assets/img/${photo.value.split("\\")[2]}`
            : "./assets/img/soccer-player.png",
    };
    await axios.post(API_URL, obj);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (id) {
        editCard();
    } else {
        addCard();
    }
    window.location = "index.html";
});