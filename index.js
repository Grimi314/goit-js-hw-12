import{S,a as v,i as l}from"./assets/vendor-tJNkohiD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const q=new S(".gallery a",{captionsData:"alt",captionDelay:250}),d=document.querySelector(".gallery"),g=document.querySelector(".loader"),p=document.querySelector(".button-load-more");async function y(o){const t=await o.map(s=>{const{downloads:a,webformatURL:e,largeImageURL:r,tags:n,likes:b,views:L,comments:w}=s;return`<li class="gallery-item">
        <a class="gallery-link" href="${r}" target="_blank" rel="noopener noreferrer">
          <img
            class="gallery-image"
            src="${e}"
            data-source="${r}"
            alt="${n}"
          />
        </a>
        <ul class="number-list">
          <li class="numder-item">
            <p class=" ">Likes</p>
            <p class="umber-text">${b}</p>
          </li>
          <li class="numder-item">
            <p class="umber-text">Views</p>
            <p class="umber-text">${L}</p>
          </li>
          <li class="numder-item">
            <p class="umber-text">Comments</p>
            <p class="umber-text">${w}</p>
          </li>
          <li class="numder-item">
            <p class="umber-text">Downloads</p>
            <p class="umber-text">${a}</p>
          </li>
        </ul>
      </li>`}).join("");d.insertAdjacentHTML("beforeend",t),q.refresh()}async function x(){d.innerHTML=""}async function $(){g.classList.remove("hidden")}async function m(){g.classList.add("hidden")}async function I(){p.classList.remove("hidden")}function B(){p.classList.add("hidden")}const c={params:{key:"54150142-86526a32bbcea3c4d6b3084a1",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15}};async function h(o,t){return c.params.q=o,(await v.get("https://pixabay.com/api/",c)).data}const E=document.querySelector(".button-load-more"),M=document.querySelector(".form");let i="",u=0,f=0;M.addEventListener("submit",async o=>{if(o.preventDefault(),i=o.target.elements["search-text"].value.trim(),!!i){x(),$(),c.params.page=1,u=0;try{const t=await h(i);if(t.hits.length===0){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),m();return}y(t.hits),f=t.totalHits,u+=t.hits.length,I(),m()}catch{l.error({title:"Error",message:"Server error. Try again later."}),m()}}});E.addEventListener("click",()=>{c.params.page++,h(i).then(o=>{y(o.hits),u+=o.hits.length,requestAnimationFrame(()=>{const t=document.querySelectorAll(".gallery-item"),s=t[t.length-1];if(!s)return;const a=s.querySelector("img");if(!a.complete)a.onload=()=>{const{height:e}=s.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})};else{const{height:e}=s.getBoundingClientRect();window.scrollBy({top:e*3,behavior:"smooth"})}}),u>=f&&(B(),l.error({title:"Error",message:"We're sorry, but you've reached the end of search results."}))}).catch(()=>{l.error({title:"Error",message:"Server error."})})});
//# sourceMappingURL=index.js.map
