!function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(r,s,function(t){return e[t]}.bind(null,s));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){const r=n(6),s=n(8);function o(e,t){throw t.which=e,console.error('\nYou should listen on "socket.error" yourself to avoid those unhandled promise warnings.\n'),t}class i{constructor(){this._isCanceled=!1,this._message=""}isCanceled(){return this._isCanceled}cancel(){this._isCanceled=!0}getMessage(){return this._message}hasMessage(){return Boolean(this._message)}setMessage(e){this._message=String(e)}}e.exports={CQEventBus:class{constructor(e){this._EventMap={message:{"":[],private:[],group:{"":[],"@me":[]},discuss:{"":[],"@me":[]}},event:[],notice:{"":[],group_upload:[],group_admin:{"":[],set:[],unset:[]},group_decrease:{"":[],leave:[],kick:[],kick_me:[]},group_increase:{"":[],approve:[],invite:[]},friend_add:[]},request:{"":[],friend:[],group:{"":[],add:[],invite:[]}},ready:[],error:[],socket:{connecting:[],connect:[],failed:[],reconnecting:[],reconnect:[],reconnect_failed:[],max_reconnect:[],error:[],closing:[],close:[]},api:{response:[],send:{pre:[],post:[]}}},this._isSocketErrorHandled=!1,this._bot=e,this._installDefaultErrorHandler()}_getHandlerQueue(e){let t=r(this._EventMap,e);return Array.isArray(t)?t:(t=r(this._EventMap,`${e}.`),Array.isArray(t)?t:void 0)}count(e){let t=this._getHandlerQueue(e);return t?t.length:void 0}has(e){return void 0!==this._getHandlerQueue(e)}emit(e,...t){return this._emitThroughHierarchy(e,...t)}async _emitThroughHierarchy(e,...t){let n=[],r=e.startsWith("message");for(let t=e.split(".");t.length>0;t.pop()){let e=this._getHandlerQueue(t.join("."));e&&e.length>0&&n.push(...e)}if(n&&n.length>0){let e=new i;r&&Array.isArray(t)&&t.unshift(e);for(let s of n){let n=await Promise.resolve(s(...t));if(r&&"string"==typeof n&&e.setMessage(n),r&&e.isCanceled())break}r&&e.hasMessage()&&this._bot("send_msg",{...t[1],message:e.getMessage()})}}once(e,t){const n=(...r)=>{let s=t(...r);if(!1!==s)return this.off(e,n),s};return this.on(e,n)}off(e,t){if("string"!=typeof e)return s(this._EventMap,(e,t,n)=>{if(Array.isArray(e))return e.splice(0,e.length),!1}),this._installDefaultErrorHandler(),this;const n=this._getHandlerQueue(e);if(void 0===n)return this;if("function"!=typeof t)return n.splice(0,n.length),"socket.error"===e&&this._installDefaultErrorHandler(),this;const r=n.indexOf(t);return r>=0&&(n.splice(r,1),"socket.error"===e&&0===n.length&&this._installDefaultErrorHandler()),this}_installDefaultErrorHandler(){0===this._EventMap.socket.error.length&&(this._EventMap.socket.error.push(o),this._isSocketErrorHandled=!1)}_removeDefaultErrorHandler(){this._isSocketErrorHandled||(this._EventMap.socket.error.splice(0,this._EventMap.socket.error.length),this._isSocketErrorHandled=!0)}on(e,t){if(!this.has(e))return this;"socket.error"===e&&this._removeDefaultErrorHandler();let n=this._getHandlerQueue(e);return n&&n.push(t),this}},CQEvent:i}},function(e,t,n){const r=n(2),s=new URLSearchParams(window.location.search.substr(1)),o=new r({host:s.get("host")||"",port:s.get("port")||"",baseUrl:s.get("url")||"",qq:s.get("qq")||-1});o.on("message",function(e,{raw_message:t}){document.getElementById("messages").appendChild(document.createElement("div")).innerHTML=`\n    <span>${(new Date).toLocaleString()}</span><span style="margin-left:40px">${t}</span>\n  `}),o.connect()},function(e,t,n){const r=n(3).w3cwebsocket,s=n(0).CQEventBus,o=n(9),{SocketError:i,InvalidWsTypeError:c}=n(10),a={API:"/api",EVENT:"/event"},u={DISABLED:-1,INIT:0,CONNECTING:1,CONNECTED:2,CLOSING:3,CLOSED:4};function h(e,t){return e.includes(`[CQ:at,qq=${t}]`)}e.exports=class extends o{constructor({access_token:e="",enableAPI:t=!0,enableEvent:n=!0,host:r,port:o,baseUrl:i="127.0.0.1:6700",qq:c=-1,reconnection:a=!0,reconnectionAttempts:h=1/0,reconnectionDelay:l=1e3}={}){super("__call__"),this._token=String(e),this._qq=parseInt(c),this._baseUrl=r?`${r}${o?`:${o}`:""}`:i,this._reconnectOptions={reconnection:a,reconnectionAttempts:h,reconnectionDelay:l},this._monitor={EVENT:{attempts:0,state:n?u.INIT:u.DISABLED,reconnecting:!1},API:{attempts:0,state:t?u.INIT:u.DISABLED,reconnecting:!1}},this._eventBus=new s(this)}off(e,t){return this._eventBus.off(e,t),this}on(e,t){return this._eventBus.on(e,t),this}once(e,t){return this._eventBus.once(e,t),this}__call__(e,t){if(!this._apiSock)return;let n={action:e,params:t};return this._eventBus.emit("api.send.pre",a.API,n),this._apiSock.send(JSON.stringify(n)),this._eventBus.emit("api.send.post",a.API),this}_handle(e){switch(e.post_type){case"message":switch(e.message_type){case"private":this._eventBus.emit("message.private",e);break;case"discuss":h(e.raw_message,this._qq)?this._eventBus.emit("message.discuss.@me",e):this._eventBus.emit("message.discuss",e);break;case"group":h(e.raw_message,this._qq)?this._eventBus.emit("message.group.@me",e):this._eventBus.emit("message.group",e);break;default:this._eventBus.emit("error",new Error('[Message event] the message contains invalid "message_type" field'))}break;case"event":this._eventBus.emit("event",e);break;case"notice":switch(e.notice_type){case"group_upload":this._eventBus.emit("notice.group_upload",e);break;case"group_admin":switch(e.sub_type){case"set":this._eventBus.emit("notice.group_admin.set",e);break;case"unset":this._eventBus.emit("notice.group_admin.unset",e);break;default:this._eventBus.emit("notice.group_admin",e)}break;case"group_decrease":switch(e.sub_type){case"leave":this._eventBus.emit("notice.group_decrease.leave",e);break;case"kick":this._eventBus.emit("notice.group_decrease.kick",e);break;case"kick_me":this._eventBus.emit("notice.group_decrease.kick_me",e);break;default:this._eventBus.emit("notice.group_decrease",e)}break;case"group_increase":switch(e.sub_type){case"approve":this._eventBus.emit("notice.group_increase.approve",e);break;case"invite":this._eventBus.emit("notice.group_increase.invite",e);break;default:this._eventBus.emit("notice.group_increase",e)}break;case"friend_add":this._eventBus.emit("notice.friend_add",e);break;default:this._eventBus.emit("error",new Error('[Notice event] the message contains invalid "notice_type" field'))}break;case"request":switch(e.request_type){case"friend":this._eventBus.emit("request.friend",e);break;case"group":switch(e.sub_type){case"add":this._eventBus.emit("request.group.add",e);break;case"invite":this._eventBus.emit("request.group.invite",e);break;default:this._eventBus.emit("request.group",e)}break;default:this._eventBus.emit("error",new Error('[Request event] the message contains invalid "request_type" field'))}break;default:this._eventBus.emit("error",new Error(`The message received from CoolQ HTTP API plugin has invalid property 'post_type'.\n${JSON.stringify(e)}`))}}_forEachSock(e,t=[a.EVENT,a.API]){if(!Array.isArray(t)){if(![a.EVENT,a.API].includes(t))throw new c(wsType);t=[t]}t.forEach(t=>{e(t,t===a.EVENT?"EVENT":"API")})}isSockConnected(e){if(e===a.API)return this._monitor.API.state===u.CONNECTED;if(e===a.EVENT)return this._monitor.EVENT.state===u.CONNECTED;throw new c(e)}connect(e){return this._forEachSock((e,t)=>{if([u.INIT,u.CLOSED].includes(this._monitor[t].state)){const n=this._token?`?access_token=${this._token}`:"";let s=new r(`ws://${this._baseUrl}/${t.toLowerCase()}${n}`,void 0,{fragmentOutgoingMessages:!1});const o=t=>{e===a.EVENT?this._handle(JSON.parse(t.data)):this._eventBus.emit("api.response",a.API,JSON.parse(t.data))};e===a.EVENT?this._eventSock=s:this._apiSock=s,s.addEventListener("open",()=>{this._monitor[t].state=u.CONNECTED,this._eventBus.emit("socket.connect",a[t],s,this._monitor[t].attempts),this._monitor[t].reconnecting&&this._eventBus.emit("socket.reconnect",a[t],this._monitor[t].attempts),this._monitor[t].attempts=0,this._monitor[t].reconnecting=!1,this.isReady()&&this._eventBus.emit("ready",this)},{once:!0}),s.addEventListener("message",o),s.addEventListener("close",n=>{this._monitor[t].state=u.CLOSED,this._eventBus.emit("socket.close",a[t],n.code,n.reason),1e3!==n.code&&this._reconnectOptions.reconnection&&this.reconnect(this._reconnectOptions.reconnectionDelay,a[t]),s.removeEventListener("message",o),s=null,e===a.EVENT?this._eventSock=null:this._apiSock=null},{once:!0}),s.addEventListener("error",()=>{const e=this._monitor[t].state===u.CONNECTING?"Failed to establish the websocket connection.":this._monitor[t].state===u.CONNECTED?"The websocket connection has been hung up unexpectedly.":`Unknown error occured. Conection state: ${this._monitor[t].state}`;this._eventBus.emit("socket.error",a[t],new i(e)),this._monitor[t].state===u.CONNECTED?(this._monitor[t].state=u.CLOSING,this._eventBus.emit("socket.closing",a[t])):this._monitor[t].state===u.CONNECTING&&(this._monitor[t].state=u.CLOSED,this._eventBus.emit("socket.failed",a[t],this._monitor[t].attempts),this._monitor[t].reconnecting&&this._eventBus.emit("socket.reconnect_failed",a[t],this._monitor[t].attempts),this._monitor[t].reconnecting=!1,this._reconnectOptions.reconnection&&this._monitor[t].attempts<=this._reconnectOptions.reconnectionAttempts?this.reconnect(this._reconnectOptions.reconnectionDelay,a[t]):this._eventBus.emit("socket.max_reconnect",a[t],this._monitor[t].attempts))},{once:!0}),this._monitor[t].state=u.CONNECTING,this._monitor[t].attempts++,this._eventBus.emit("socket.connecting",e,this._monitor[t].attempts)}},e),this}disconnect(e){return this._forEachSock((e,t)=>{if(this._monitor[t].state===u.CONNECTED){const n=e===a.EVENT?this._eventSock:this._apiSock;this._monitor[t].state=u.CLOSING,n.close(1e3,"Normal connection closure"),this._eventBus.emit("socket.closing",e)}},e),this}reconnect(e=0,t){const n=(t,n)=>{setTimeout(()=>{this.connect(t)},e)};return this._forEachSock((e,t)=>{if(!this._monitor[t].reconnecting)switch(this._monitor[t].state){case u.CONNECTED:this._monitor[t].reconnecting=!0,this._eventBus.emit("socket.reconnecting",e,this._monitor[t].attempts),this.disconnect(e),this._eventBus.once("socket.close",t=>t===e&&n(e));break;case u.CLOSED:case u.INIT:this._monitor[t].reconnecting=!0,this._eventBus.emit("socket.reconnecting",e,this._monitor[t].attempts),n(e)}},t),this}isReady(){let e=this._monitor.EVENT.state===u.DISABLED||this._monitor.EVENT.state===u.CONNECTED,t=this._monitor.API.state===u.DISABLED||this._monitor.API.state===u.CONNECTED;return e&&t}isConnected(){return this.isReady()}},e.exports.WebsocketType=a,e.exports.WebsocketState=u,e.exports.CQEvent=n(0).CQEvent},function(e,t,n){var r=function(){return this}(),s=r.WebSocket||r.MozWebSocket,o=n(4);function i(e,t){return t?new s(e,t):new s(e)}s&&["CONNECTING","OPEN","CLOSING","CLOSED"].forEach(function(e){Object.defineProperty(i,e,{get:function(){return s[e]}})}),e.exports={w3cwebsocket:s?i:null,version:o}},function(e,t,n){e.exports=n(5).version},function(e){e.exports={_args:[["websocket@1.0.25","Z:\\Programming\\nodejs\\node-cq-websocket"]],_from:"websocket@1.0.25",_id:"websocket@1.0.25",_inBundle:!1,_integrity:"sha512-M58njvi6ZxVb5k7kpnHh2BvNKuBWiwIYvsToErBzWhvBZYwlEiLcyLrG41T1jRcrY9ettqPYEqduLI7ul54CVQ==",_location:"/websocket",_phantomChildren:{},_requested:{type:"version",registry:!0,raw:"websocket@1.0.25",name:"websocket",escapedName:"websocket",rawSpec:"1.0.25",saveSpec:null,fetchSpec:"1.0.25"},_requiredBy:["/"],_resolved:"https://registry.npmjs.org/websocket/-/websocket-1.0.25.tgz",_spec:"1.0.25",_where:"Z:\\Programming\\nodejs\\node-cq-websocket",author:{name:"Brian McKelvey",email:"brian@worlize.com",url:"https://www.worlize.com/"},browser:"lib/browser.js",bugs:{url:"https://github.com/theturtle32/WebSocket-Node/issues"},config:{verbose:!1},contributors:[{name:"Iñaki Baz Castillo",email:"ibc@aliax.net",url:"http://dev.sipdoc.net"}],dependencies:{debug:"^2.2.0",nan:"^2.3.3","typedarray-to-buffer":"^3.1.2",yaeti:"^0.0.6"},description:"Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.",devDependencies:{"buffer-equal":"^1.0.0",faucet:"^0.0.1",gulp:"git+https://github.com/gulpjs/gulp.git#4.0","gulp-jshint":"^2.0.4",jshint:"^2.0.0","jshint-stylish":"^2.2.1",tape:"^4.0.1"},directories:{lib:"./lib"},engines:{node:">=0.10.0"},homepage:"https://github.com/theturtle32/WebSocket-Node",keywords:["websocket","websockets","socket","networking","comet","push","RFC-6455","realtime","server","client"],license:"Apache-2.0",main:"index",name:"websocket",repository:{type:"git",url:"git+https://github.com/theturtle32/WebSocket-Node.git"},scripts:{gulp:"gulp",install:"(node-gyp rebuild 2> builderror.log) || (exit 0)",test:"faucet test/unit"},version:"1.0.25"}},function(e,t,n){(function(t){var n="Expected a function",r="__lodash_hash_undefined__",s=1/0,o="[object Function]",i="[object GeneratorFunction]",c="[object Symbol]",a=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,u=/^\w*$/,h=/^\./,l=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,p=/\\(\\)?/g,_=/^\[object .+?Constructor\]$/,d="object"==typeof t&&t&&t.Object===Object&&t,f="object"==typeof self&&self&&self.Object===Object&&self,m=d||f||Function("return this")();var g=Array.prototype,v=Function.prototype,y=Object.prototype,b=m["__core-js_shared__"],E=function(){var e=/[^.]+$/.exec(b&&b.keys&&b.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}(),k=v.toString,w=y.hasOwnProperty,N=y.toString,C=RegExp("^"+k.call(w).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),O=m.Symbol,S=g.splice,B=$(m,"Map"),T=$(Object,"create"),I=O?O.prototype:void 0,j=I?I.toString:void 0;function D(e){var t=-1,n=e?e.length:0;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function A(e){var t=-1,n=e?e.length:0;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function P(e){var t=-1,n=e?e.length:0;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function x(e,t){for(var n=e.length;n--;)if(W(e[n][0],t))return n;return-1}function q(e,t){for(var n=0,r=(t=function(e,t){if(G(e))return!1;var n=typeof e;if("number"==n||"symbol"==n||"boolean"==n||null==e||F(e))return!0;return u.test(e)||!a.test(e)||null!=t&&e in Object(t)}(t,e)?[t]:function(e){return G(e)?e:H(e)}(t)).length;null!=e&&n<r;)e=e[V(t[n++])];return n&&n==r?e:void 0}function L(e){return!(!R(e)||function(e){return!!E&&E in e}(e))&&(function(e){var t=R(e)?N.call(e):"";return t==o||t==i}(e)||function(e){var t=!1;if(null!=e&&"function"!=typeof e.toString)try{t=!!(e+"")}catch(e){}return t}(e)?C:_).test(function(e){if(null!=e){try{return k.call(e)}catch(e){}try{return e+""}catch(e){}}return""}(e))}function M(e,t){var n=e.__data__;return function(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e}(t)?n["string"==typeof t?"string":"hash"]:n.map}function $(e,t){var n=function(e,t){return null==e?void 0:e[t]}(e,t);return L(n)?n:void 0}D.prototype.clear=function(){this.__data__=T?T(null):{}},D.prototype.delete=function(e){return this.has(e)&&delete this.__data__[e]},D.prototype.get=function(e){var t=this.__data__;if(T){var n=t[e];return n===r?void 0:n}return w.call(t,e)?t[e]:void 0},D.prototype.has=function(e){var t=this.__data__;return T?void 0!==t[e]:w.call(t,e)},D.prototype.set=function(e,t){return this.__data__[e]=T&&void 0===t?r:t,this},A.prototype.clear=function(){this.__data__=[]},A.prototype.delete=function(e){var t=this.__data__,n=x(t,e);return!(n<0||(n==t.length-1?t.pop():S.call(t,n,1),0))},A.prototype.get=function(e){var t=this.__data__,n=x(t,e);return n<0?void 0:t[n][1]},A.prototype.has=function(e){return x(this.__data__,e)>-1},A.prototype.set=function(e,t){var n=this.__data__,r=x(n,e);return r<0?n.push([e,t]):n[r][1]=t,this},P.prototype.clear=function(){this.__data__={hash:new D,map:new(B||A),string:new D}},P.prototype.delete=function(e){return M(this,e).delete(e)},P.prototype.get=function(e){return M(this,e).get(e)},P.prototype.has=function(e){return M(this,e).has(e)},P.prototype.set=function(e,t){return M(this,e).set(e,t),this};var H=Q(function(e){e=function(e){return null==e?"":function(e){if("string"==typeof e)return e;if(F(e))return j?j.call(e):"";var t=e+"";return"0"==t&&1/e==-s?"-0":t}(e)}(e);var t=[];return h.test(e)&&t.push(""),e.replace(l,function(e,n,r,s){t.push(r?s.replace(p,"$1"):n||e)}),t});function V(e){if("string"==typeof e||F(e))return e;var t=e+"";return"0"==t&&1/e==-s?"-0":t}function Q(e,t){if("function"!=typeof e||t&&"function"!=typeof t)throw new TypeError(n);var r=function(){var n=arguments,s=t?t.apply(this,n):n[0],o=r.cache;if(o.has(s))return o.get(s);var i=e.apply(this,n);return r.cache=o.set(s,i),i};return r.cache=new(Q.Cache||P),r}function W(e,t){return e===t||e!=e&&t!=t}Q.Cache=P;var G=Array.isArray;function R(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function F(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&N.call(e)==c}e.exports=function(e,t,n){var r=null==e?void 0:q(e,t);return void 0===r?n:r}}).call(this,n(7))},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t){e.exports=function e(t,n=function(){}){"object"==typeof t&&Object.keys(t).forEach(function(r){!1!==n(t[r],r,t)&&e(t[r],n)})}},function(e,t){function n(e){const t=this.constructor.prototype[e],n=function(){return t.apply(n,arguments)};return Object.setPrototypeOf(n,this.constructor.prototype),Object.getOwnPropertyNames(t).forEach(function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}),n}n.prototype=Object.create(Function.prototype),e.exports=n},function(e,t){e.exports={SocketError:class extends Error{constructor(e){super(e),this.name="SocketError"}},InvalidWsTypeError:class extends Error{constructor(e){super(`"${e}" is not a valid websocket type.`)}}}}]);