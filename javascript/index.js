!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";function e(e){return 0==(128&e)}function t(t,r){return!e(t)||0==(t&1<<r)}function r(t,r,n,i,l,o){let s=n.cells.slice(0);const c=l(t,r,n),u=i(c);return e(s[t])&&(s[t]=o(s[t],c)),e(s[r])&&(s[r]=o(s[r],u)),{...n,cells:s}}var n;!function(e){e[e.TOP=1]="TOP",e[e.RIGHT=2]="RIGHT",e[e.BOTTOM=4]="BOTTOM",e[e.LEFT=8]="LEFT"}(n||(n={}));const i=["height","width"];function l(e){return{cells:new Uint8Array(e.width*e.height),size:e}}function o({cells:e},t){return{cells:e,size:t}}function s(e,{size:t}){return e.y*t.width+e.x}function c(e,{size:t}){return{x:e%t.width,y:Math.floor(e/t.width)}}function u(e,{cells:t,size:r}){return t[s(e,{size:r})]}function a(e,t,{cells:r,size:n}){return r[s(e,{size:n})]=t}function h(e){return 15&(e<<2|e>>2)}function d(e,t,{size:r}){const i=c(e,{size:r}),l=c(t,{size:r});if(i.y>l.y)return n.TOP;if(i.x<l.x)return n.RIGHT;if(i.y<l.y)return n.BOTTOM;if(i.x>l.x)return n.LEFT;throw`'${i}' and '${l}' are not neighbours`}function f({x:e,y:t},r){let i={x:e,y:t};return r===n.TOP&&i.y--,r===n.RIGHT&&i.x++,r===n.BOTTOM&&i.y++,r===n.LEFT&&i.x--,i}function g({x:r,y:i},{cells:l,size:o},c=!0){let u=[];return i>0&&u.push(n.TOP),r<o.width-1&&u.push(n.RIGHT),i<o.height-1&&u.push(n.BOTTOM),r>0&&u.push(n.LEFT),u.filter((n=>{const u=s(f({x:r,y:i},n),{size:o}),a=s({x:r,y:i},{size:o}),g=l[u];return(!c||!function(e,r,n,i,l){const o=i(e,r,n),s=l(o);return t(n.cells[e],o)&&t(n.cells[r],s)}(u,a,{cells:l,size:o},d,h))&&e(g)})),u}function p({cells:t,size:r}){return Array.from(t).map(((e,t)=>t)).reduce(((e,t,n)=>(n%r.width==0&&e.push([]),e[e.length-1].push(t),e)),[]).map((r=>r.filter((r=>e(t[r]))))).filter((e=>e.length))}function _(e,t,n){return r(e,t,n,h,d,((e,t)=>e|t))}function $(e,t,n){return r(e,t,n,h,d,((e,t)=>e&~t))}var z=Object.freeze({__proto__:null,get Direction(){return n},_size_params:i,newBoard:l,newFromBaseBoard:o,toIndex:s,toPosition:c,getCellByPosition:u,setCellByPosition:a,getOpposingDirection:h,getRelativeDirection:d,getRelativePosition:f,getNeighbours:function(t,{cells:r,size:n}){let i=[];return t>=n.width&&i.push(t-n.width),(t+1)%n.width!=0&&i.push(t+1),t<r.length-n.width&&i.push(t+n.width),t%n.width!=0&&i.push(t-1),i=i.filter((t=>e(r[t]))),i},getAllowedDirection:g,getRows:p,removeInterWall:_,setInterWall:$});var T,O=Object.freeze({__proto__:null,getNeighbours:function(t,{cells:r,size:n}){let i=[];if(t>=n.width){10==(15&r[t-n.width])&&t-n.width>=n.width?i.push(t-n.width-n.width):i.push(t-n.width)}if((t+1)%n.width!=0){5==(15&r[t+1])&&(t+2)%n.width!=0?i.push(t+2):i.push(t+1)}if(t<r.length-n.width){10==(15&r[t+n.width])&&t+n.width<r.length-n.width?i.push(t+n.width+n.width):i.push(t+n.width)}if(t%n.width!=0){5==(15&r[t-1])&&(t-1)%n.width!=0?i.push(t-2):i.push(t-1)}return i=i.filter((t=>e(r[t]))),i},get Direction(){return n},_size_params:i,newBoard:l,newFromBaseBoard:o,toIndex:s,toPosition:c,getCellByPosition:u,setCellByPosition:a,getOpposingDirection:h,getRelativeDirection:d,getRelativePosition:f,getAllowedDirection:g,getRows:p,removeInterWall:_,setInterWall:$});!function(e){e[e.TOP_CW=1]="TOP_CW",e[e.TOP_CCW=2]="TOP_CCW",e[e.RIGHT=4]="RIGHT",e[e.BOTTOM=8]="BOTTOM",e[e.LEFT=16]="LEFT"}(T||(T={}));function E(e){return Array.from(e).reduce(((e,t)=>e+t),0)}function S({radius:e,innerRadius:t=3}){const r=E(m(e).slice(t));return{cells:new Uint8Array(r),size:{innerRadius:t,radius:e}}}function w(e){switch(e){case T.TOP_CCW:case T.TOP_CW:return T.BOTTOM;case T.RIGHT:return T.LEFT;case T.LEFT:return T.RIGHT}return T.TOP_CW&T.TOP_CCW}function R(e,t,{size:r}){const n=y(e,{size:r}),i=y(t,{size:r});if(n.r-1===i.r)return T.BOTTOM;if(n.r===i.r&&n.t+1===i.t)return T.RIGHT;if(n.r===i.r&&n.t<i.t&&0===n.t)return T.LEFT;if(n.r===i.r&&n.t-1===i.t)return T.LEFT;if(n.r===i.r&&n.t>i.t&&0===i.t)return T.RIGHT;if(n.r+1===i.r&&e%2==0)return T.TOP_CW;if(n.r+1===i.r&&e%2==1)return T.TOP_CCW;throw`'${n}' and '${i}' are not neighbours`}function m(e){let t=[1],r=[0];for(let n=1;n<e;++n)t[n]=t[n-1],2*Math.PI*n/t[n-1]>2&&(t[n]*=2),r[n]=r[n-1]+t[n-1];return t}function M(e,{size:t}){return E(m(t.innerRadius+e.r).slice(t.innerRadius))+e.t}function y(e,{size:t}){const r=m(t.radius).slice(t.innerRadius).reduce(((e,t)=>(e.push(e[e.length-1]+t),e)),[0]),n=r.findIndex((t=>t>e));return{r:n-1,t:e-r[n-1]}}function L({size:e}){const t=m(e.radius).slice(e.innerRadius);let r=0,n=[];for(let e of t)n.push(Array.from(new Array(e),((e,t)=>r+t))),r+=e;return n}var P=Object.freeze({__proto__:null,get Direction(){return T},_size_params:["radius","innerRadius"],newBoard:S,newFromBaseBoard:function({cells:e},t){return{cells:e,size:t}},getCell:function(e,{cells:t,size:r}){return t[M(e,{size:r})]},setCell:function(e,t,{cells:r,size:n}){return r[M(e,{size:n})]=t},getOpposingDirection:w,getRelativeDirection:R,getRingNodeCount:m,toIndex:M,toPosition:y,getRows:L,getNeighbours:function(e,{size:t}){const r=m(t.radius).slice(t.innerRadius),n=r.reduce(((e,t)=>(e.push(e[e.length-1]+t),e)),[0]),i=n.findIndex((t=>t>e))-1,l=e-n[i];let o=[];if(i<t.radius-t.innerRadius-1)if(r[i]<r[i+1]){const e=M({r:i+1,t:2*l},{size:t});o.push(e),o.push(e+1)}else{const e=M({r:i+1,t:l},{size:t});o.push(e)}if(l>0?o.push(e-1):o.push(e+r[i]-1),i>0){let e;e=r[i]>r[i-1]?M({r:i-1,t:Math.floor(l/2)},{size:t}):M({r:i-1,t:l},{size:t}),o.push(e)}return l<r[i]-1?o.push(e+1):o.push(e-r[i]+1),o},removeInterWall:function(e,t,n){return r(e,t,n,w,R,((e,t)=>e|t))}});function C(e,t){var r;return null===(r=Object.entries(t).find((([t,r])=>r.has(e))))||void 0===r?void 0:r[1]}function v(e,t){var r;return null===(r=Object.entries(t).find((([t,r])=>r.has(e))))||void 0===r?void 0:r[0]}function b(e,t){let r=Object.keys(t).reduce(((e,t)=>e>+t?e:+t),0),n=e instanceof Set?e:new Set([e]);return t[+r+1]=n,[(+r+1).toString(),n]}function G(e,t,r){var n,i;const l=Object.fromEntries(Object.entries(r).map((([e,t])=>[e,new Set(t)]))),o=v(e,l),s=v(t,l);return o||s?o?s?l[o]!=l[s]&&(l[o].size>l[s].size?(l[s].forEach((e=>l[o].add(e))),delete l[s]):(l[o].forEach((e=>l[s].add(e))),delete l[o])):null===(i=l[o])||void 0===i||i.add(t):null===(n=l[s])||void 0===n||n.add(e):b(new Set([e,t]),l),l}function W(e,t,r){const n=C(e,r),i=C(t,r);return!!n&&!!i&&n==i}var I,A=Object.freeze({__proto__:null,getItemSet:C,getItemSetKey:v,addItemSet:b,joinItemSets:G,isFromSameSet:W});function x(e){let t=e.slice(0);for(let e=t.length;e>0;e--){const r=Math.floor(Math.random()*e),n=t[e-1];t[e-1]=t[r],t[r]=n}return t}function B(e,t){let r=new Set(e);for(let e of t)r.delete(e);return r}function j(e){return e[F(e)]}function F(e){return Math.round(Math.random()*(e.length-1))}!function(e){e[e.RESET_MOVES=0]="RESET_MOVES",e[e.CREATE_CELL_GROUP=1]="CREATE_CELL_GROUP",e[e.MERGE_CELL_GROUP=2]="MERGE_CELL_GROUP",e[e.APPEND_CELL_GROUP=3]="APPEND_CELL_GROUP",e[e.POP_CELL_GROUP=4]="POP_CELL_GROUP",e[e.CLEAR_CELL_GROUPS=5]="CLEAR_CELL_GROUPS"}(I||(I={}));function N(e,t,r,n,i,l,o){for(let s=1;s<e.length;s++){if(null==C(e[s-1],i)){let[t,r]=b(e[s-1],i);o.register(o.Type.CREATE_CELL_GROUP,{id:t,cell:e[s-1]})}if(null==C(e[s],i)){let[t,r]=b(e[s],i);o.register(o.Type.CREATE_CELL_GROUP,{id:t,cell:e[s]})}l.getNeighbours(e[s-1],n).includes(e[s])&&(W(e[s-1],e[s],i)||(Math.random()>l.getFactor(t)||r)&&(n=l.removeInterWall(e[s-1],e[s],n),i=G(e[s-1],e[s],i),o.register(o.Type.MERGE_CELL_GROUP,{cell1:e[s-1],cell2:e[s]})))}return[n,i]}function U(e,t,r,n,i,l){for(let[o,s]of Object.entries(n)){let n=Array.from(s).filter((t=>e.includes(t)));n=x(n);let c=1+Math.round(Math.random()*(n.length-1)),u=[];for(let e=0;e<c;e++){const l=n[e],o=j(i.getNeighbours(l,r).filter((e=>t.includes(e))));null!=o&&u.push([l,o])}u.sort(((e,t)=>e[0]-t[0]));for(let[e,t]of u)r=i.removeInterWall(e,t,r),s.add(t),l.register(l.Type.APPEND_CELL_GROUP,{id:o,cell:t,neighbourCell:e})}return[r,n]}function k(e,t,r,n,i){for(let[l,o]of Object.entries(n)){let n=Array.from(o).filter((t=>e.includes(t)));n=x(n);let l=j(n);if(null==l)continue;const s=j(i.getNeighbours(l,r).filter((e=>t.includes(e))));null!=s&&(r=i.removeInterWall(l,s,r),o.add(s))}return[r,n]}var H={aldousBroder:Object.freeze({__proto__:null,_required_fns:["removeInterWall","getNeighbours"],generate:function(e,t,r={register:(...e)=>{},Type:I}){r.register(r.Type.RESET_MOVES);let n=new Set,i=F(e.cells);for(n.add(i);n.size<e.cells.length;){const r=t.getNeighbours(i,e);let l=r[Math.round((r.length-1)*Math.random())];n.has(l)||(e=t.removeInterWall(l,i,e),n.add(l)),i=l}return e}}),backtrack:Object.freeze({__proto__:null,_required_fns:["removeInterWall","getNeighbours"],generate:function(t,r,n={register:(...e)=>{},Type:I}){n.register(n.Type.RESET_MOVES);let i=Array.from(t.cells).map(((e,t)=>t)).filter((t=>e(t))),l=new Set,o=j(i);l.add(o);let s=[o];for(n.register(n.Type.CREATE_CELL_GROUP,{id:0,cell:o});0!==s.length;){o=s[s.length-1];const e=r.getNeighbours(o,t).filter((e=>!l.has(e)));if(e.length>0){let i=j(e);l.add(i),t=r.removeInterWall(o,i,t),s.push(i),n.register(n.Type.APPEND_CELL_GROUP,{id:0,cell:i,neighbourCell:o})}else{let e=s.pop();n.register(n.Type.POP_CELL_GROUP,{id:0,cell:e})}}return t}}),eller:Object.freeze({__proto__:null,_required_fns:["getRows","removeInterWall","getNeighbours"],generate:function(e,t,r={register:(...e)=>{},Type:I}){r.register(r.Type.RESET_MOVES);let n={getFactor:()=>.5,...t},i={};const l=n.getRows(e);for(let e of l[0]){let[t,n]=b(e,i);r.register(r.Type.CREATE_CELL_GROUP,{id:t,cell:e})}for(let t=0;t<l.length-1;t++){let o=l[t];[e,i]=N(o,t,!1,e,i,n,r),[e,i]=U(o,l[t+1],e,i,n,r)}return[e,i]=N(l[l.length-1],l.length-1,!0,e,i,n,r),r.register(r.Type.CLEAR_CELL_GROUPS),e},visitRow:N,connectToOtherRow:U}),kruskal:Object.freeze({__proto__:null,_required_fns:["removeInterWall","getNeighbours"],generate:function(t,r,n={register:(...e)=>{},Type:I}){n.register(n.Type.RESET_MOVES);let i={},l=new Set,o=0;for(let r=0;r<t.cells.length;r++){if(!e(t.cells[r]))continue;let[l,s]=b(r,i);n.register(n.Type.CREATE_CELL_GROUP,{id:l,cell:r}),o++}for(;l.size<o;){const o=F(t.cells);if(!e(t.cells[o]))continue;const s=j(r.getNeighbours(o,t).filter((r=>e(t.cells[r]))));W(o,s,i)||(t=r.removeInterWall(o,s,t),i=G(o,s,i),n.register(n.Type.MERGE_CELL_GROUP,{cell1:o,cell2:s}),l.add(o),l.add(s))}return n.register(n.Type.CLEAR_CELL_GROUPS),t}}),prim:Object.freeze({__proto__:null,_required_fns:["removeInterWall","getNeighbours"],generate:function(t,r,n={register:(...e)=>{},Type:I}){n.register(n.Type.RESET_MOVES);let i=new Set,l=j(t.cells.map(((e,t)=>t)).filter((r=>e(t.cells[r])))),o=new Set(r.getNeighbours(l,t));for(i.add(l);o.size>0;){l=j(Array.from(o));let e=new Set(r.getNeighbours(l,t));for(let n of e)if(i.has(n)){t=r.removeInterWall(n,l,t),o.delete(l),i.add(l),o=new Set([...o,...e]),o=B(o,i);break}}return t}}),sidewinder:Object.freeze({__proto__:null,_required_fns:["removeInterWall","getRows","getNeighbours"],generate:function(e,t,r={register:(...e)=>{},Type:I}){r.register(r.Type.RESET_MOVES);let n={getFactor:()=>Math.random(),...t},i=n.getRows(e),l={};n.getFactor||(n={...n},n.getFactor=()=>Math.random()),[e,l]=N(i[0],0,!0,e,l,n,r);for(let t=1;t<i.length;t++)[e,l]=N(i[t],t,!1,e,l,n,r),[e,l]=k(i[t],i[t-1],e,l,n);return e},connectToOtherRow:k}),_pathSet:A};const D=new Map([["className","class"],["viewBox","view=Box"]]);function V(e){return D.has(e)&&(e=D.get(e)),e.split("").map(((t,r)=>"="===t?"":t.toUpperCase()===t&&"="!==e[r-1]?`${0!==r?"-":""}${t.toLowerCase()}`:t)).join("")}function q(e,t,...r){let n=Object.entries(t||{}).map((([e,t])=>"boolean"==typeof t?V(e):`${V(e)}="${t}"`)).join(" "),i=r.map((e=>(null!=e?e:"").toString())).join("");return i?n?`<${e} ${n}>${i}</${e}>`:`<${e}>${i}</${e}>`:n?`<${e} ${n} />`:`<${e} />`}const J=["hsla(231deg, 45%, 75%, 0.5)"];function K(e){let t=Math.max(0,e-J.length);for(let e=0;e<t;e++)J.push(`hsla(${6*Math.round(60*Math.random())}deg, ${45+5*Math.round(4*Math.random())}%, ${55+5*Math.round(4*Math.random())}%, 0.5)`);return J}function Q(e,t){let r=K(Object.keys(e).length),n=0;for(let i in e)t[i]||(t[i]=r[n]),n++;return t}function X(e,t){for(let[r,n]of Object.entries(t))if(n.includes(e))return r}const Y={cellSize:30,lineWidth:2,paths:{},colors:{},h:q};const Z={cellSize:30,lineWidth:2,paths:{},colors:{},h:q};const ee={cellSize:22,lineWidth:2,shouldFillPath:!0,paths:{},colors:{default:"white"},cellGap:8,h:q};var te={circularSvg:Object.freeze({__proto__:null,render:function(e,t={}){let r={...Y,...t},n=Q(r.paths,r.colors);const i=e.size.innerRadius,l=(1-i)*r.cellSize*.75,o=2*(r.cellSize*(e.size.radius-e.size.innerRadius)+l+i*r.cellSize)+r.lineWidth+2*r.cellSize,s=o/2;let c=L(e),u={},a="";for(let t=i;t<c.length+i;t++)for(let n=0;n<c[t-i].length;n++){const o=c[t-i][n],h=e.cells[o],d=X(o,r.paths),f=2*Math.PI/c[t-i].length,g=t*r.cellSize+l,p=g+r.cellSize,_=f*n,$=_+f,[[z,O],[E,S]]=[_,$].map((e=>[Math.cos(e),Math.sin(e)].map((e=>s+g*e)))),[[w,R],[m,M]]=[_,$].map((e=>[Math.cos(e),Math.sin(e)].map((e=>s+p*e))));if(0==(h&T.BOTTOM)&&(a+=`M${z},${O}A${g},${g},0,0,1,${E},${S}`),0==(h&T.LEFT)&&(a+=`M${z},${O}L${w},${R}`),0==(h&T.RIGHT)&&(a+=`M${E},${S}L${m},${M}`),t===c.length+i-1&&(a+=`M${w},${R}A${p},${p},0,0,1,${m},${M}`),d){let e=`M${z},${O}A${g},${g},0,0,1,${E},${S}L${m},${M}A${p},${p},0,0,0,${w},${R}z`;u[d]=(u[d]||"")+e}}const h=r.h;return h("svg",{stroke:"currentColor",fill:"none",width:`${o}px`,height:`${o}px`,viewBox:`0 0 ${o} ${o}`},Object.entries(u).map((([e,t])=>h("path",{d:t,fill:n[e],key:e,strokeWidth:"0"}))),h("path",{d:a,strokeWidth:`${r.lineWidth}px`,strokeLinecap:"round"}))},_supported_boards:["circular"]}),rectangularSvg:Object.freeze({__proto__:null,render:function(e,t={}){let r={...Z,...t},i=Q(r.paths,r.colors);const l=r.cellSize*e.size.width+r.lineWidth,o=r.cellSize*e.size.height+r.lineWidth;let s={},u="";e.cells.forEach(((t,i)=>{const{x:l,y:o}=c(i,{size:e.size}),a=l*r.cellSize+r.lineWidth/2,h=o*r.cellSize+r.lineWidth/2,d=X(i,r.paths);if(0==(t&n.TOP)&&(u+=`M${a},${h}H${a+r.cellSize}`),0==(t&n.RIGHT)&&(u+=`M${a+r.cellSize},${h}V${h+r.cellSize}`),0==(t&n.BOTTOM)&&(u+=`M${a},${h+r.cellSize}H${a+r.cellSize}`),0==(t&n.LEFT)&&(u+=`M${a},${h}V${h+r.cellSize}`),d){let e=`M${a},${h}H${a+r.cellSize}V${h+r.cellSize}H${a}z`;s[d]=(s[d]||"")+e}}));const a=r.h;return a("svg",{stroke:"currentColor",fill:"none",width:`${l}px`,height:`${o}px`,viewBox:`0 0 ${l} ${o}`},Object.entries(s).map((([e,t])=>a("path",{d:t,fill:i[e],key:e,strokeWidth:"0"}))),a("path",{d:u,strokeWidth:`${r.lineWidth}px`,strokeLinecap:"round"}))},_supported_boards:["rectangular"]}),weaveSvg:Object.freeze({__proto__:null,render:function(e,t={}){let r={...ee,...t},i=Q(r.paths,r.colors);const l=(r.cellSize+r.cellGap/2+2*r.lineWidth)*e.size.width-2*r.lineWidth,o=(r.cellSize+r.cellGap/2+2*r.lineWidth)*e.size.height-2*r.lineWidth;let s={},u="",a="";e.cells.forEach(((t,i)=>{const{x:l,y:o}=c(i,{size:e.size}),h=l*(r.cellSize+r.cellGap)+r.lineWidth,d=o*(r.cellSize+r.cellGap)+r.lineWidth,f=X(i,r.paths);let g=0==(t&n.TOP),p=0==(t&n.RIGHT),_=0==(t&n.BOTTOM),$=0==(t&n.LEFT),z=$?0:-r.cellGap,T=p?0:r.cellGap,O=g?0:-r.cellGap,E=_?0:r.cellGap;g?u+=`M${h+z},${d}H${h+r.cellSize+T}`:(p||(u+=`M${h+r.cellSize},${d}h${r.cellGap}`),$||(u+=`M${h+z},${d}h${r.cellGap}`)),p?u+=`M${h+r.cellSize},${d+O}V${d+r.cellSize+E}`:(g||(u+=`M${h+r.cellSize},${d+O}v${r.cellGap}`),_||(u+=`M${h+r.cellSize},${d+r.cellSize}v${r.cellGap}`)),0==(t&n.BOTTOM)?u+=`M${h+z},${d+r.cellSize}H${h+r.cellSize+T}`:(p||(u+=`M${h+r.cellSize},${d+r.cellSize}h${r.cellGap}`),$||(u+=`M${h+z},${d+r.cellSize}h${r.cellGap}`)),0==(t&n.LEFT)?u+=`M${h},${d+O}V${d+r.cellSize+E}`:(g||(u+=`M${h},${d+O}v${r.cellGap}`),_||(u+=`M${h},${d+r.cellSize}v${r.cellGap}`)),z/=2,T/=2,O/=2,E/=2;let S=`M${h+z},${d+O}H${h+r.cellSize+T}V${d+r.cellSize+E}H${h+z}z`;a+=S,f&&(s[f]=(s[f]||"")+S)}));const h=r.h;return h("svg",{stroke:"currentColor",fill:"none",width:`${l}px`,height:`${o}px`,viewBox:`0 0 ${l} ${o}`},Object.entries(s).map((([e,t])=>h("path",{d:t,fill:i[e],key:e,strokeWidth:"0"}))),r.shouldFillPath&&h("path",{d:a,strokeWidth:"0",fill:i.default}),h("path",{d:u,strokeWidth:`${r.lineWidth}px`,strokeLinecap:"round"}))},_supported_boards:["weave"]})};const re=["svg","path","circle","line","rect"];function ne(e,t){if("string"==typeof t||"number"==typeof t)e.innerHTML+=t.toString();else if(t instanceof Node)e.appendChild(t);else if(Array.isArray(t))for(const r of t)ne(e,r)}function ie(e,t,...r){let n;if(n=re.includes(e)?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e),t)for(const e of Object.keys(t))"boolean"!=typeof t[e]?n.setAttribute(V(e),t[e]):t[e]&&n.setAttribute(V(e),"");for(const e of r)ne(n,e);return n}let le=Array.from(document.querySelectorAll("[data-maze]"));for(let e of le){let t=JSON.parse(e.dataset.maze||"{}");if("rectangular"===t.board){let r=l({width:t.size[0],height:t.size[1]});t.generator&&H[t.generator]&&(r=H[t.generator].generate(r,z));let n=te.rectangularSvg.render(r,{...t,h:ie});e.appendChild(n)}else if("weave"===t.board){let r=l({width:t.size[0],height:t.size[1]});t.generator&&H[t.generator]&&(r=H[t.generator].generate(r,O));let n=te.weaveSvg.render(r,{...t,shouldFillPath:!1,h:ie});e.appendChild(n)}else if("circular"===t.board){let r=S({radius:t.size[0],innerRadius:t.size[1]});if(t.generator&&H[t.generator]){r=H[t.generator].generate(r,P);let n=te.circularSvg.render(r,{...t,h:ie});e.appendChild(n)}}e.style.removeProperty("height"),e.style.marginLeft="auto",e.style.marginRight="auto"}}));

//# sourceMappingURL=index.js.map