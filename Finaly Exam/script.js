const API_URL = "http://localhost:8080/users";

let row = document.querySelector(".row");
let sort = document.querySelector(".sort");
let search = document.querySelector(".search");
let load = document.querySelector(".load-btn");

let num = 3;
let allData =[];
let filtered =[];
let defaultArr=[];

function cardBody(data) {
  row.innerHTML = "";
  data.forEach((element) => {
    row.innerHTML += `
    <div class="col col-12 col-md-6 col-lg-3">
              <div style="width: 100px; margin: 0 auto;" class="img">
                <img class="p-2" src="${element.photo}" alt="">
              </div>
              <h4 class="text-center">${element.caption}</h4>
              <p class="text-center">${element.description}</p>
              <div class="moock-icon d-flex justify-content-center gap-2">
                <a href="#"style="color:#000;"  onclick=favCard('${element.id}')><i class="fa-regular fa-heart"></i></a>
                <a href="form.html?id=${element.id}" style="color:#000;"  onclick=editChild('${element.id}')><i class="fa-regular fa-pen-to-square"></i></a>
                <a href="#" style="color:#000;"  onclick=deleteCard('${element.id}')><i class="fa-solid fa-trash"></i></a>
              </div>
              
            </div>
    `;
  });
}
async function getAllInfo() {
  const response = await fetch(`${API_URL}`);
  const data = await response.json();
  cardBody(data);
}
getAllInfo();

async function deleteCard(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  getAllInfo();
}

sort.addEventListener("click", function () {
  if (this.innerHTML == "Ascending") {
    axios(`${API_URL}`).then((res) => {
      let sortAscending = res.data.sort((a, b) => a.id - b.id);
      cardBody(sortAscending);
    });
    sort.innerHTML = "Descending";
  } else if (this.innerHTML == "Descending") {
    axios(`${API_URL}`).then((res) => {
      let sortDescending = res.data.sort((a, b) => b.id - a.id);
      cardBody(sortDescending);
    });
    this.innerHTML = "Default";
  } else {
    axios(`${API_URL}`).then((res) => {
      cardBody(res.data);
    });
    this.innerHTML = "Ascending";
  }
});

search.addEventListener("input", function (event) {
  axios(API_URL).then((res) => {
    let filtered = res.data.filter((item) =>
      item.caption
        .toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase())
    );
    console.log(filtered);
    cardBody(filtered);
  });
});

load.addEventListener("click", (e) => {
  e.preventDefault();
  num += 3;
  filtered = allData.slice(0, num).filter((item) => {
    return item.title
      .toLocaleLowerCase()
      .includes(search.value.toLocaleLowerCase());
  });
  defaultArr = filtered;
  cardBody();
  if (allData.length <= num) {
    load.disabled = true;
    load.style.opacity = 0.5;
  }
});
// cardBody()