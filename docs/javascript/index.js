!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";function e(e){return 0==(128&e)}function t(t,r){return!e(t)||0==(t&1<<r)}function r(t,r,n,i,l,o){let s=n.cells.slice(0);const u=l(t,r,n),c=i(u);return e(s[t])&&(s[t]=o(s[t],u)),e(s[r])&&(s[r]=o(s[r],c)),{...n,cells:s}}var n;!function(e){e[e.TOP=1]="TOP",e[e.RIGHT=2]="RIGHT",e[e.BOTTOM=4]="BOTTOM",e[e.LEFT=8]="LEFT"}(n||(n={}));function i(e){return{cells:new Uint8Array(e.width*e.height),size:e}}function l(e,{size:t}){return e.y*t.width+e.x}function o(e,{size:t}){return{x:e%t.width,y:Math.floor(e/t.width)}}function s(e){return 15&(e<<2|e>>2)}function u(e,t,{size:r}){const i=o(e,{size:r}),l=o(t,{size:r});if(i.y>l.y)return n.TOP;if(i.x<l.x)return n.RIGHT;if(i.y<l.y)return n.BOTTOM;if(i.x>l.x)return n.LEFT;throw`'${i}' and '${l}' are not neighbours`}function c({x:e,y:t},r){let i={x:e,y:t};return r===n.TOP&&i.y--,r===n.RIGHT&&i.x++,r===n.BOTTOM&&i.y++,r===n.LEFT&&i.x--,i}var a,f=Object.freeze({__proto__:null,get Direction(){return n},_size_params:["height","width"],newBoard:i,newFromBaseBoard:function({cells:e},t){return{cells:e,size:t}},toIndex:l,toPosition:o,getCellByPosition:function(e,{cells:t,size:r}){return t[l(e,{size:r})]},setCellByPosition:function(e,t,{cells:r,size:n}){return r[l(e,{size:n})]=t},getOpposingDirection:s,getRelativeDirection:u,getRelativePosition:c,getNeighbours:function(t,{cells:r,size:n}){let i=[];return t>=n.width&&i.push(t-n.width),(t+1)%n.width!=0&&i.push(t+1),t<r.length-n.width&&i.push(t+n.width),t%n.width!=0&&i.push(t-1),i=i.filter((t=>e(r[t]))),i},getAllowedDirection:function({x:r,y:i},{cells:o,size:a},f=!0){let d=[];return i>0&&d.push(n.TOP),r<a.width-1&&d.push(n.RIGHT),i<a.height-1&&d.push(n.BOTTOM),r>0&&d.push(n.LEFT),d.filter((n=>{const d=l(c({x:r,y:i},n),{size:a}),h=l({x:r,y:i},{size:a}),g=o[d];return(!f||!function(e,r,n,i,l){const o=i(e,r,n),s=l(o);return t(n.cells[e],o)&&t(n.cells[r],s)}(d,h,{cells:o,size:a},u,s))&&e(g)})),d},getRows:function({cells:t,size:r}){return Array.from(t).map(((e,t)=>t)).reduce(((e,t,n)=>(n%r.width==0&&e.push([]),e[e.length-1].push(t),e)),[]).map((r=>r.filter((r=>e(t[r]))))).filter((e=>e.length))},removeInterWall:function(e,t,n){return r(e,t,n,s,u,((e,t)=>e|t))},setInterWall:function(e,t,n){return r(e,t,n,s,u,((e,t)=>e&~t))}});!function(e){e[e.TOP_CW=1]="TOP_CW",e[e.TOP_CCW=2]="TOP_CCW",e[e.RIGHT=4]="RIGHT",e[e.BOTTOM=8]="BOTTOM",e[e.LEFT=16]="LEFT"}(a||(a={}));function d(e){return Array.from(e).reduce(((e,t)=>e+t),0)}function h({radius:e,innerRadius:t=3}){const r=d(p(e).slice(t));return{cells:new Uint8Array(r),size:{innerRadius:t,radius:e}}}function g(e){switch(e){case a.TOP_CCW:case a.TOP_CW:return a.BOTTOM;case a.RIGHT:return a.LEFT;case a.LEFT:return a.RIGHT}return a.TOP_CW&a.TOP_CCW}function _(e,t,{size:r}){const n=O(e,{size:r}),i=O(t,{size:r});if(n.r-1===i.r)return a.BOTTOM;if(n.r===i.r&&n.t+1===i.t)return a.RIGHT;if(n.r===i.r&&n.t<i.t&&0===n.t)return a.LEFT;if(n.r===i.r&&n.t-1===i.t)return a.LEFT;if(n.r===i.r&&n.t>i.t&&0===i.t)return a.RIGHT;if(n.r+1===i.r&&e%2==0)return a.TOP_CW;if(n.r+1===i.r&&e%2==1)return a.TOP_CCW;throw`'${n}' and '${i}' are not neighbours`}function p(e){let t=[1],r=[0];for(let n=1;n<e;++n)t[n]=t[n-1],2*Math.PI*n/t[n-1]>2&&(t[n]*=2),r[n]=r[n-1]+t[n-1];return t}function T(e,{size:t}){return d(p(t.innerRadius+e.r).slice(t.innerRadius))+e.t}function O(e,{size:t}){const r=p(t.radius).slice(t.innerRadius).reduce(((e,t)=>(e.push(e[e.length-1]+t),e)),[0]),n=r.findIndex((t=>t>e));return{r:n-1,t:e-r[n-1]}}function E({size:e}){const t=p(e.radius).slice(e.innerRadius);let r=0,n=[];for(let e of t)n.push(Array.from(new Array(e),((e,t)=>r+t))),r+=e;return n}var z=Object.freeze({__proto__:null,get Direction(){return a},_size_params:["radius","innerRadius"],newBoard:h,newFromBaseBoard:function({cells:e},t){return{cells:e,size:t}},getCell:function(e,{cells:t,size:r}){return t[T(e,{size:r})]},setCell:function(e,t,{cells:r,size:n}){return r[T(e,{size:n})]=t},getOpposingDirection:g,getRelativeDirection:_,getRingNodeCount:p,toIndex:T,toPosition:O,getRows:E,getNeighbours:function(e,{size:t}){const r=p(t.radius).slice(t.innerRadius),n=r.reduce(((e,t)=>(e.push(e[e.length-1]+t),e)),[0]),i=n.findIndex((t=>t>e))-1,l=e-n[i];let o=[];if(i<t.radius-t.innerRadius-1)if(r[i]<r[i+1]){const e=T({r:i+1,t:2*l},{size:t});o.push(e),o.push(e+1)}else{const e=T({r:i+1,t:l},{size:t});o.push(e)}if(l>0?o.push(e-1):o.push(e+r[i]-1),i>0){let e;e=r[i]>r[i-1]?T({r:i-1,t:Math.floor(l/2)},{size:t}):T({r:i-1,t:l},{size:t}),o.push(e)}return l<r[i]-1?o.push(e+1):o.push(e-r[i]+1),o},removeInterWall:function(e,t,n){return r(e,t,n,g,_,((e,t)=>e|t))}});function R(e,t){var r;return null===(r=Object.entries(t).find((([t,r])=>r.has(e))))||void 0===r?void 0:r[1]}function $(e,t){var r;return null===(r=Object.entries(t).find((([t,r])=>r.has(e))))||void 0===r?void 0:r[0]}function m(e,t){let r=Object.keys(t).reduce(((e,t)=>e>+t?e:+t),0),n=e instanceof Set?e:new Set([e]);return t[+r+1]=n,[(+r+1).toString(),n]}function S(e,t,r){var n,i;const l=Object.fromEntries(Object.entries(r).map((([e,t])=>[e,new Set(t)]))),o=$(e,l),s=$(t,l);return o||s?o?s?l[o]!=l[s]&&(l[o].size>l[s].size?(l[s].forEach((e=>l[o].add(e))),delete l[s]):(l[o].forEach((e=>l[s].add(e))),delete l[o])):null===(i=l[o])||void 0===i||i.add(t):null===(n=l[s])||void 0===n||n.add(e):m(new Set([e,t]),l),l}function y(e,t,r){const n=R(e,r),i=R(t,r);return!!n&&!!i&&n==i}var L,C=Object.freeze({__proto__:null,getItemSet:R,getItemSetKey:$,addItemSet:m,joinItemSets:S,isFromSameSet:y});function M(e){let t=e.slice(0);for(let e=t.length;e>0;e--){const r=Math.floor(Math.random()*e),n=t[e-1];t[e-1]=t[r],t[r]=n}return t}function P(e,t){let r=new Set(e);for(let e of t)r.delete(e);return r}function w(e){return e[b(e)]}function b(e){return Math.round(Math.random()*(e.length-1))}!function(e){e[e.RESET_MOVES=0]="RESET_MOVES",e[e.CREATE_CELL_GROUP=1]="CREATE_CELL_GROUP",e[e.MERGE_CELL_GROUP=2]="MERGE_CELL_GROUP",e[e.APPEND_CELL_GROUP=3]="APPEND_CELL_GROUP",e[e.POP_CELL_GROUP=4]="POP_CELL_GROUP",e[e.CLEAR_CELL_GROUPS=5]="CLEAR_CELL_GROUPS"}(L||(L={}));function v(e,t,r,n,i,l,o){for(let s=1;s<e.length;s++){if(null==R(e[s-1],i)){let[t,r]=m(e[s-1],i);o.register(o.Type.CREATE_CELL_GROUP,{id:t,cell:e[s-1]})}if(null==R(e[s],i)){let[t,r]=m(e[s],i);o.register(o.Type.CREATE_CELL_GROUP,{id:t,cell:e[s]})}l.getNeighbours(e[s-1],n).includes(e[s])&&(y(e[s-1],e[s],i)||(Math.random()>l.getFactor(t)||r)&&(n=l.removeInterWall(e[s-1],e[s],n),i=S(e[s-1],e[s],i),o.register(o.Type.MERGE_CELL_GROUP,{cell1:e[s-1],cell2:e[s]})))}return[n,i]}function G(e,t,r,n,i,l){for(let[o,s]of Object.entries(n)){let n=Array.from(s).filter((t=>e.includes(t)));n=M(n);let u=1+Math.round(Math.random()*(n.length-1)),c=[];for(let e=0;e<u;e++){const l=n[e],o=w(i.getNeighbours(l,r).filter((e=>t.includes(e))));null!=o&&c.push([l,o])}c.sort(((e,t)=>e[0]-t[0]));for(let[e,t]of c)r=i.removeInterWall(e,t,r),s.add(t),l.register(l.Type.APPEND_CELL_GROUP,{id:o,cell:t,neighbourCell:e})}return[r,n]}function I(e,t,r,n,i){for(let[l,o]of Object.entries(n)){let n=Array.from(o).filter((t=>e.includes(t)));n=M(n);let l=w(n);if(null==l)continue;const s=w(i.getNeighbours(l,r).filter((e=>t.includes(e))));null!=s&&(r=i.removeInterWall(l,s,r),o.add(s))}return[r,n]}var W={aldousBroder:Object.freeze({__proto__:null,_required_fns:["removeInterWall","getNeighbours"],generate:function(e,t,r={register:(...e)=>{},Type:L}){r.register(r.Type.RESET_MOVES);let n=new Set,i=b(e.cells);for(n.add(i);n.size<e.cells.length;){const r=t.getNeighbours(i,e);let l=r[Math.round((r.length-1)*Math.random())];n.has(l)||(e=t.removeInterWall(l,i,e),n.add(l)),i=l}return e}}),backtrack:Object.freeze({__proto__:null,_required_fns:["removeInterWall","getNeighbours"],generate:function(t,r,n={register:(...e)=>{},Type:L}){n.register(n.Type.RESET_MOVES);let i=Array.from(t.cells).map(((e,t)=>t)).filter((t=>e(t))),l=new Set,o=w(i);l.add(o);let s=[o];for(n.register(n.Type.CREATE_CELL_GROUP,{id:0,cell:o});0!==s.length;){o=s[s.length-1];const e=r.getNeighbours(o,t).filter((e=>!l.has(e)));if(e.length>0){let i=w(e);l.add(i),t=r.removeInterWall(o,i,t),s.push(i),n.register(n.Type.APPEND_CELL_GROUP,{id:0,cell:i,neighbourCell:o})}else{let e=s.pop();n.register(n.Type.POP_CELL_GROUP,{id:0,cell:e})}}return t}}),eller:Object.freeze({__proto__:null,_required_fns:["getRows","removeInterWall","getNeighbours"],generate:function(e,t,r={register:(...e)=>{},Type:L}){r.register(r.Type.RESET_MOVES);let n={getFactor:()=>.5,...t},i={};const l=n.getRows(e);for(let e of l[0]){let[t,n]=m(e,i);r.register(r.Type.CREATE_CELL_GROUP,{id:t,cell:e})}for(let t=0;t<l.length-1;t++){let o=l[t];[e,i]=v(o,t,!1,e,i,n,r),[e,i]=G(o,l[t+1],e,i,n,r)}return[e,i]=v(l[l.length-1],l.length-1,!0,e,i,n,r),r.register(r.Type.CLEAR_CELL_GROUPS),e},visitRow:v,connectToOtherRow:G}),kruskal:Object.freeze({__proto__:null,_required_fns:["removeInterWall","getNeighbours"],generate:function(t,r,n={register:(...e)=>{},Type:L}){n.register(n.Type.RESET_MOVES);let i={},l=new Set,o=0;for(let r=0;r<t.cells.length;r++){if(!e(t.cells[r]))continue;let[l,s]=m(r,i);n.register(n.Type.CREATE_CELL_GROUP,{id:l,cell:r}),o++}for(;l.size<o;){const o=b(t.cells);if(!e(t.cells[o]))continue;const s=w(r.getNeighbours(o,t).filter((r=>e(t.cells[r]))));y(o,s,i)||(t=r.removeInterWall(o,s,t),i=S(o,s,i),n.register(n.Type.MERGE_CELL_GROUP,{cell1:o,cell2:s}),l.add(o),l.add(s))}return n.register(n.Type.CLEAR_CELL_GROUPS),t}}),prim:Object.freeze({__proto__:null,_required_fns:["removeInterWall","getNeighbours"],generate:function(t,r,n={register:(...e)=>{},Type:L}){n.register(n.Type.RESET_MOVES);let i=new Set,l=w(t.cells.map(((e,t)=>t)).filter((r=>e(t.cells[r])))),o=new Set(r.getNeighbours(l,t));for(i.add(l);o.size>0;){l=w(Array.from(o));let e=new Set(r.getNeighbours(l,t));for(let n of e)if(i.has(n)){t=r.removeInterWall(n,l,t),o.delete(l),i.add(l),o=new Set([...o,...e]),o=P(o,i);break}}return t}}),sidewinder:Object.freeze({__proto__:null,_required_fns:["removeInterWall","getRows","getNeighbours"],generate:function(e,t,r={register:(...e)=>{},Type:L}){r.register(r.Type.RESET_MOVES);let n={getFactor:()=>Math.random(),...t},i=n.getRows(e),l={};n.getFactor||(n={...n},n.getFactor=()=>Math.random()),[e,l]=v(i[0],0,!0,e,l,n,r);for(let t=1;t<i.length;t++)[e,l]=v(i[t],t,!1,e,l,n,r),[e,l]=I(i[t],i[t-1],e,l,n);return e},connectToOtherRow:I}),_pathSet:C};const A=new Map([["className","class"],["viewBox","view=Box"]]);function x(e){return A.has(e)&&(e=A.get(e)),e.split("").map(((t,r)=>"="===t?"":t.toUpperCase()===t&&"="!==e[r-1]?`${0!==r?"-":""}${t.toLowerCase()}`:t)).join("")}function j(e,t,...r){let n=Object.entries(t||{}).map((([e,t])=>"boolean"==typeof t?x(e):`${x(e)}="${t}"`)).join(" "),i=r.map((e=>(null!=e?e:"").toString())).join("");return i?n?`<${e} ${n}>${i}</${e}>`:`<${e}>${i}</${e}>`:n?`<${e} ${n} />`:`<${e} />`}const N=["hsla(231deg, 45%, 75%, 0.5)"];function U(e){let t=Math.max(0,e-N.length);for(let e=0;e<t;e++)N.push(`hsla(${6*Math.round(60*Math.random())}deg, ${45+5*Math.round(4*Math.random())}%, ${55+5*Math.round(4*Math.random())}%, 0.5)`);return N}function B(e,t){let r=U(Object.keys(e).length),n=0;for(let i in e)t[i]||(t[i]=r[n]),n++;return t}function F(e,t){for(let[r,n]of Object.entries(t))if(n.includes(e))return r}const k={cellSize:30,lineWidth:2,paths:{},colors:{},h:j};const H={cellSize:30,lineWidth:2,paths:{},colors:{},h:j};var D={circularSvg:Object.freeze({__proto__:null,render:function(e,t={}){let r={...k,...t},n=B(r.paths,r.colors);const i=e.size.innerRadius,l=(1-i)*r.cellSize*.75,o=2*(r.cellSize*(e.size.radius-e.size.innerRadius)+l+i*r.cellSize)+r.lineWidth+2*r.cellSize,s=o/2;let u=E(e),c={},f="";for(let t=i;t<u.length+i;t++)for(let n=0;n<u[t-i].length;n++){const o=u[t-i][n],d=e.cells[o],h=F(o,r.paths),g=2*Math.PI/u[t-i].length,_=t*r.cellSize+l,p=_+r.cellSize,T=g*n,O=T+g,[[E,z],[R,$]]=[T,O].map((e=>[Math.cos(e),Math.sin(e)].map((e=>s+_*e)))),[[m,S],[y,L]]=[T,O].map((e=>[Math.cos(e),Math.sin(e)].map((e=>s+p*e))));if(0==(d&a.BOTTOM)&&(f+=`M${E},${z}A${_},${_},0,0,1,${R},${$}`),0==(d&a.LEFT)&&(f+=`M${E},${z}L${m},${S}`),0==(d&a.RIGHT)&&(f+=`M${R},${$}L${y},${L}`),t===u.length+i-1&&(f+=`M${m},${S}A${p},${p},0,0,1,${y},${L}`),h){let e=`M${E},${z}A${_},${_},0,0,1,${R},${$}L${y},${L}A${p},${p},0,0,0,${m},${S}z`;c[h]=(c[h]||"")+e}}const d=r.h;return d("svg",{stroke:"currentColor",fill:"none",width:`${o}px`,height:`${o}px`,viewBox:`0 0 ${o} ${o}`},Object.entries(c).map((([e,t])=>d("path",{d:t,fill:n[e],key:e,strokeWidth:"0"}))),d("path",{d:f,strokeWidth:`${r.lineWidth}px`,strokeLinecap:"round"}))},_supported_boards:["circular"]}),rectangularSvg:Object.freeze({__proto__:null,render:function(e,t={}){let r={...H,...t},i=B(r.paths,r.colors);const l=r.cellSize*(e.size.width+2)+r.lineWidth,s=r.cellSize*(e.size.height+2)+r.lineWidth;let u={},c="";e.cells.forEach(((t,i)=>{const{x:l,y:s}=o(i,{size:e.size}),a=l*r.cellSize+r.lineWidth/2+r.cellSize,f=s*r.cellSize+r.lineWidth/2+r.cellSize,d=F(i,r.paths);if(0==(t&n.TOP)&&(c+=`M${a},${f}H${a+r.cellSize}`),0==(t&n.RIGHT)&&(c+=`M${a+r.cellSize},${f}V${f+r.cellSize}`),0==(t&n.BOTTOM)&&(c+=`M${a},${f+r.cellSize}H${a+r.cellSize}`),0==(t&n.LEFT)&&(c+=`M${a},${f}V${f+r.cellSize}`),d){let e=`M${a},${f}H${a+r.cellSize}V${f+r.cellSize}H${a}z`;u[d]=(u[d]||"")+e}}));const a=r.h;return a("svg",{stroke:"currentColor",fill:"none",width:`${l}px`,height:`${s}px`,viewBox:`0 0 ${l} ${s}`},Object.entries(u).map((([e,t])=>a("path",{d:t,fill:i[e],key:e,strokeWidth:"0"}))),a("path",{d:c,strokeWidth:`${r.lineWidth}px`,strokeLinecap:"round"}))},_supported_boards:["rectangular"]})};const V=["svg","path","circle","line","rect"];function q(e,t){if("string"==typeof t||"number"==typeof t)e.innerHTML+=t.toString();else if(t instanceof Node)e.appendChild(t);else if(Array.isArray(t))for(const r of t)q(e,r)}function J(e,t,...r){let n;if(n=V.includes(e)?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e),t)for(const e of Object.keys(t))"boolean"!=typeof t[e]?n.setAttribute(x(e),t[e]):t[e]&&n.setAttribute(x(e),"");for(const e of r)q(n,e);return n}let K=Array.from(document.querySelectorAll("[data-maze]"));for(let e of K){let t=JSON.parse(e.dataset.maze||"{}");if("rectangular"===t.board){let r=i({width:t.size[0],height:t.size[1]});t.generator&&W[t.generator]&&(r=W[t.generator].generate(r,f));let n=D.rectangularSvg.render(r,{...t,h:J});e.appendChild(n)}else if("circular"===t.board){let r=h({radius:t.size[0],innerRadius:t.size[1]});if(t.generator&&W[t.generator]){r=W[t.generator].generate(r,z);let n=D.circularSvg.render(r,{...t,h:J});e.appendChild(n)}}e.style.removeProperty("height"),e.style.marginLeft="auto",e.style.marginRight="auto"}}));

//# sourceMappingURL=index.js.map
