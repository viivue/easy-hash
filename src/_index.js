import {fireEvent} from "./helpers";
import {convertArrayToObject, convertObjectToQueryString} from "./utils";

/**
 * Private class
 */
class HashManager{
    constructor(){
        this.callbacks = [];
        this.data = {
            previousHash: "",
            currentHash: this.getHash()
        };

        // get current hash value
        window.addEventListener("hashchange", () => {
            // update data
            this.data.previousHash = this.data.currentHash;
            this.data.currentHash = this.getHash();

            fireEvent(this);
        })
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

    getHash({hasSharp = true} = {}){
        // return window.location.hash;
        if(window.location.hash === ''){
            return '';
        }

        // const getParams = window.location.hash.split("#");

        // params contains '&' => object, not contain '&' => string
        // const splitParams = getParams[1].split('&') ? getParams[1].split('&') : getParams[1];

        // params is a string
        // if(splitParams.length === 1){
        //     return `#${splitParams[0]}`;
        // }

        // params is an array
        // return convertArrayToObject(splitParams);


        if(hasSharp === false){
            return window.location.hash.split("#")[1];
        }

        return window.location.hash;
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

