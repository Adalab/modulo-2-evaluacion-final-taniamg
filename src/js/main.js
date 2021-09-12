"use strict";
//firstly  var to create html
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

function preventD(event) {
  event.preventDefault();
}
form.addEventListener("submit", preventD);

// call API to get info
function handleButtonSearch() {
  const url = "https://api.tvmaze.com/search/shows?q=" + inputEl.value;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      dataSeries = result;

      paintSeries();
    });
}
btnSearch.addEventListener("click", handleButtonSearch);

//function to paint list series array at HTML
function paintSeries() {
  let seriesList = "";
  let favClass = "";

  for (const iten of dataSeries) {
    const isFav = isFavourite(iten);
    if (isFav) {
      favClass = "favourite_check";
    } else {
      favClass = "";
    }
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

//listener fav series

function listenSerieList() {
  const favSeriesElements = document.querySelectorAll(".js_favourites");
  for (const favSerie of favSeriesElements) {
    favSerie.addEventListener("click", handleFavSeries);
  }
}

//check a valid one
function isValidSerie(iten) {
  const filterNameValue = filterInput.value.toLowerCase();
  return iten.name.toLowerCase().includes(filterNameValue);
}
//check if is a previous one
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

/////listen and store favourite series

//handle event
function handleFavSeries(ev) {
  //search  clicked id
  const selectedSerie = parseInt(ev.currentTarget.id);
  //find serie which belongs id
  const clickedSerie = dataSeries.find((iten) => {
    return iten.show.id === selectedSerie;
  });

  // check serie at fav array
  const favSeriesFound = favouritesSeries.findIndex((favIten) => {
    return favIten.show.id === selectedSerie;
  });
  //if it doesn´t give back -1
  if (favSeriesFound === -1) {
    // add fav array
    favouritesSeries.push(clickedSerie);
  } else {
    //if it is delete it
    favouritesSeries.splice(favSeriesFound, 1);
  }
  paintFavSeries();
  /*handleEachDelBtn();*/
  setInLocalStorage();
}

//paint fav lis serie
function paintFavSeries() {
  let favElement = "";

  for (const eachSerie of favouritesSeries) {
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

//delete a single favourite

//listen each favourite delete item

function clickDelBtn() {
  const delEachFavBtn = document.querySelectorAll(".js-delete-btn");
  for (const eachbtn of delEachFavBtn) {
    eachbtn.addEventListener("click", deleteOneSerie);
  }
}

function deleteOneSerie(ev) {
  const selectedDelSerie = parseInt(ev.currentTarget.id);
  const clickedSerie = favouritesSeries.findIndex((fav) => {
    return fav.show.id === selectedDelSerie;
  });
  if (clickedSerie !== -1) {
    favouritesSeries.splice(clickedSerie, 1);
  }

  favouritesSeries();
  paintSeries();
  setInLocalStorage();
}

// localStorage

// set in
function setInLocalStorage() {
  localStorage.setItem("favouritesSeries", JSON.stringify(favouritesSeries));
}

//get off
function getLocalStorage() {
  const localStorageSeries = localStorage.getItem("favouritesSeries");
  favouritesSeries = JSON.parse(localStorageSeries);
  paintFavSeries();
  deleteOneSerie();
}

getLocalStorage();

btnSearch.addEventListener("click", handleButtonSearch);
