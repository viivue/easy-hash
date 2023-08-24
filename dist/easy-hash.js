/**!
 * Easy Hash vbeta
 * @author phucbm
 * @homepage https://github.com/phucbm/easy-hash
 * @license MIT 2023
 */
(function webpackUniversalModuleDefinition(root, factory){
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define([], factory);
    else{
        var a = factory();
        for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
    }
})(this, () => {
    return /******/ (() => { // webpackBootstrap
        /******/
        "use strict";
        /******/ 	// The require scope
        /******/
        var __webpack_require__ = {};
        /******/
        /************************************************************************/
        /******/ 	/* webpack/runtime/make namespace object */
        /******/
        (() => {
            /******/ 		// define __esModule on exports
            /******/
            __webpack_require__.r = (exports) => {
                /******/
                if(typeof Symbol !== 'undefined' && Symbol.toStringTag){
                    /******/
                    Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
                    /******/
                }
                /******/
                Object.defineProperty(exports, '__esModule', {value: true});
                /******/
            };
            /******/
        })();
        /******/
        /************************************************************************/
        var __webpack_exports__ = {};
// ESM COMPAT FLAG
        __webpack_require__.r(__webpack_exports__);

        ;// CONCATENATED MODULE: ./src/helpers.js
        /**
         * Fire an event
         * @param context
         */
        function fireEvent(context){
            if(context.data.previousHash !== context.data.currentHash){
                context.callbacks.forEach(callback => callback(context.data))
            }
        }
        ;// CONCATENATED MODULE: ./src/utils.js
        /**
         * Debounce (ignore all, run the last)
         * https://www.freecodecamp.org/news/javascript-debounce-example/
         * @param func
         * @param timeout
         * @returns {(function(...[*]): void)|*}
         */
        function debounce(func, timeout = 150){
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    func.apply(this, args);
                }, timeout);
            };
        }


        /**
         * Debounce leading (run the first, ignore the rest)
         * https://www.freecodecamp.org/news/javascript-debounce-example/
         * @param func
         * @param timeout
         * @returns {(function(...[*]): void)|*}
         */
        function debounceLeading(func, timeout = 150){
            let timer;
            return (...args) => {
                if(!timer){
                    func.apply(this, args);
                }
                clearTimeout(timer);
                timer = setTimeout(() => {
                    timer = undefined;
                }, timeout);
            };
        }


        /**
         * Get array with unique values
         * https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
         * @param array
         * @returns {*}
         */
        function arrayUnique(array){
            function onlyUnique(value, index, self){
                return self.indexOf(value) === index;
            }

            return array.filter(onlyUnique);
        }


        /**
         * Sort array of integers
         * @param array
         * @param asc
         * @returns {*}
         */
        function arraySortInteger(array, asc = true){
            return array.sort(function(a, b){
                return asc ? a - b : b - a;
            });
        }


        /**
         * Set CSS v2
         * @param el
         * @param props
         */
        function setCSS(el, props){
            (el.length ? el : [el]).forEach(item => item && item.style ? Object.assign(item.style, props) : '');
        }

        function hasClass(el, className){
            el.classList.contains(className);
        }

        function addClass(el, className){
            (el.length ? el : [el]).forEach(item => item?.classList.add(className));
        }

        function removeClass(el, className){
            (el.length ? el : [el]).forEach(item => item?.classList.remove(className));
        }

        /**
         * Console log
         * @param context
         * @param status
         * @param message
         */
        function log(context, status, ...message){
            if(context.options.dev){
                console?.[status](...message);
            }
        }


        /**
         * Generate unique ID
         */
        function uniqueId(prefix = ''){
            return prefix + (+new Date()).toString(16) +
                (Math.random() * 100000000 | 0).toString(16);
        }

        /**
         * Convert array to object
         * [a, 1, b, 2] => {a: 1, b: 2}
         */
        function convertArrayToObject(arrayParams){
            // Covert array to object
            const values = [];
            arrayParams.forEach(param => {
                const newParam = param.split("=");
                values.push({"key": newParam[0], "value": newParam[1]})
            })
            return values.reduce((obj, item) => Object.assign(obj, {[item.key]: item.value}), {});
        }

        /**
         * Convert object to query string
         * {a: 1, b: 2} => a=1&b=2
         */
        function convertObjectToQueryString(hash){
            const hashObject = [];
            for(const [key, value] of Object.entries(hash)){
                hashObject.push(`${key}=${value}`);
            }
            return hashObject.toString().replace(",", "&");
        }
        ;// CONCATENATED MODULE: ./src/_index.js


        /**
         * Private class
         */
        class HashManager{
            constructor(){
                this.callbacks = [];
                this.data = {
                    previousHash: "",
                    currentHash: ""
                };
            }

            /**
             * Add new hash
             * @param hash
             */
            add(hash){
                // validate hash
                if(!hash && hash !== '') return;

                // hash is empty string "" => remove hash
                if(hash === ''){
                    this.remove();
                    return;
                }

                // hash is object (not array)
                if(typeof hash === 'object' && !Array.isArray(hash)){
                    // convertObjectToQueryString() => {a:1,b:1} => hash = "a=1&b=2"
                    hash = convertObjectToQueryString(hash);

                }else if(typeof hash === 'string'){

                    // hash is string => remove the 1st "#" if any => hash = "something"
                    // #123 => 123
                    const firstChar = hash.split("")[0];
                    hash = firstChar === "#" ? hash.substring(1) : hash;

                }else{

                    // else, other types => hash = toString()
                    hash = hash.toString();
                }

                // add new hash to URL (using replaceState to avoid adding new history entry
                history.replaceState(null, null, `#${hash}`);

                // update data
                this.data.previousHash = this.data.currentHash;
                this.data.currentHash = hash;

                fireEvent(this);
            }

            /**
             * Remove current hash
             */
            remove(){
                // reset current URL to origin URL
                history.replaceState(null, null, window.location.pathname);

                // update data
                this.data.previousHash = this.data.currentHash;
                this.data.currentHash = "";

                fireEvent(this);
            }

            /**
             * Get current hash
             */
            getHash(){
                return window.location.hash;
                // if(window.location.hash === ''){
                //     return '';
                // }
                //
                // const getParams = window.location.hash.split("#");
                //
                // // params contains '&' => object, not contain '&' => string
                // const splitParams = getParams[1].split('&') ? getParams[1].split('&') : getParams[1];
                //
                // // params is a string
                // if(splitParams.length === 1){
                //     return `#${splitParams[0]}`;
                // }
                //
                // // params is an array
                // return convertArrayToObject(splitParams);
            }

            on(type, callback){
                if(type === 'change'){
                    this.callbacks.push(callback);
                }else{
                    console.warn(`Event "${type}" is not recognized!`);
                }
            }
        }


        /**
         * Public library object
         * access via window.HashManager
         */
        window.EasyHash = new HashManager();


        /******/
        return __webpack_exports__;
        /******/
    })()
        ;
});