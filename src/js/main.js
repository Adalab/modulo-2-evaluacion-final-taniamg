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
  html += `<h1> Number 5 is alive. What do I search for you?</h1>`;
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
  html += `<ul class="fav_list--series fav_series--container">`;
  html += `</ul>`;
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
const inputEl = document.querySelector(".js_text");
const series = document.querySelector(".list_series");
const favElements = document.querySelector(".fav_list--series");
// 6. declaro la funcion que llama a la API y almacena result en dataSeries
function getFromApi() {
  const url = "https://api.tvmaze.com/search/shows?q=" + inputEl.value;

  //eventos

  function handleButtonSearch(ev) {
    getFromApi();
  }
  btnSearch.addEventListener("click", handleButtonSearch);

  function preventD(event) {
    event.preventDefault();
  }
  form.addEventListener("submit", preventD);

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      dataSeries = result;

      paintSeries();
    });
}

//funcion para pintar series en ul
function paintSeries() {
  let seriesList = "";

  for (const iten of dataSeries) {
    console.log(iten);
    seriesList += `<li class="series_place favourites " id=${iten.show.id}>`;

    if (iten.show.image === null) {
      seriesList += `<img src ="${imageDefault}">`;
    } else {
      seriesList += `<img src ="${iten.show.image.medium}">`;
    }
    seriesList += `<h2>${iten.show.name}</h2>`;
    seriesList += `</li>`;
  }
  series.innerHTML = seriesList;

  listenSerieList();
}

//funcion favoritos

// funcion manejadora del evento que va a escuchar cada serie, elegirla y añadirla a fav
function handleFavSeries(ev) {
  //variable para obtener el id de cada serie clicada
  const selectedSerie = parseInt(ev.target.parentElement.id);
  //busco la serie en el array de series
  const clickedSerie = dataSeries.find((iten) => {
    iten.show.id === selectedSerie;
  });

  // busco la serieclicada en el array de favoritos
  const favSeriesFound = favouritesSeries.findIndex((favIten) => {
    return favIten.show.id === selectedSerie;
  });
  //si no esta me devuelve -1
  if (favSeriesFound === -1) {
    //lo añado a favoritos
    favouritesSeries.push(clickedSerie);
  } else {
    //lo quitamos
    favouritesSeries.splice(favSeriesFound, 1);
  }
  paintFavSeries();
  paintSeries();
  setInLocalStorage();
}
debugger;
//funcion que reconozca evento click sobre los li de cada  serie
function listenSerieList() {
  const favSeriesElements = document.querySelectorAll(".js_favourites");
  for (const favSerie of favSeriesElements) {
    favSerie.addEventListener("click", handleFavSeries);
  }
}
//compruebo si es favorita

function isFavourite(iten) {
  const favouriteFound = favouritesSeries.find((favIten) => {
    return favIten.show.id === iten.show.id;
  });

  if (favouriteFound === undefined) {
    return false;
  } else {
    return true;
  }
}

function isValidSerie(iten) {
  const filterNameValue = filterInput.value.toLowerCase();
  return iten.name.toLowerCase().includes(filterNameValue);
}

//2.funcion que pinta series favoritas
function paintFavSeries() {
  let favElement = "";

  for (const eachSerie of favouritesSeries) {
    favElement += `<li class="series_place favourites js_favourites" id=${eachSerie.show.id}>`;

    if (eachSerie.show.image === null) {
      favElement += `<img src ="${imageDefault}">`;
    } else {
      favElement += `<img src ="${eachSerie.show.image.medium}">`;
    }
    favElements += `<h2>${eachSerie.show.name}</h2>`;
    favElements += `</li>`;
  }
  favElements.innerHTML = favElement;
}
paintFavSeries();

// localStorage

function setInLocalStorage() {
  //con stringify paso el array a string
  const stringSeries = JSON.stringify(favouritesSeries);
  //añado los datos convertidos a localStorage
  localStorage.setItem("favouritesSeries", stringSeries);
}

//funcion para buscar el LS si hay informacion
function getLocalStorage() {
  //const pra obtener lo que hay en el LS
  const localStorageSeries = localStorage.getItem("favouritesSeries");
  if (localStorageSeries === null) {
    //no hay datos asi que ejecutamos peticion a API
    getFromApi();
  } else {
    //si hay datos los guardo en una variable y loincluyo en el array favoritos
    const arrayPreviousFav = JSON.parse(localStorageSeries);
    favouritesSeries = arrayPreviousFav;
    paintFavSeries();
  }
}
getLocalStorage();
