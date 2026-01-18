import{S as $,a as E,i as l}from"./assets/vendor-tJNkohiD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const I=new $(".gallery a",{captionsData:"alt",captionDelay:250}),g=document.querySelector(".gallery"),h=document.querySelector(".loader"),y=document.querySelector(".button-load-more");async function f(r){const t=await r.map(s=>{const{downloads:i,webformatURL:e,largeImageURL:o,tags:a,likes:v,views:x,comments:q}=s;return`<li class="gallery-item">
        <a class="gallery-link" href="${o}" target="_blank" rel="noopener noreferrer">
          <img
            class="gallery-image"
            src="${e}"
            data-source="${o}"
            alt="${a}"
          />
        </a>
        <ul class="number-list">
          <li class="numder-item">
            <p class=" ">Likes</p>
            <p class="umber-text">${v}</p>
          </li>
          <li class="numder-item">
            <p class="umber-text">Views</p>
            <p class="umber-text">${x}</p>
          </li>
          <li class="numder-item">
            <p class="umber-text">Comments</p>
            <p class="umber-text">${q}</p>
          </li>
          <li class="numder-item">
            <p class="umber-text">Downloads</p>
            <p class="umber-text">${i}</p>
          </li>
        </ul>
      </li>`}).join("");g.insertAdjacentHTML("beforeend",t),I.refresh()}function M(){g.innerHTML=""}function p(){h.classList.remove("hidden")}function b(){h.classList.add("hidden")}function L(){y.classList.remove("hidden")}function w(){y.classList.add("hidden")}const m={params:{key:"54150142-86526a32bbcea3c4d6b3084a1",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:150}};async function S(r,t){return m.params.q=r,m.params.page=t,(await E.get("https://pixabay.com/api/",m)).data}const D=document.querySelector(".button-load-more"),O=document.querySelector(".form");let c="",u=1,n=0,d=0;O.addEventListener("submit",async r=>{if(r.preventDefault(),c=r.target.elements["search-text"].value.trim(),!!c){u=1,n=0,M(),w(),p();try{const t=await S(c,u);if(t.hits.length===0){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}f(t.hits),d=t.totalHits,n+=t.hits.length,n<d?L():l.error({title:"Error",message:"We're sorry, but you've reached the end of search results."})}catch{l.error({title:"Error",message:"Server error. Try again later."})}finally{b()}}});D.addEventListener("click",async()=>{u+=1,w(),p();try{const r=await S(c,u);f(r.hits),n+=r.hits.length,B(),n<d?L():l.error({title:"Error",message:"We're sorry, but you've reached the end of search results."})}catch{l.error({title:"Error",message:"Server error."})}finally{b()}});function B(){requestAnimationFrame(()=>{const r=document.querySelectorAll(".gallery-item"),t=r[r.length-1];if(!t)return;const{height:s}=t.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})})}
//# sourceMappingURL=index.js.map
