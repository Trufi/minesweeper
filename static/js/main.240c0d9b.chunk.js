(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,function(e,n,t){e.exports={cell:"cell_cell__ctonx",unknown:"cell_unknown__2B9QE",marked:"cell_marked__3q6vG",mine:"cell_mine__MMPmy","number-1":"cell_number-1__3avDf","number-2":"cell_number-2__V4VtS","number-3":"cell_number-3__vepwY","number-4":"cell_number-4__2mAgX","number-5":"cell_number-5__1ODhQ"}},,function(e,n,t){e.exports={container:"app_container__1oZPj",header:"app_header__2jbYi",fieldWrapper:"app_fieldWrapper__w9j7M",field:"app_field__1STvU",lose:"app_lose__39hej",win:"app_win__1wp6G"}},function(e,n,t){e.exports={container:"settings_container__1gh9N",center:"settings_center__3peQ-",label:"settings_label__1TvNF",input:"settings_input__2UBOs"}},,,,,function(e,n,t){e.exports=t(16)},,,,,,function(e,n,t){},function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),i=t(8),o=t.n(i),c=(t(15),t(2)),l=function(e){return[e=16807*e%2147483647,(e-1)/2147483646]},u=function(e,n,t){return n>=0&&n<e[0]&&t>=0&&t<e[1]},s=function e(n,t,a){var r=n.field,i=n.size;if(u(i,t,a)){var o=r[a][t];"mine"===o.type||o.opened||(o.opened=!0,0===o.number&&(e(n,t+1,a+1),e(n,t+1,a-1),e(n,t+1,a),e(n,t-1,a),e(n,t-1,a+1),e(n,t-1,a-1),e(n,t,a+1),e(n,t,a-1)))}},m=function(e,n){e.lose=!0,n.opened=!0},f=function(e){var n=e.lose,t=e.field,a=e.size;if(!n){for(var r=0;r<a[1];r++)for(var i=0;i<a[0];i++){var o=t[r][i];if("empty"===o.type&&!o.opened)return}e.win=!0}},p=function(e,n,t,a){if(u(n,t,a)){var r=e[a][t];"mine"!==r.type&&r.number++}},d=function(e,n,t){var a=function(e){for(var n=[],t=0;t<e[1];t++){n[t]=[];for(var a=0;a<e[0];a++)n[t][a]={type:"empty",x:a,y:t,number:0,opened:!1,marked:!1}}return n}(n),r=function(e,n,t){var a,r=new Set,i=[];t=Math.min(t,n[0]*n[1]);for(var o=0;o<t;){var u=l(e),s=Object(c.a)(u,2);e=s[0],a=s[1];var m=Math.floor(a*n[0]),f=l(e),p=Object(c.a)(f,2);e=p[0],a=p[1];var d=Math.floor(a*n[1]),v="".concat(m,"_").concat(d);r.has(v)||(r.add(v),i.push({type:"mine",x:m,y:d,opened:!1,marked:!1}),o++)}return[e,i]}(e,n,t);return Object(c.a)(r,2)[1].forEach(function(e){return function(e,n,t){var a=t.x,r=t.y;e[r][a]=t;for(var i=-1;i<=1;i++)for(var o=-1;o<=1;o++)0===i&&0===o||p(e,n,a+i,r+o)}(a,n,e)}),{field:a,size:n,minesCount:t,lose:!1,win:!1}},v=function(e,n){return{type:"newGame",size:e,minesCount:n}},_=t(5),b=t.n(_),h=t(1),y=t.n(h),w=function(e){var n=e.size,t=e.cell,a=e.onClick,i=e.onMarked,o=function(e){e.preventDefault(),i()},c={fontSize:Math.round(.5*n),lineHeight:"".concat(n,"px"),width:n,height:n};if("empty"===t.type){var l=Math.min(t.number,5);return r.a.createElement("div",{className:b()(y.a.cell,y.a.empty,y.a["number-".concat(l)]),style:c,onContextMenu:o},0!==t.number?t.number:"")}return"mine"===t.type?r.a.createElement("div",{className:b()(y.a.cell,y.a.mine),style:c,onContextMenu:o},"X"):t.marked?r.a.createElement("div",{className:b()(y.a.cell,y.a.unknown,y.a.marked),style:c,onClick:a,onContextMenu:o}):r.a.createElement("div",{className:b()(y.a.cell,y.a.unknown),style:c,onClick:a,onContextMenu:o})},k=t(3),C=t.n(k),E=t(6),z=t(4),x=t.n(z),M=function(e){var n=e.size,t=e.minesCount,i=e.onSubmit,o=Object(a.useState)({size:n[0],minesCount:t}),l=Object(c.a)(o,2),u=l[0],s=l[1];return r.a.createElement("div",{className:x.a.container},r.a.createElement("div",{className:x.a.center},r.a.createElement("div",{className:x.a.label},"Size:"," ",r.a.createElement("input",{className:x.a.input,type:"number",value:u.size,onChange:function(e){return s(Object(E.a)({},u,{size:Math.min(Number(e.target.value),50)}))}})),r.a.createElement("div",{className:x.a.label},"Mines:"," ",r.a.createElement("input",{className:x.a.input,type:"number",value:u.minesCount,onChange:function(e){return s(Object(E.a)({},u,{minesCount:Math.min(Number(e.target.value),500)}))}})),r.a.createElement("button",{onClick:function(){return i([u.size,u.size],u.minesCount)}},"Submit")))},N=function(e){var n=e.game,t=e.dispatch,i=Object(a.useState)(!1),o=Object(c.a)(i,2),l=o[0],u=o[1],s=n.win||n.lose?n.field:function(e){for(var n=e.field,t=e.size,a=[],r=0;r<t[1];r++){a[r]=[];for(var i=0;i<t[0];i++){var o=n[r][i];o.opened?a[r][i]=o:a[r][i]={type:"unknown",x:i,y:r,marked:o.marked}}}return a}(n),m=[];s.forEach(function(e){return e.forEach(function(e){return m.push(e)})});var f=Math.min(500,window.innerWidth),p=Math.floor(f/n.size[0]);return r.a.createElement("div",{className:C.a.container,style:{width:f}},r.a.createElement("div",{className:C.a.header},r.a.createElement("div",null,"Size: ",n.size[0],"x",n.size[1],", mines: ",n.minesCount),r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return u(!l)}},"Settings"))),r.a.createElement("div",{className:C.a.fieldWrapper},r.a.createElement("div",{className:C.a.field,style:{gridTemplateColumns:"repeat(".concat(n.size[0],", ").concat(p,"px)")}},m.map(function(e){return r.a.createElement(w,{key:"".concat(e.x,"_").concat(e.y),size:p,cell:e,onClick:function(){return t((n=e.x,a=e.y,{type:"openCell",x:n,y:a}));var n,a},onMarked:function(){return t((n=e.x,a=e.y,{type:"markCell",x:n,y:a}));var n,a}})})),l&&r.a.createElement(M,{size:n.size,minesCount:n.minesCount,onSubmit:function(e,n){t(v(e,n)),u(!1)}})),n.lose&&r.a.createElement("div",{onClick:function(){return t(v(n.size,n.minesCount))},className:C.a.lose},"WASTED"),n.win&&r.a.createElement("div",{onClick:function(){return t(v(n.size,n.minesCount))},className:C.a.win},"WIN!"))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var g=d(5,[10,10],15),j=function(){o.a.render(r.a.createElement(N,{game:g,dispatch:S}),document.getElementById("root"))},S=function(e){switch(e.type){case"openCell":!function(e,n,t){var a=e.field,r=e.size,i=e.win,o=e.lose;if(!i&&!o&&u(r,n,t)){var c=a[t][n];switch(c.type){case"empty":s(e,n,t);break;case"mine":m(e,c)}f(e)}}(g,e.x,e.y);break;case"markCell":!function(e,n,t){var a=e.win,r=e.lose,i=e.field,o=e.size;if(!a&&!r&&u(o,n,t)){var c=i[t][n];c.marked=!c.marked}}(g,e.x,e.y);break;case"newGame":g=d(Math.round(2147483647*Math.random()),e.size,e.minesCount)}j()};j(),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[9,1,2]]]);
//# sourceMappingURL=main.240c0d9b.chunk.js.map