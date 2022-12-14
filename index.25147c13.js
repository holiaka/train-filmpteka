var e,t,n,a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r=e={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function o(e){if(t===setTimeout)return setTimeout(e,0);if((t===i||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:i}catch(e){t=i}try{n="function"==typeof clearTimeout?clearTimeout:s}catch(e){n=s}}();var c,l=[],u=!1,h=-1;function d(){u&&c&&(u=!1,c.length?l=c.concat(l):h=-1,l.length&&f())}function f(){if(!u){var e=o(d);u=!0;for(var t=l.length;t;){for(c=l,l=[];++h<t;)c&&c[h].run();h=-1,t=l.length}c=null,u=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===s||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function m(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new p(e,t)),1!==l.length||u||o(f)},p.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=m,r.addListener=m,r.once=m,r.off=m,r.removeListener=m,r.removeAllListeners=m,r.emit=m,r.prependListener=m,r.prependOnceListener=m,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const g=function(e){const t=[];let n=0;for(let a=0;a<e.length;a++){let r=e.charCodeAt(a);r<128?t[n++]=r:r<2048?(t[n++]=r>>6|192,t[n++]=63&r|128):55296==(64512&r)&&a+1<e.length&&56320==(64512&e.charCodeAt(a+1))?(r=65536+((1023&r)<<10)+(1023&e.charCodeAt(++a)),t[n++]=r>>18|240,t[n++]=r>>12&63|128,t[n++]=r>>6&63|128,t[n++]=63&r|128):(t[n++]=r>>12|224,t[n++]=r>>6&63|128,t[n++]=63&r|128)}return t},b={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,a=[];for(let t=0;t<e.length;t+=3){const r=e[t],i=t+1<e.length,s=i?e[t+1]:0,o=t+2<e.length,c=o?e[t+2]:0,l=r>>2,u=(3&r)<<4|s>>4;let h=(15&s)<<2|c>>6,d=63&c;o||(d=64,i||(h=64)),a.push(n[l],n[u],n[h],n[d])}return a.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(g(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,a=0;for(;n<e.length;){const r=e[n++];if(r<128)t[a++]=String.fromCharCode(r);else if(r>191&&r<224){const i=e[n++];t[a++]=String.fromCharCode((31&r)<<6|63&i)}else if(r>239&&r<365){const i=((7&r)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[a++]=String.fromCharCode(55296+(i>>10)),t[a++]=String.fromCharCode(56320+(1023&i))}else{const i=e[n++],s=e[n++];t[a++]=String.fromCharCode((15&r)<<12|(63&i)<<6|63&s)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,a=[];for(let t=0;t<e.length;){const r=n[e.charAt(t++)],i=t<e.length?n[e.charAt(t)]:0;++t;const s=t<e.length?n[e.charAt(t)]:64;++t;const o=t<e.length?n[e.charAt(t)]:64;if(++t,null==r||null==i||null==s||null==o)throw Error();const c=r<<2|i>>4;if(a.push(c),64!==s){const e=i<<4&240|s>>2;if(a.push(e),64!==o){const e=s<<6&192|o;a.push(e)}}}return a},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},w=function(e){return function(e){const t=g(e);return b.encodeByteArray(t,!0)}(e).replace(/\./g,"")},y=function(e){try{return b.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function I(){try{return"object"==typeof indexedDB}catch(e){return!1}}function E(){return new Promise(((e,t)=>{try{let n=!0;const a="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(a);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(a),e(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var e;t((null===(e=r.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}}))}function S(){return!("undefined"==typeof navigator||!navigator.cookieEnabled)}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const D=()=>function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==a)return a;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,C=()=>{try{return D()||(()=>{if(void 0===e||void 0===e.env)return})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}const t=e&&y(e[1]);return t&&JSON.parse(t)})()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class _{wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,n))}}constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,T.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,A.prototype.create)}}class A{create(e,...t){const n=t[0]||{},a=`${this.service}/${e}`,r=this.errors[e],i=r?function(e,t){return e.replace(O,((e,n)=>{const a=t[n];return null!=a?String(a):`<${n}?>`}))}(r,n):"Error",s=`${this.serviceName}: ${i} (${a}).`;return new T(a,s,n)}constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}}const O=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(e,t){if(e===t)return!0;const n=Object.keys(e),a=Object.keys(t);for(const r of n){if(!a.includes(r))return!1;const n=e[r],i=t[r];if(k(n)&&k(i)){if(!L(n,i))return!1}else if(n!==i)return!1}for(const e of a)if(!n.includes(e))return!1;return!0}function k(e){return null!==e&&"object"==typeof e}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(e,t=1e3,n=2){const a=t*Math.pow(n,e),r=Math.round(.5*a*(Math.random()-.5)*2);return Math.min(144e5,a+r)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function B(e){return e&&e._delegate?e._delegate:e}class j{setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class P{get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new _;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),a=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(a)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(a)return null;throw e}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e))try{this.getOrInitializeService({instanceIdentifier:"[DEFAULT]"})}catch(e){}for(const[e,t]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(e){}}}}clearInstance(e="[DEFAULT]"){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter((e=>"INTERNAL"in e)).map((e=>e.INTERNAL.delete())),...e.filter((e=>"_delete"in e)).map((e=>e._delete()))])}isComponentSet(){return null!=this.component}isInitialized(e="[DEFAULT]"){return this.instances.has(e)}getOptions(e="[DEFAULT]"){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const a=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[e,t]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(e)&&t.resolve(a)}return a}onInit(e,t){var n;const a=this.normalizeInstanceIdentifier(t),r=null!==(n=this.onInitCallbacks.get(a))&&void 0!==n?n:new Set;r.add(e),this.onInitCallbacks.set(a,r);const i=this.instances.get(a);return i&&e(i,a),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const a of n)try{a(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(a=e,"[DEFAULT]"===a?void 0:a),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(e){}var a;return n||null}normalizeInstanceIdentifier(e="[DEFAULT]"){return this.component?this.component.multipleInstances?e:"[DEFAULT]":e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}}class ${addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new P(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}constructor(e){this.name=e,this.providers=new Map}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N=[];var F,R;(R=F||(F={}))[R.DEBUG=0]="DEBUG",R[R.VERBOSE=1]="VERBOSE",R[R.INFO=2]="INFO",R[R.WARN=3]="WARN",R[R.ERROR=4]="ERROR",R[R.SILENT=5]="SILENT";const x={debug:F.DEBUG,verbose:F.VERBOSE,info:F.INFO,warn:F.WARN,error:F.ERROR,silent:F.SILENT},H=F.INFO,z={[F.DEBUG]:"log",[F.VERBOSE]:"log",[F.INFO]:"info",[F.WARN]:"warn",[F.ERROR]:"error"},U=(e,t,...n)=>{if(t<e.logLevel)return;const a=(new Date).toISOString(),r=z[t];if(!r)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[r](`[${a}]  ${e.name}:`,...n)};class V{get logLevel(){return this._logLevel}set logLevel(e){if(!(e in F))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?x[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,F.DEBUG,...e),this._logHandler(this,F.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,F.VERBOSE,...e),this._logHandler(this,F.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,F.INFO,...e),this._logHandler(this,F.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,F.WARN,...e),this._logHandler(this,F.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,F.ERROR,...e),this._logHandler(this,F.ERROR,...e)}constructor(e){this.name=e,this._logLevel=H,this._logHandler=U,this._userLogHandler=null,N.push(this)}}let W,q;const K=new WeakMap,G=new WeakMap,J=new WeakMap,X=new WeakMap,Q=new WeakMap;let Z={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return G.get(e);if("objectStoreNames"===t)return e.objectStoreNames||J.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return te(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function Y(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(q||(q=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(ne(this),t),te(K.get(this))}:function(...t){return te(e.apply(ne(this),t))}:function(t,...n){const a=e.call(ne(this),t,...n);return J.set(a,t.sort?t.sort():[t]),te(a)}}function ee(e){return"function"==typeof e?Y(e):(e instanceof IDBTransaction&&function(e){if(G.has(e))return;const t=new Promise(((t,n)=>{const a=()=>{e.removeEventListener("complete",r),e.removeEventListener("error",i),e.removeEventListener("abort",i)},r=()=>{t(),a()},i=()=>{n(e.error||new DOMException("AbortError","AbortError")),a()};e.addEventListener("complete",r),e.addEventListener("error",i),e.addEventListener("abort",i)}));G.set(e,t)}(e),t=e,(W||(W=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((e=>t instanceof e))?new Proxy(e,Z):e);var t}function te(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const a=()=>{e.removeEventListener("success",r),e.removeEventListener("error",i)},r=()=>{t(te(e.result)),a()},i=()=>{n(e.error),a()};e.addEventListener("success",r),e.addEventListener("error",i)}));return t.then((t=>{t instanceof IDBCursor&&K.set(t,e)})).catch((()=>{})),Q.set(t,e),t}(e);if(X.has(e))return X.get(e);const t=ee(e);return t!==e&&(X.set(e,t),Q.set(t,e)),t}const ne=e=>Q.get(e);function ae(e,t,{blocked:n,upgrade:a,blocking:r,terminated:i}={}){const s=indexedDB.open(e,t),o=te(s);return a&&s.addEventListener("upgradeneeded",(e=>{a(te(s.result),e.oldVersion,e.newVersion,te(s.transaction))})),n&&s.addEventListener("blocked",(()=>n())),o.then((e=>{i&&e.addEventListener("close",(()=>i())),r&&e.addEventListener("versionchange",(()=>r()))})).catch((()=>{})),o}const re=["get","getKey","getAll","getAllKeys","count"],ie=["put","add","delete","clear"],se=new Map;function oe(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(se.get(t))return se.get(t);const n=t.replace(/FromIndex$/,""),a=t!==n,r=ie.includes(n);if(!(n in(a?IDBIndex:IDBObjectStore).prototype)||!r&&!re.includes(n))return;const i=async function(e,...t){const i=this.transaction(e,r?"readwrite":"readonly");let s=i.store;return a&&(s=s.index(t.shift())),(await Promise.all([s[n](...t),r&&i.done]))[0]};return se.set(t,i),i}Z=(e=>({...e,get:(t,n,a)=>oe(t,n)||e.get(t,n,a),has:(t,n)=>!!oe(t,n)||e.has(t,n)}))(Z);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ce{getPlatformInfoString(){return this.container.getProviders().map((e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null})).filter((e=>e)).join(" ")}constructor(e){this.container=e}}const le=new V("@firebase/app"),ue={"@firebase/app":"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},he=new Map,de=new Map;function fe(e,t){try{e.container.addComponent(t)}catch(n){le.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function pe(e){const t=e.name;if(de.has(t))return le.debug(`There were multiple attempts to register component ${t}.`),!1;de.set(t,e);for(const t of he.values())fe(t,e);return!0}function me(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ge=new A("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class be{get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ge.create("app-deleted",{appName:this._name})}constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new j("app",(()=>this),"PUBLIC"))}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function we(e,t={}){let n=e;if("object"!=typeof t){t={name:t}}const a=Object.assign({name:"[DEFAULT]",automaticDataCollectionEnabled:!1},t),r=a.name;if("string"!=typeof r||!r)throw ge.create("bad-app-name",{appName:String(r)});var i;if(n||(n=null===(i=C())||void 0===i?void 0:i.config),!n)throw ge.create("no-options");const s=he.get(r);if(s){if(L(n,s.options)&&L(a,s.config))return s;throw ge.create("duplicate-app",{appName:r})}const o=new $(r);for(const e of de.values())o.addComponent(e);const c=new be(n,a,o);return he.set(r,c),c}function ye(e="[DEFAULT]"){const t=he.get(e);if(!t&&"[DEFAULT]"===e)return we();if(!t)throw ge.create("no-app",{appName:e});return t}function ve(e,t,n){var a;let r=null!==(a=ue[e])&&void 0!==a?a:e;n&&(r+=`-${n}`);const i=r.match(/\s|\//),s=t.match(/\s|\//);if(i||s){const e=[`Unable to register library "${r}" with version "${t}":`];return i&&e.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&e.push("and"),s&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void le.warn(e.join(" "))}pe(new j(`${r}-version`,(()=>({library:r,version:t})),"VERSION"))}let Ie=null;function Ee(){return Ie||(Ie=ae("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore("firebase-heartbeat-store")}}).catch((e=>{throw ge.create("idb-open",{originalErrorMessage:e.message})}))),Ie}async function Se(e,t){try{const n=(await Ee()).transaction("firebase-heartbeat-store","readwrite"),a=n.objectStore("firebase-heartbeat-store");return await a.put(t,De(e)),n.done}catch(e){if(e instanceof T)le.warn(e.message);else{const t=ge.create("idb-set",{originalErrorMessage:null==e?void 0:e.message});le.warn(t.message)}}}function De(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{async triggerHeartbeat(){const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),t=_e();if(null===this._heartbeatsCache&&(this._heartbeatsCache=await this._heartbeatsCachePromise),this._heartbeatsCache.lastSentHeartbeatDate!==t&&!this._heartbeatsCache.heartbeats.some((e=>e.date===t)))return this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter((e=>{const t=new Date(e.date).valueOf();return Date.now()-t<=2592e6})),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null===this._heartbeatsCache||0===this._heartbeatsCache.heartbeats.length)return"";const e=_e(),{heartbeatsToSend:t,unsentEntries:n}=function(e,t=1024){const n=[];let a=e.slice();for(const r of e){const e=n.find((e=>e.agent===r.agent));if(e){if(e.dates.push(r.date),Ae(n)>t){e.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Ae(n)>t){n.pop();break}a=a.slice(1)}return{heartbeatsToSend:n,unsentEntries:a}}(this._heartbeatsCache.heartbeats),a=w(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Te(t),this._heartbeatsCachePromise=this._storage.read().then((e=>(this._heartbeatsCache=e,e)))}}function _e(){return(new Date).toISOString().substring(0,10)}class Te{async runIndexedDBEnvironmentCheck(){return!!I()&&E().then((()=>!0)).catch((()=>!1))}async read(){if(await this._canUseIndexedDBPromise){return await async function(e){try{return(await Ee()).transaction("firebase-heartbeat-store").objectStore("firebase-heartbeat-store").get(De(e))}catch(e){if(e instanceof T)le.warn(e.message);else{const t=ge.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});le.warn(t.message)}}}(this.app)||{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return Se(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return Se(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}}function Ae(e){return w(JSON.stringify({version:2,heartbeats:e})).length}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Oe;Oe="",pe(new j("platform-logger",(e=>new ce(e)),"PRIVATE")),pe(new j("heartbeat",(e=>new Ce(e)),"PRIVATE")),ve("@firebase/app","0.9.0",Oe),ve("@firebase/app","0.9.0","esm2017"),ve("fire-js","");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
ve("firebase","9.15.0","app");const Le=new A("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function ke(e){return e instanceof T&&e.code.includes("request-failed")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Me({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function Be(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function je(e,t){const n=(await t.json()).error;return Le.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function Pe({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function $e(e,{refreshToken:t}){const n=Pe(e);return n.append("Authorization",function(e){return`FIS_v2 ${e}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)),n}async function Ne(e){const t=await e();return t.status>=500&&t.status<600?e():t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fe(e){return new Promise((t=>{setTimeout(t,e)}))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Re=/^[cdef][\w-]{21}$/;function xe(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){return(t=e,btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")).substr(0,22);var t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e);return Re.test(t)?t:""}catch(e){return""}}function He(e){return`${e.appName}!${e.appId}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ze=new Map;function Ue(e,t){const n=He(e);Ve(n,t),function(e,t){const n=qe();n&&n.postMessage({key:e,fid:t});Ke()}(n,t)}function Ve(e,t){const n=ze.get(e);if(n)for(const e of n)e(t)}let We=null;function qe(){return!We&&"BroadcastChannel"in self&&(We=new BroadcastChannel("[Firebase] FID Change"),We.onmessage=e=>{Ve(e.data.key,e.data.fid)}),We}function Ke(){0===ze.size&&We&&(We.close(),We=null)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ge=null;function Je(){return Ge||(Ge=ae("firebase-installations-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore("firebase-installations-store")}})),Ge}async function Xe(e,t){const n=He(e),a=(await Je()).transaction("firebase-installations-store","readwrite"),r=a.objectStore("firebase-installations-store"),i=await r.get(n);return await r.put(t,n),await a.done,i&&i.fid===t.fid||Ue(e,t.fid),t}async function Qe(e){const t=He(e),n=(await Je()).transaction("firebase-installations-store","readwrite");await n.objectStore("firebase-installations-store").delete(t),await n.done}async function Ze(e,t){const n=He(e),a=(await Je()).transaction("firebase-installations-store","readwrite"),r=a.objectStore("firebase-installations-store"),i=await r.get(n),s=t(i);return void 0===s?await r.delete(n):await r.put(s,n),await a.done,!s||i&&i.fid===s.fid||Ue(e,s.fid),s}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ye(e){let t;const n=await Ze(e.appConfig,(n=>{const a=function(e){return nt(e||{fid:xe(),registrationStatus:0})}(n),r=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(Le.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},a=async function(e,t){try{const n=await async function({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const a=Me(e),r=Pe(e),i=t.getImmediate({optional:!0});if(i){const e=await i.getHeartbeatsHeader();e&&r.append("x-firebase-client",e)}const s={fid:n,authVersion:"FIS_v2",appId:e.appId,sdkVersion:"w:0.6.0"},o={method:"POST",headers:r,body:JSON.stringify(s)},c=await Ne((()=>fetch(a,o)));if(c.ok){const e=await c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:Be(e.authToken)}}throw await je("Create Installation",c)}(e,t);return Xe(e.appConfig,n)}catch(n){throw ke(n)&&409===n.customData.serverCode?await Qe(e.appConfig):await Xe(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:a}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:et(e)}:{installationEntry:t}}(e,a);return t=r.registrationPromise,r.installationEntry}));return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function et(e){let t=await tt(e.appConfig);for(;1===t.registrationStatus;)await Fe(100),t=await tt(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await Ye(e);return n||t}return t}function tt(e){return Ze(e,(e=>{if(!e)throw Le.create("installation-not-found");return nt(e)}))}function nt(e){return 1===(t=e).registrationStatus&&t.registrationTime+1e4<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}async function at({appConfig:e,heartbeatServiceProvider:t},n){const a=function(e,{fid:t}){return`${Me(e)}/${t}/authTokens:generate`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,n),r=$e(e,n),i=t.getImmediate({optional:!0});if(i){const e=await i.getHeartbeatsHeader();e&&r.append("x-firebase-client",e)}const s={installation:{sdkVersion:"w:0.6.0",appId:e.appId}},o={method:"POST",headers:r,body:JSON.stringify(s)},c=await Ne((()=>fetch(a,o)));if(c.ok){return Be(await c.json())}throw await je("Generate Auth Token",c)}async function rt(e,t=!1){let n;const a=await Ze(e.appConfig,(a=>{if(!st(a))throw Le.create("not-registered");const r=a.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(e)}(r))return a;if(1===r.requestStatus)return n=async function(e,t){let n=await it(e.appConfig);for(;1===n.authToken.requestStatus;)await Fe(100),n=await it(e.appConfig);const a=n.authToken;return 0===a.requestStatus?rt(e,t):a}(e,t),a;{if(!navigator.onLine)throw Le.create("app-offline");const t=function(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(a);return n=async function(e,t){try{const n=await at(e,t),a=Object.assign(Object.assign({},t),{authToken:n});return await Xe(e.appConfig,a),n}catch(n){if(!ke(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await Xe(e.appConfig,n)}else await Qe(e.appConfig);throw n}}(e,t),t}}));return n?await n:a.authToken}function it(e){return Ze(e,(e=>{if(!st(e))throw Le.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+1e4<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e;var n;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}))}function st(e){return void 0!==e&&2===e.registrationStatus}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function ot(e,t=!1){const n=e;await async function(e){const{registrationPromise:t}=await Ye(e);t&&await t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n);return(await rt(n,t)).token}function ct(e){return Le.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lt=e=>{const t=me(e.getProvider("app").getImmediate(),"installations").getImmediate();return{getId:()=>async function(e){const t=e,{installationEntry:n,registrationPromise:a}=await Ye(t);return a?a.catch(console.error):rt(t).catch(console.error),n.fid}(t),getToken:e=>ot(t,e)}};pe(new j("installations",(e=>{const t=e.getProvider("app").getImmediate(),n=
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e){if(!e||!e.options)throw ct("App Configuration");if(!e.name)throw ct("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw ct(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:me(t,"heartbeat"),_delete:()=>Promise.resolve()}}),"PUBLIC")),pe(new j("installations-internal",lt,"PRIVATE")),ve("@firebase/installations","0.6.0"),ve("@firebase/installations","0.6.0","esm2017");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ut=new V("@firebase/analytics");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ht(e){return Promise.all(e.map((e=>e.catch((e=>e)))))}function dt(e,t,n,a){return async function(r,i,s){try{"event"===r?await async function(e,t,n,a,r){try{let i=[];if(r&&r.send_to){let e=r.send_to;Array.isArray(e)||(e=[e]);const a=await ht(n);for(const n of e){const e=a.find((e=>e.measurementId===n)),r=e&&t[e.appId];if(!r){i=[];break}i.push(r)}}0===i.length&&(i=Object.values(t)),await Promise.all(i),e("event",a,r||{})}catch(e){ut.error(e)}}(e,t,n,i,s):"config"===r?await async function(e,t,n,a,r,i){const s=a[r];try{if(s)await t[s];else{const e=(await ht(n)).find((e=>e.measurementId===r));e&&await t[e.appId]}}catch(e){ut.error(e)}e("config",r,i)}(e,t,n,a,i,s):"consent"===r?e("consent","update",s):e("set",i)}catch(e){ut.error(e)}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ft=new A("analytics","Analytics",{"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.'});const pt=new class{getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}constructor(e={},t=1e3){this.throttleMetadata=e,this.intervalMillis=t}};function mt(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function gt(e,t=pt,n){const{appId:a,apiKey:r,measurementId:i}=e.options;if(!a)throw ft.create("no-app-id");if(!r){if(i)return{measurementId:i,appId:a};throw ft.create("no-api-key")}const s=t.getThrottleMetadata(a)||{backoffCount:0,throttleEndTimeMillis:Date.now()},o=new wt;return setTimeout((async()=>{o.abort()}),void 0!==n?n:6e4),bt({appId:a,apiKey:r,measurementId:i},s,o,t)}async function bt(e,{throttleEndTimeMillis:t,backoffCount:n},a,r=pt){var i;const{appId:s,measurementId:o}=e;try{await function(e,t){return new Promise(((n,a)=>{const r=Math.max(t-Date.now(),0),i=setTimeout(n,r);e.addEventListener((()=>{clearTimeout(i),a(ft.create("fetch-throttle",{throttleEndTimeMillis:t}))}))}))}(a,t)}catch(e){if(o)return ut.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${null==e?void 0:e.message}]`),{appId:s,measurementId:o};throw e}try{const t=await async function(e){var t;const{appId:n,apiKey:a}=e,r={method:"GET",headers:mt(a)},i="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}",n),s=await fetch(i,r);if(200!==s.status&&304!==s.status){let e="";try{const n=await s.json();(null===(t=n.error)||void 0===t?void 0:t.message)&&(e=n.error.message)}catch(e){}throw ft.create("config-fetch-failed",{httpStatus:s.status,responseMessage:e})}return s.json()}(e);return r.deleteThrottleMetadata(s),t}catch(t){const c=t;if(!function(e){if(!(e instanceof T&&e.customData))return!1;const t=Number(e.customData.httpStatus);return 429===t||500===t||503===t||504===t}(c)){if(r.deleteThrottleMetadata(s),o)return ut.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${null==c?void 0:c.message}]`),{appId:s,measurementId:o};throw t}const l=503===Number(null===(i=null==c?void 0:c.customData)||void 0===i?void 0:i.httpStatus)?M(n,r.intervalMillis,30):M(n,r.intervalMillis),u={throttleEndTimeMillis:Date.now()+l,backoffCount:n+1};return r.setThrottleMetadata(s,u),ut.debug(`Calling attemptFetch again in ${l} millis`),bt(e,u,a,r)}}class wt{addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach((e=>e()))}constructor(){this.listeners=[]}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yt,vt;function It(e){vt=e}function Et(e){yt=e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function St(e,t,n,a,r,i,s){var o;const c=gt(e);c.then((t=>{n[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&ut.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)})).catch((e=>ut.error(e))),t.push(c);const l=async function(){if(!I())return ut.warn(ft.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;try{await E()}catch(e){return ut.warn(ft.create("indexeddb-unavailable",{errorInfo:null==e?void 0:e.toString()}).message),!1}return!0}().then((e=>e?a.getId():void 0)),[u,h]=await Promise.all([c,l]);(function(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes("https://www.googletagmanager.com/gtag/js")&&n.src.includes(e))return n;return null})(i)||function(e,t){const n=document.createElement("script");n.src=`https://www.googletagmanager.com/gtag/js?l=${e}&id=${t}`,n.async=!0,document.head.appendChild(n)}(i,u.measurementId),vt&&(r("consent","default",vt),It(void 0)),r("js",new Date);const d=null!==(o=null==s?void 0:s.config)&&void 0!==o?o:{};return d.origin="firebase",d.update=!0,null!=h&&(d.firebase_id=h),r("config",u.measurementId,d),yt&&(r("set",yt),Et(void 0)),u.measurementId}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{_delete(){return delete Ct[this.app.options.appId],Promise.resolve()}constructor(e){this.app=e}}let Ct={},_t=[];const Tt={};let At,Ot,Lt="dataLayer",kt="gtag",Mt=!1;function Bt(e,t,n){!function(){const e=[];if(v()&&e.push("This is a browser extension environment."),S()||e.push("Cookies are not available."),e.length>0){const t=e.map(((e,t)=>`(${t+1}) ${e}`)).join(" "),n=ft.create("invalid-analytics-context",{errorInfo:t});ut.warn(n.message)}}();const a=e.options.appId;if(!a)throw ft.create("no-app-id");if(!e.options.apiKey){if(!e.options.measurementId)throw ft.create("no-api-key");ut.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`)}if(null!=Ct[a])throw ft.create("already-exists",{id:a});if(!Mt){!function(e){let t=[];Array.isArray(window[e])?t=window[e]:window[e]=t}(Lt);const{wrappedGtag:e,gtagCore:t}=function(e,t,n,a,r){let i=function(...e){window[a].push(arguments)};return window[r]&&"function"==typeof window[r]&&(i=window[r]),window[r]=dt(i,e,t,n),{gtagCore:i,wrappedGtag:window[r]}}(Ct,_t,Tt,Lt,kt);Ot=e,At=t,Mt=!0}Ct[a]=St(e,_t,Tt,t,At,Lt,n);return new Dt(e)}function jt(e,t,n,a){e=B(e),async function(e,t,n,a,r){if(r&&r.global)e("event",n,a);else{const r=await t;e("event",n,Object.assign(Object.assign({},a),{send_to:r}))}}(Ot,Ct[e.app.options.appId],t,n,a).catch((e=>ut.error(e)))}pe(new j("analytics",((e,{options:t})=>Bt(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),t)),"PUBLIC")),pe(new j("analytics-internal",(function(e){try{const t=e.getProvider("analytics").getImmediate();return{logEvent:(e,n,a)=>jt(t,e,n,a)}}catch(e){throw ft.create("interop-component-reg-failed",{reason:e})}}),"PRIVATE")),ve("@firebase/analytics","0.9.0"),ve("@firebase/analytics","0.9.0","esm2017");(function(e=ye()){const t=me(e=B(e),"analytics");t.isInitialized()?t.getImmediate():function(e,t={}){const n=me(e,"analytics");if(n.isInitialized()){const e=n.getImmediate();if(L(t,n.getOptions()))return e;throw ft.create("already-initialized")}n.initialize({options:t})}(e)})(we({apiKey:"AIzaSyAQ2XP7poG0XpFLsnXL3RM81DM9cUBt3Mw",authDomain:"team-project-20a02.firebaseapp.com",databaseURL:"https://team-project-20a02-default-rtdb.europe-west1.firebasedatabase.app",projectId:"team-project-20a02",storageBucket:"team-project-20a02.appspot.com",messagingSenderId:"755446667553",appId:"1:755446667553:web:0ee696ebc0509aa9284660",measurementId:"G-EPQTZQBE46"})),document.querySelector(".js-pagination");
//# sourceMappingURL=index.25147c13.js.map
