
/**!
 * Wellii - Webpack Library Boilerplate v0.0.2
 * @author phucbm
 * @homepage https://github.com/phucbm/wellii
 * @license MIT 2023
 */
var __webpack_exports__ = {};

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
 * Set CSS
 * @param target
 * @param props
 */
function setCSS(target, props){
    Object.assign(target.style, props);
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
;// CONCATENATED MODULE: ./src/_index.js



/**
 * Private class
 */
class Wellii{
    constructor(options){
        this.id = uniqueId();
        this.options = {
            el: undefined,
            ...options
        };

        this.options.el.innerHTML = 'Hello!';
    }
}


/**
 * Private class Controller
 * This class will hold instances of the library's objects
 */
class Controller{
    constructor(){
        this.instances = [];
    }

    add(instance){
        this.instances.push(instance);
    }

    get(id){
        return this.instances.filter(instance => instance.id === id)[0];
    }
}


/**
 * Public library data
 * access via window.WelliiController
 */
window.WelliiController = new Controller();


/**
 * Public library object
 * access via window.Wellii
 */
window.Wellii = {
    // init new instances
    init: (options = {}) => {
        const selector = options.selector || '[data-wellii]';

        // init with selector
        document.querySelectorAll(selector).forEach(el => {
            window.WelliiController.add(new Wellii({el, ...options}));
        });
    },
    // Get instance object by ID
    get: id => window.WelliiController.get(id)
};

window.Wellii.init();
