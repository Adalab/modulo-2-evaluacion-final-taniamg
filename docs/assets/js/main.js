"use strict";const mainElements=document.querySelector(".js_main"),imageDefault="https://via.placeholder.com/210x295/ffffff/666666/?text=TV";let dataSeries=[],favouritesSeries=[];function paintHtml(){let e="";e+="<section>",e+='<div class="search_container" >',e+="<h1> Number 5 is alive. What do I search for you?</h1>",e+='<form autocomplete="off" class="form_container js_form">',e+='<label for="search request"> </label>',e+='<input id="search request" class="form_container--text js_text" type="text" placeholder="e.g.,Fringe" />',e+='<label for="submit"> </label>',e+='<input id ="submit" class="form_container--button js_btn" type="submit"  />',e+="</form >",e+="</div>",e+="</section>",e+='<section class="main_series--container">',e+='<div class="favourites_container">',e+='<button  class="js-reset-btn  reset_total--button "type="reset" value="submit">Reset</button>',e+="<h2> You say yours favourites are: </h2>",e+='<ul class="favourites_container--series fav_list--series">',e+="</ul>",e+="</div>",e+='<div class="series_container">',e+="<h2> Number 5 finds to you : </h2>",e+='<ul class="series_container--list list_series">',e+="</ul>",e+="</div>",e+="</section>",mainElements.innerHTML='<section><div class="search_container" ><h1> Number 5 is alive. What do I search for you?</h1><form autocomplete="off" class="form_container js_form"><label for="search request"> </label><input id="search request" class="form_container--text js_text" type="text" placeholder="e.g.,Fringe" /><label for="submit"> </label><input id ="submit" class="form_container--button js_btn" type="submit"  /></form ></div></section><section class="main_series--container"><div class="favourites_container"><button  class="js-reset-btn  reset_total--button "type="reset" value="submit">Reset</button><h2> You say yours favourites are: </h2><ul class="favourites_container--series fav_list--series"></ul></div><div class="series_container"><h2> Number 5 finds to you : </h2><ul class="series_container--list list_series"></ul></div></section>'}paintHtml();const btnSearch=document.querySelector(".js_btn"),form=document.querySelector(".js_form"),inputEl=document.querySelector(".js_text"),series=document.querySelector(".list_series"),favElements=document.querySelector(".fav_list--series");function preventD(e){e.preventDefault()}function handleButtonSearch(){const e="https://api.tvmaze.com/search/shows?q="+inputEl.value;fetch(e).then(e=>e.json()).then(e=>{dataSeries=e,paintSeries()})}function isFavourite(e){return void 0!==favouritesSeries.find(t=>t.show.id===e.show.id)}function paintSeries(){let e="";for(const t of dataSeries){const s=isFavourite(t);console.log(s),e+=s?`<li class="series_item  js_favourites favourite_check" id=${t.show.id}>`:`<li class="series_item favourites js_favourites " id=${t.show.id}>`,null===t.show.image?e+=`<img class="series_item--img"src ="${imageDefault}">`:e+=`<img class="series_item--img" src ="${t.show.image.medium}">`,e+=`<h2 class="series_item--name">${t.show.name}</h2>`,e+="</li>"}series.innerHTML=e,listenSerieList()}function listenSerieList(){const e=document.querySelectorAll(".js_favourites");for(const t of e)t.addEventListener("click",handleFavSeries)}function isValidSerie(e){const t=filterInput.value.toLowerCase();return e.name.toLowerCase().includes(t)}function handleFavSeries(e){const t=parseInt(e.currentTarget.id),s=dataSeries.find(e=>e.show.id===t),i=favouritesSeries.findIndex(e=>e.show.id===t);-1===i?favouritesSeries.push(s):favouritesSeries.splice(i,1),paintFavSeries(),paintSeries(),setInLocalStorage()}function paintFavSeries(){let e="";for(const t of favouritesSeries)e+=`<li class="favourites_item js_favourites" id=${t.show.id}>`,null===t.show.image?e+=`<img class="favourites_item--img" src ="${imageDefault}">`:e+=`<img  class="favourites_item--img" src ="${t.show.image.medium}">`,e+=`<h2 class="favourites_item--name">${t.show.name}</h2>`,e+='<button  class="js-delete-btn  reset_item--button "type="reset" value="submit">x</button>',e+="</li>";favElements.innerHTML=e,clickDelBtn()}function clickDelBtn(){const e=document.querySelectorAll(".js-delete-btn");for(const t of e)t.addEventListener("click",deleteOneSerie)}function deleteOneSerie(e){const t=parseInt(e.currentTarget.id),s=favouritesSeries.findIndex(e=>e.show.id===t);-1!==s&&favouritesSeries.splice(s,1),paintSeries(),setInLocalStorage()}form.addEventListener("submit",preventD),btnSearch.addEventListener("click",handleButtonSearch);const resetAllBtn=document.querySelector(".js-reset-btn");function setInLocalStorage(){localStorage.setItem("favouritesSeries",JSON.stringify(favouritesSeries))}function getLocalStorage(){const e=localStorage.getItem("favouritesSeries");null!==e&&(favouritesSeries=JSON.parse(e),paintFavSeries())}function reset(){favouritesSeries=[],dataSeries=[],paintFavSeries(),paintSeries()}resetAllBtn.addEventListener("click",reset),getLocalStorage(),btnSearch.addEventListener("click",handleButtonSearch);