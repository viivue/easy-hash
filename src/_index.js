import {fireEvent} from "./helpers";

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
        if(typeof hash !== 'object'){
            this.data.previousHash = this.getHash();

            const splitHash = hash.split('#');
            this.data.currentHash = hash === "" ? "" : `${splitHash[0] === "" ? hash : `#${hash}`}`;
            history.replaceState(null, null, hash === "" ? window.location.pathname : this.data.currentHash);
        }else{
            this.data.previousHash = window.location.hash;

            // convert object to string
            const hashObject = [];
            for(const [key, value] of Object.entries(hash)){
                hashObject.push(`${key}=${value}`);
            }
            const getHashObject = hashObject.toString().replace(",", "&");

            this.data.currentHash = `#${getHashObject}`;
            history.replaceState(null, null, `#${getHashObject}`);
        }

        fireEvent(this);
    }

    /**
     * Remove current hash
     */
    remove(){
        this.data.previousHash = this.getHash();
        history.replaceState(null, null, window.location.pathname);
        this.data.currentHash = "";

        fireEvent(this);
    }

    /**
     * Get current hash
     */
    getHash(){
        if(window.location.hash === ''){
            return "";
        }

        const getParams = window.location.hash.split("#");

        const splitParams = getParams[1].split("&") ? getParams[1].split("&") : getParams[1];

        if(splitParams.length === 1){
            return `#${splitParams[0]}`;
        }

        // Covert array to object
        const values = [];
        splitParams.forEach(param => {
            const newParam = param.split("=");
            values.push({"key": newParam[0], "value": newParam[1]})
        })
        return values.reduce((obj, item) => Object.assign(obj, {[item.key]: item.value}), {});

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

