const API_URL = "http://localhost:8080/users";
let form = document.querySelector("form");
let image = document.querySelector("#inputfile");
let inputCaption = document.querySelector("#inputcaption");
let inputDescription = document.querySelector("#inputdescription");
let submitBtn = document.querySelector(".submit-btn");

let id = new URLSearchParams(window.location.search).get("id");
console.log(id);

if (id) {
  async function fillForm() {
    const res = await axios(`${API_URL}/${id}`);
    const data = await res.data;
    inputCaption.value = data.caption;
    inputDescription.value = data.description;
  }
  fillForm();
}

async function createUser() {
  const user = {
    id: Date.now(),
    photo: `./assets/img/${image.value.split("\\")[2]}`,
    caption: inputCaption.value,
    description: inputDescription.value,
  };
  if (inputCaption.value && inputDescription.value && image.value) {
    await axios.post(API_URL, user);
    window.location.href = "index.html";
  } else {
    alert("empty");
  }
}

async function editCard() {
  let obj = {
    id: Date.now(),
    photo: `./assets/img/${image.value.split("\\")[2]}`,
    caption: inputCaption.value,
    description: inputDescription.value,
  };

  await axios.patch(`${API_URL}/${id}`, obj);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (id) {
    editCard();
    console.log("id");
  } else {
    createUser();
  }
  window.location = "index.html";
});