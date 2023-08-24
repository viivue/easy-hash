/**!
 * Easy Hash vbeta
 * @author phucbm
 * @homepage https://github.com/phucbm/easy-hash
 * @license MIT 2023
 */
function t(t){t.data.previousHash!==t.data.currentHash&&t.callbacks.forEach((a=>a(t.data)))}window.EasyHash=new class{constructor(){this.callbacks=[],this.data={previousHash:"",currentHash:""}}add(a){if(a||""===a)if(""!==a){if("object"!=typeof a||Array.isArray(a))if("string"==typeof a){const t=a.split("")[0];a="#"===t?a.substring(1):a}else a=a.toString();else a=function(t){const a=[];for(const[s,e]of Object.entries(t))a.push(`${s}=${e}`);return a.toString().replace(",","&")}(a);history.replaceState(null,null,`#${a}`),this.data.previousHash=this.data.currentHash,this.data.currentHash=a,t(this)}else this.remove()}remove(){history.replaceState(null,null,window.location.pathname),this.data.previousHash=this.data.currentHash,this.data.currentHash="",t(this)}getHash(){return window.location.hash}on(t,a){"change"===t?this.callbacks.push(a):console.warn(`Event "${t}" is not recognized!`)}};