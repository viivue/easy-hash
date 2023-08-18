import {fireEvent} from "./helpers";
import {convertArrayToObject} from "@/utils";

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

        // event: execute when change hash
        fireEvent(this);
    }

    /**
     * Add new hash
     * @param hash
     */
    add(hash){
        this.data.previousHash = window.location.hash;
        if(typeof hash === 'object'){

            // convert object to string
            const hashObject = [];
            for(const [key, value] of Object.entries(hash)){
                hashObject.push(`${key}=${value}`);
            }
            const getHashObject = hashObject.toString().replace(",", "&");

            this.data.currentHash = `#${getHashObject}`;
            history.replaceState(null, null, `#${getHashObject}`);
        }else{

            const splitHash = hash.split('#');

            if(hash === ""){
                this.data.currentHash = "";
            }else{
                this.data.currentHash = `${splitHash[0] === "" ? hash : `#${hash}`}`
            }

            history.replaceState(null, null, hash === "" ? window.location.pathname : this.data.currentHash);

        }

        fireEvent(this);
    }

    /**
     * Remove current hash
     */
    remove(){
        this.data.previousHash = window.location.hash;
        history.replaceState(null, null, window.location.pathname);
        this.data.currentHash = "";

        fireEvent(this);
    }

    /**
     * Get current hash
     */
    getHash(){
        if(window.location.hash === ''){
            return '';
        }

        const getParams = window.location.hash.split("#");

        // params contains '&' => object, not contain '&' => string
        const splitParams = getParams[1].split('&') ? getParams[1].split('&') : getParams[1];

        // params is a string
        if(splitParams.length === 1){
            return `#${splitParams[0]}`;
        }


        return convertArrayToObject(splitParams);

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
window.HashManager = new HashManager();

