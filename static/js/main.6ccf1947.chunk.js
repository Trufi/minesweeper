(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,function(e,n,t){e.exports={cell:"cell_cell__1VF6U",predicted:"cell_predicted__1xoPs",unknown:"cell_unknown__1FzQ7",marked:"cell_marked__2JA7p",mine:"cell_mine__1EGUU","number-1":"cell_number-1__112oq","number-2":"cell_number-2__2f9qc","number-3":"cell_number-3__2A-96","number-4":"cell_number-4__1a4f3","number-5":"cell_number-5__2kNM0"}},,,,function(e,n,t){e.exports={container:"app_container__GX8ug",header:"app_header__1-qxS",fieldWrapper:"app_fieldWrapper__F52kr",field:"app_field__l7T4B",lose:"app_lose__3bcQe",win:"app_win__XkiB6"}},function(e,n,t){e.exports={container:"settings_container__3wBNz",center:"settings_center__1etCf",label:"settings_label__25fRd",input:"settings_input__26gbE"}},,,,,,,,,,,,function(e,n,t){e.exports=t(37)},,,,,,function(e,n,t){},,,,,,function(e,n){},function(e,n){},function(e,n){},function(e,n){},function(e,n){},function(e,n){},function(e,n,t){"use strict";t.r(n);var a=t(9),r=t.n(a),c=t(14),o=t(1),i=t.n(o),l=t(10),u=t.n(l),s=(t(25),t(3)),d=function(){return Math.round(2147483647*Math.random())},m=function(e){return[e=16807*e%2147483647,(e-1)/2147483646]},f=function(e,n,t){return n>=0&&n<e[0]&&t>=0&&t<e[1]},p=function(e,n,t){var a=e.field,r=e.size,c=e.win,o=e.lose;if(!c&&!o&&f(r,n,t)){var i=a[t][n];if(!i.marked){switch(i.type){case"empty":v(e,n,t);break;case"mine":h(e,i)}y(e)}}},v=function e(n,t,a){var r=n.field,c=n.size;if(f(c,t,a)){var o=r[a][t];"mine"===o.type||o.opened||(o.opened=!0,0===o.number&&(e(n,t+1,a+1),e(n,t+1,a-1),e(n,t+1,a),e(n,t-1,a),e(n,t-1,a+1),e(n,t-1,a-1),e(n,t,a+1),e(n,t,a-1)))}},h=function(e,n){e.lose=!0,n.opened=!0},y=function(e){var n=e.lose,t=e.field,a=e.size;if(!n){for(var r=0;r<a[1];r++)for(var c=0;c<a[0];c++){var o=t[r][c];if("empty"===o.type&&!o.opened)return}e.win=!0}},b=function(e,n,t,a){if(f(n,t,a)){var r=e[a][t];"mine"!==r.type&&r.number++}},_=function(e,n,t){var a=function(e){for(var n=[],t=0;t<e[1];t++){n[t]=[];for(var a=0;a<e[0];a++)n[t][a]={type:"empty",x:a,y:t,number:0,opened:!1,marked:!1}}return n}(n),r=function(e,n,t){var a,r=new Set,c=[];t=Math.min(t,n[0]*n[1]);for(var o=0;o<t;){var i=m(e),l=Object(s.a)(i,2);e=l[0],a=l[1];var u=Math.floor(a*n[0]),d=m(e),f=Object(s.a)(d,2);e=f[0],a=f[1];var p=Math.floor(a*n[1]),v="".concat(u,"_").concat(p);r.has(v)||(r.add(v),c.push({type:"mine",x:u,y:p,opened:!1,marked:!1}),o++)}return[e,c]}(e,n,t),c=Object(s.a)(r,2)[1];return c.forEach(function(e){return function(e,n,t){var a=t.x,r=t.y;e[r][a]=t;for(var c=-1;c<=1;c++)for(var o=-1;o<=1;o++)0===c&&0===o||b(e,n,a+c,r+o)}(a,n,e)}),{field:a,size:n,minesCount:t,mines:c,lose:!1,win:!1}},E=function(e,n){return{type:"newGame",size:e,minesCount:n}},k=t(5),x=t(11),w=t.n(x),g=t(2),C=t.n(g),z=function(e){var n=e.cell,t=e.onClick,a=e.onMarked,r=function(e){e.preventDefault(),a&&a()};if("empty"===n.type){var c=Math.min(n.number,5);return i.a.createElement("div",{className:w()(C.a.cell,C.a.empty,C.a["number-".concat(c)],Object(k.a)({},C.a.predicted,n.predicted)),onContextMenu:r},0!==n.number?n.number:"")}return"mine"===n.type?i.a.createElement("div",{className:w()(C.a.cell,C.a.mine,Object(k.a)({},C.a.predicted,n.predicted)),onContextMenu:r},"X"):n.marked?i.a.createElement("div",{className:w()(C.a.cell,C.a.unknown,C.a.marked,Object(k.a)({},C.a.predicted,n.predicted)),onClick:t,onContextMenu:r}):i.a.createElement("div",{className:w()(C.a.cell,C.a.unknown,Object(k.a)({},C.a.predicted,n.predicted)),onClick:t,onContextMenu:r})},M=t(6),N=t.n(M),j=t(16),O=t(7),S=t.n(O),F=function(e){var n=e.size,t=e.minesCount,a=e.onSubmit,r=Object(o.useState)({size:n[0],minesCount:t}),c=Object(s.a)(r,2),l=c[0],u=c[1];return i.a.createElement("div",{className:S.a.container},i.a.createElement("div",{className:S.a.center},i.a.createElement("div",{className:S.a.label},"Size:"," ",i.a.createElement("input",{className:S.a.input,type:"number",value:l.size,onChange:function(e){return u(Object(j.a)({},l,{size:Math.min(Number(e.target.value),50)}))}})),i.a.createElement("div",{className:S.a.label},"Mines:"," ",i.a.createElement("input",{className:S.a.input,type:"number",value:l.minesCount,onChange:function(e){return u(Object(j.a)({},l,{minesCount:Math.min(Number(e.target.value),500)}))}})),i.a.createElement("button",{onClick:function(){return a([l.size,l.size],l.minesCount)}},"Submit")))},B=function(e){var n=e.game,t=e.dispatch,a=Object(o.useState)(!1),r=Object(s.a)(a,2),c=r[0],l=r[1],u=n.win||n.lose?n.field:function(e){for(var n=e.field,t=e.size,a=[],r=0;r<t[1];r++){a[r]=[];for(var c=0;c<t[0];c++){var o=n[r][c];o.opened?a[r][c]=o:a[r][c]={type:"unknown",x:c,y:r,marked:o.marked}}}return a}(n),d=[];u.forEach(function(e){return e.forEach(function(e){return d.push(e)})});var m=Math.min(500,window.innerWidth),f=Math.floor(m/n.size[0]);return i.a.createElement("div",{className:N.a.container,style:{width:m}},i.a.createElement("div",{className:N.a.header},i.a.createElement("div",null,"Size: ",n.size[0],"x",n.size[1],", mines: ",n.minesCount),i.a.createElement("div",null,i.a.createElement("button",{onClick:function(){return l(!c)}},"Settings"))),i.a.createElement("div",{className:N.a.fieldWrapper,style:{height:m}},i.a.createElement("div",{className:N.a.field,style:{gridTemplateColumns:"repeat(".concat(n.size[0],", 50px)"),transform:"scale(".concat(f/50,")")}},d.map(function(e){return i.a.createElement(z,{key:"".concat(e.x,"_").concat(e.y),cell:e,onClick:function(){return t((n=e.x,a=e.y,{type:"openCell",x:n,y:a}));var n,a},onMarked:function(){return t((n=e.x,a=e.y,{type:"markCell",x:n,y:a}));var n,a}})})),c&&i.a.createElement(F,{size:n.size,minesCount:n.minesCount,onSubmit:function(e,n){t(E(e,n)),l(!1)}})),n.lose&&i.a.createElement("div",{onClick:function(){return t(E(n.size,n.minesCount))},className:N.a.lose},"WASTED"),n.win&&i.a.createElement("div",{onClick:function(){return t(E(n.size,n.minesCount))},className:N.a.win},"WIN!"))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var D=function(e){return"".concat(e.x,"_").concat(e.y)},W=function(e){var n=e.data,t=n.size,a=n.field,r=n.mines,c=new Set;r.forEach(function(e){return c.add(D(e))});var o=[];a.forEach(function(e){return e.forEach(function(e){e.marked=c.has(D(e)),o.push(e)})});var l=Math.floor(200/t[0]);return i.a.createElement("div",null,i.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(".concat(t[0],", 50px)"),transformOrigin:"top left",transform:"scale(".concat(l/50,")"),width:"".concat(200,"px"),height:"".concat(200,"px"),margin:"5px"}},o.map(function(e){return i.a.createElement(z,{key:"".concat(e.x,"_").concat(e.y),cell:e})})))},T=function(e){var n=e.data;return i.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, 205px)"}},n.map(function(e,n){return i.a.createElement(W,{key:n,data:e})}))},A=function(e,n){var t,a=_(d(),e,n),r=0,c=0;do{var o=[Math.floor(Math.random()*e[0]),Math.floor(Math.random()*e[1])],i=Object(s.a)(o,2);r=i[0],c=i[1],t=a.field[c][r]}while("empty"!==t.type||0!==t.number);p(a,r,c);for(var l=a.mines.filter(function(e){return I(e,a.field,a.size)}),u=[],m=0;m<e[1];m++){u[m]=[];for(var f=0;f<e[0];f++){var v=a.field[m][f];v.opened?u[m][f]=v:u[m][f]={type:"unknown",x:f,y:m,marked:v.marked}}}return{field:u,mines:l,size:e}},I=function(e,n,t){var a=e.x,r=e.y,c=function(e,a){return!!f(t,e,a)&&n[a][e].opened};return c(a+1,r+1)||c(a+1,r)||c(a+1,r-1)||c(a,r+1)||c(a,r-1)||c(a-1,r+1)||c(a-1,r)||c(a-1,r-1)},G=t(4),X=function(e,n){var t=G.a([e.length,n[1],n[0],11]);return e.forEach(function(e,n){e.field.forEach(function(e){return e.forEach(function(e){"empty"===e.type?t.set(1,n,e.y,e.x,e.number):"unknown"===e.type&&t.set(1,n,e.y,e.x,9)})})}),t.toTensor().as2D(e.length,n[1]*n[0]*11)},q=function(e,n){var t=G.a([e.length,n[1],n[0],11]);return e.forEach(function(e,n){e.mines.forEach(function(e){t.set(1,n,e.y,e.x,10)})}),t.toTensor().as2D(e.length,n[1]*n[0]*11)},J=[10,10],R=G.c();R.add(G.b.dense({units:2500,activation:"relu",inputShape:[J[1]*J[0]*11]})),R.add(G.b.dense({units:2e3,activation:"relu"})),R.add(G.b.dense({units:1500,activation:"relu"})),R.add(G.b.dense({units:J[0]*J[1]*11,activation:"softmax"})),R.summary(),R.compile({optimizer:"rmsprop",loss:"categoricalCrossentropy",metrics:["accuracy"]});var U=function(e){return e.map(function(e,n){return n%10===0?"\n".concat(e.toFixed(1)):"".concat(e.toFixed(1))}).join(" ")},P=function(e){for(var n=[],t=0;t<e;t++)n.push(A(J,10));console.log("Created ".concat(e," data"));var a=X(n,J),r=q(n,J);return console.log("Converted ".concat(e," data")),[a,r]},Q=function(){var e=Object(c.a)(r.a.mark(function e(){var n,t,a,c,o,i;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=P(2048),t=P(4096),a=Object(s.a)(t,2),c=a[0],o=a[1],e.next=4,R.fit(c,o,{epochs:1,batchSize:32,validationData:n,yieldEvery:"epoch",callbacks:{onEpochEnd:function(e,n){n&&console.log("Epoch: ".concat(e,"\nloss: ").concat(n.loss.toFixed(3),"\nacc: ").concat(n.acc.toFixed(3),"\nval_loss: ").concat(n.val_loss.toFixed(3),"\nacc_loss: ").concat(n.val_acc.toFixed(3)))}}});case 4:return i=e.sent,n[0].dispose(),n[1].dispose(),c.dispose(),o.dispose(),e.abrupt("return",i);case 10:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),V=function(){return G.d(function(){var e=A(J,10),n=[e],t=X(n,J),a=q(n,J),r=R.predict(t);console.log("RealX",U(Array.from(Y(t,1).dataSync()))),console.log("RealY",U(Array.from(Y(a,10).dataSync())));var c=Array.from(Y(r,10).dataSync());console.log("Predict",U(c));var o=0,i=0;c.forEach(function(e,n){e>o&&(o=e,i=n)});var l=Math.floor(i/J[0]),u=i-l*J[1];return e.field[l][u].predicted=!0,{data:e}})},Y=function(e,n){var t=e.as4D(e.shape[0],J[1],J[0],11),a=t.slice([0,0,0,0],[1,t.shape[1],t.shape[2],t.shape[3]]).as3D(t.shape[1],t.shape[2],t.shape[3]);return a.slice([0,0,n],[a.shape[0],a.shape[1],1]).as2D(a.shape[0],a.shape[1])},$=function(){var e=_(5,[10,10],15),n=function(){u.a.render(i.a.createElement(B,{game:e,dispatch:t}),document.getElementById("root"))},t=function(t){switch(t.type){case"openCell":p(e,t.x,t.y);break;case"markCell":!function(e,n,t){var a=e.win,r=e.lose,c=e.field,o=e.size;if(!a&&!r&&f(o,n,t)){var i=c[t][n];i.marked=!i.marked}}(e,t.x,t.y);break;case"newGame":e=_(d(),t.size,t.minesCount)}n()};n()},H=function(){for(var e=[],n=0;n<20;n++)e.push(A([10,10],15));u.a.render(i.a.createElement(T,{data:e}),document.getElementById("root"))};Object(c.a)(r.a.mark(function e(){var n,t,a,c,o;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("test"!==window.location.search.slice(1)){e.next=4;break}H(),e.next=21;break;case 4:if("ml"!==window.location.search.slice(1)){e.next=20;break}n=[],t=0,t=0;case 8:if(!(t<50)){e.next=17;break}return e.next=11,Q();case 11:for(n[t]=[],a=0;a<3;a++)c=V(),o=c.data,n[t].push(o);u.a.render(i.a.createElement("div",null,n.map(function(e,n){return i.a.createElement("div",{key:n},i.a.createElement("div",null,"Epoch: ",n),i.a.createElement(T,{data:e}))})),document.getElementById("root"));case 14:t++,e.next=8;break;case 17:setInterval(function(){var e=V().data;n[t-1].push(e),u.a.render(i.a.createElement("div",null,n.map(function(e,n){return i.a.createElement("div",{key:n},i.a.createElement("div",null,"Epoch: ",n),i.a.createElement(T,{data:e}))})),document.getElementById("root"))},500),e.next=21;break;case 20:$();case 21:case"end":return e.stop()}},e)}))(),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[19,1,2]]]);
//# sourceMappingURL=main.6ccf1947.chunk.js.map