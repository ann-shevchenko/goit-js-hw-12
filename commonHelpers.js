import{a as p,S as y,i as b}from"./assets/vendor-c493984e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))d(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&d(n)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();const v="https://pixabay.com/api/",L=async(e,t)=>(await p.get(v,{params:{key:"44022790-a27ad4929b92e52df6d2f0bb4",q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t.number,per_page:t.size}})).data||{};function w(e){return`<li>
      <a class="gallery-link" href="${e.largeImageURL}">
      <img
          class="gallery-img"
          src="${e.webformatURL}"
          data-source="${e.largeImageURL}"
          alt="${e.tags}"></a>
      <div class="information">
       <div>
          <h3>Likes</h3>
          <p>${e.likes}</p>
       </div>
        <div>
            <h3>Views</h3>
            <p>${e.views}</p>
        </div>
        <div>
          <h3>Comments</h3>
          <p>${e.comments}</p>
        </div>
        <div>
          <h3>Downloads</h3>
          <p>${e.downloads}</p>
        </div>
      </div>
    </li>`}function I(e){return e&&e.length?e.map(w).join(""):""}const q=new y(".gallery-list a",{caption:!0,captionsData:"alt",captionDelay:250});function f(e,t){b.show({message:e,image:"../img/bi_x-octagon.svg",messageColor:"#FFF",position:"topRight",backgroundColor:t,maxWidth:"472px",imageWidth:24})}function m(e){f(e,"#EF4040")}function x(e){f(e,"#323C7F")}const S=document.querySelector(".form"),l=document.querySelector(".btn-lmore"),c=document.querySelector(".gallery-list"),h=document.querySelector(".loader");function P(e){let t=c.querySelector("li").getBoundingClientRect().height;window.scrollBy({top:t*e,behavior:"smooth"})}function u(e,t){let a=I(e);t&&(a=c.innerHTML+a),c.innerHTML=a,q.refresh()}function i(e,t){t?e.classList.remove("hidden"):e.classList.add("hidden")}const o={query:"",page:{number:0,size:15,last:!1},totalItems:0,nextPage(){return this.page.number++,this.page},hasNextPage(){const e=this.page.number*this.page.size;return this.totalItems&&e<this.totalItems},reset(e,t=15){this.query=e.trim(),this.totalItems=0,this.page={number:0,size:t,last:!1}}};async function g(e){i(h,!0),i(l,!1);try{const t=await L(o.query,o.nextPage());e(t)}catch(t){console.error(t),m("Sorry, something went wrong. Try one more time.")}finally{i(h,!1),i(l,o.hasNextPage()),o.totalItems?o.hasNextPage()||x("We're sorry, but you've reached the end of search results."):m("Sorry, there are no images matching your search query. Please try again!")}}S.addEventListener("submit",async e=>{e.preventDefault(),o.reset(e.target.elements.query.value),u([],!1),await g(t=>{u(t.hits||[],!1),o.totalItems=t.totalHits||0})});l.addEventListener("click",async e=>{e.preventDefault(),await g(t=>{u(t.hits||[],!0),P(2)})});
//# sourceMappingURL=commonHelpers.js.map
