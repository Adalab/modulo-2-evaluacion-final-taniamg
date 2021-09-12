"use strict";

const mainElements = document.querySelector(".js_main");
const imageDefault =
  "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
let dataSeries = [];
let favouritesSeries = [];

// 1.paint basic HTML from JS
function paintHtml() {
  let html = "";
  html += `<section>`;
  html += `<div class="search_container" >`;
  html += `<h1> Number 5 is alive. What do I search for you?</h1>`;
  html += `<form autocomplete="off" class="form_container js_form">`;
  html += `<label for="search request"> </label>`;
  html += `<input id="search request" class="form_container--text js_text" type="text" placeholder="Fringe" />`;
  html += `<label for="submit"> </label>`;
  html += `<input id ="submit" class="form_container--button js_btn" type="submit"  />`;
  html += `</form >`;
  html += `</div>`;
  html += `</section>`;
  html += `<section class="main_series--container">`;
  html += `<div class="favourites_container">`;
  html += `<h2> You say yours favourites are: </h2>`;
  html += `<ul class="favourites_container--series fav_list--series">`;
  html += `</ul>`;
  html += `</div>`;
  html += `<div class="series_container">`;
  html += `<h2> Number 5 finds to you : </h2>`;
  html += `<ul class="series_container--list list_series">`;
  html += `</ul>`;
  html += `</div>`;
  html += `</section>`;
  mainElements.innerHTML = html;
}
paintHtml();

//
const btnSearch = document.querySelector(".js_btn");
const form = document.querySelector(".js_form");
const inputEl = document.querySelector(".js_text");
const series = document.querySelector(".list_series");
const favElements = document.querySelector(".fav_list--series");
// 6. declaro la funcion que llama a la API y almacena result en dataSeries

//Events
function handleButtonSearch() {
  getFromApi();
}

function preventD(event) {
  event.preventDefault();
}

btnSearch.addEventListener("click", handleButtonSearch);
form.addEventListener("submit", preventD);

// call API to get info
function getFromApi() {
  const url = "https://api.tvmaze.com/search/shows?q=" + inputEl.value;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      dataSeries = result;

      paintSeries();
    });
}

//function to paint list series array at HTML
function paintSeries() {
  let seriesList = "";

  for (const iten of dataSeries) {
    seriesList += `<li class="series_item favourites js_favourites" id=${iten.show.id}>`;

    if (iten.show.image === null) {
      seriesList += `<img class="series_item--img"src ="${imageDefault}">`;
    } else {
      seriesList += `<img class="series_item--img" src ="${iten.show.image.medium}">`;
    }
    seriesList += `<h2 class="series_item--name">${iten.show.name}</h2>`;
    seriesList += `</li>`;
  }
  series.innerHTML = seriesList;

  listenSerieList(); //call each input to favoriteSeries
}

//funcion favoritos

// funcion manejadora del evento que va a escuchar cada serie, elegirla y añadirla a fav
function handleFavSeries(ev) {
  //variable para obtener el id de cada serie clicada
  const selectedSerie = parseInt(ev.currentTarget.id);
  //busco la serie en el array de series
  const clickedSerie = dataSeries.find((iten) => {
    return iten.show.id === selectedSerie;
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
  handleEachDelBtn();
  setInLocalStorage();
}

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
  /*let favClass = "";*/

  for (const eachSerie of favouritesSeries) {
    /*const isFav = isFavourite(iten);
    if (isFav) {
      favClass = "favourite_check";
    } else {
      favClass = "standart_item";
    }*/
    favElement += `<li class="favourites_item js_favourites" id=${eachSerie.show.id}>`;

    if (eachSerie.show.image === null) {
      favElement += `<img class="favourites_item--img" src ="${imageDefault}">`;
    } else {
      favElement += `<img  class="favourites_item--img" src ="${eachSerie.show.image.medium}">`;
    }
    favElement += `<h2 class="favourites_item--name">${eachSerie.show.name}</h2>`;
    favElement += `<button name= "del" class="reset_item--button resetFavItem"type="reset" value="submit"><i class="far fa-times-circle reset_item"></i></button>`;
    favElement += `</li>`;
  }
  favElements.innerHTML = favElement;
}

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
    //getFromApi();
  } else {
    //si hay datos los guardo en una variable y loincluyo en el array favoritos
    const arrayPreviousFav = JSON.parse(localStorageSeries);
    favouritesSeries = arrayPreviousFav;
    paintFavSeries();
  }
}
getLocalStorage();

//delete a single favourite

//listen each favourite delete item
debugger;
const eachDelButn = () => {
  const delEachFavBtn = document.querySelectorAll(".resetFavItem");
  for (const eachbtn of delEachFavBtn) {
    eachbtn.addEventListener("click", handleEachDelBtn);
  }
};

const handleEachDelBtn = (ev) => {
  const indexBtn = parseInt(ev.currentTarget.id);
  const clickedIcon = favouritesSeries.find((favIten) => {
    return favIten.show.id === clickedIcon;
  });
  const previousIten = favouritesSeries.findIndex((favIten) => {
    return favIten.show.id === clickedIcon;
  });
  if (previousIten !== -1) {
    favouritesSeries.splice(indexBtn, 1);
  }
  setInLocalStorage();
  favouritesSeries();
  /*paintSeries();*/
};
