"use strict";

const mainElements = document.querySelector(".js_main");
const btnSearch = document.querySelector(".js_btn");

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
  html += `</div>`;
  html += `<div class="series_container">`;
  html += `</div>`;
  html += `</section>`;
  mainElements.innerHTML = html;
}
paintHtml();

function handleButtonSearch(ev) {
  debugger;
  let inputEl = document.querySelector(".js_text");
  const url = "//api.tvmaze.com/search/shows?q=" + inputEl.value;
  console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
  ev.preventDefault();
}

btnSearch.addEventListener("click", handleButtonSearch);
