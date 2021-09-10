"use strict";
// variables generales
const mainElements = document.querySelector(".js_main");
const imageDefault =
  "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";

// variable array llamada api
let dataSeries = [];

//variable array  creado favoritos
let favouritesSeries = [];

// 3. funcion que crea el html del buscador
function paintHtml() {
  let html = "";
  html += `<section>`;
  html += `<div class="search_container" >`;
  html += `<h1> ¿Qué serie quieres encontrar? </h1>`;
  html += `<form class="form_container js_form">`;
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
  html += `<ul class="list_series list_series--container">`;
  html += `</ul>`;
  html += `</div>`;
  html += `</section>`;
  mainElements.innerHTML = html;
}

// 4. llamo a la funcion para que pinte html en main
paintHtml();

// 5.declaro las variables DESPUES de crear html, porque hace referencia a elementos que se crean DINAMICAMENTE. EL ORDEN IMPORTA!!
const btnSearch = document.querySelector(".js_btn");
const form = document.querySelector(".js_form");
let inputEl = document.querySelector(".js_text");
let series = document.querySelector(".list_series");

// 6. declaro la funcion que llama a la API y almacena result en dataSeries
function getFromApi() {
  const url = "https://api.tvmaze.com/search/shows?q=" + inputEl.value;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      dataSeries = result;

      paintSeries();
    });
}

//funcion para pintar series en ul
function paintSeries() {
  console.log(dataSeries);
  series.innerHTML = "";
  for (const iten of dataSeries) {
    console.log(iten);
    series.innerHTML += `<li class="series_place favourites js_favourites" id=${iten.show.id}>`;
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

//1. funcion que reconozca evento click sobre los li de cada  serie

function listenSerieList() {
  const favSeriesElements = document.querySelectorAll(".js_favourites");
  for (const favSerie of favSeriesElements) {
    favSerie.addEventListener("click", handleFavSeries);
  }
}

//2.

//. eventos
function handleButtonSearch(ev) {
  getFromApi();
}
btnSearch.addEventListener("click", handleButtonSearch);

function preventD(event) {
  event.preventDefault();
}
form.addEventListener("submit", preventD);
