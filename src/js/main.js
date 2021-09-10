"use strict";
// 1. declaro mainElements para tener acceso a js_main que se usa en paintHtml
const mainElements = document.querySelector(".js_main");
const imageDefault =
  "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";

// 2. declaro los arrays para almacenar api
let dataSeries = [];
let favouritesSeries = [];

// 3. funcion que crea el html del buscador
function paintHtml() {
  let html = "";
  html += `<section>`;
  html += `<div class="search_container" >`;
  html += `<h1> ¿Qué serie quieres encontrar? </h1>`;
  html += `<form class="form_container">`;
  html += `<label for="search request"> </label>`;
  html += `<input class="text js_text" type="text" placeholder="Fringe" />`;
  html += `<label for="submit"> </label>`;
  html += `<input class="button js_btn" type="submit" value="Buscar" />`;
  html += `</form >`;
  html += `</div>`;
  html += `</section>`;
  html += `<section class="main_series--container">`;
  html += `<div class="favourites_container">`;
  html += `<h2> Series favoritas: </h2>`;
  html += `</div>`;
  html += `<div class="series_container">`;
  html += `<h2> Hemos encontrado.... </h2>`;
  html += `<ul class="list_series">`;
  html += `</ul>`;
  html += `</div>`;
  html += `</section>`;
  mainElements.innerHTML = html;
}

// 4. llamo a la funcion para que pinte html en main
paintHtml();

// 5.declaro las variables DESPUES de crear html, porque hace referencia a elementos que se crean DINAMICAMENTE. EL ORDEN IMPORTA!!
const btnSearch = document.querySelector(".js_btn");
let inputEl = document.querySelector(".js_text");
let series = document.querySelector(".list_series");

// 6. declaro la funcion que llama a la API y almacena result en dataSeries
function getFromApi() {
  const url = "https://api.tvmaze.com/search/shows?q=" + inputEl.value;
  console.log("Step 2");
  // Llamamos a api y el resultado se lo pasamos al handle, ya que la respuesta puede tarda x, y el flujo de app sigue.
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      dataSeries = result;
      paintSeries();
    });
}

function handleResult(result) {
  dataSeries = result;
  console.log("Step 3");
  console.log(dataSeries);

  //paintSeries()
}
//funcion para pintar series en ul
function paintSeries() {
  console.log(dataSeries);
  series.innerHTML = "";
  for (const iten of dataSeries) {
    console.log(iten);
    series.innerHTML += `<li class="favorites js_favorites">`;
    if (iten.show.image === null) {
      series.innerHTML += `<img src ="${imageDefault}">`;
    } else {
      series.innerHTML += `<img src ="${iten.show.image.medium}">`;
    }
    series.innerHTML += `<h2>${iten.show.name}</h2>`;
    series.innerHTML += `</li>`;
  }
}

//funcion favoritos

//7. declaro la función manejadora que llama al evento de buscar en el API
function handleButtonSearch(ev) {
  console.log("Init - Pulso boton");
  ev.preventDefault();
  console.log("Step 1");
  getFromApi();
  console.log("Step 4");
}

//
btnSearch.addEventListener("click", handleButtonSearch);
