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
        fireEvent(this)
    }

    /**
     * Add new hash
     * @param hash
     */
    add(hash){
        this.data.previousHash = this.getHash();
        this.data.currentHash = hash;
        window.location.hash = hash;
    }

    /**
     * Remove current hash
     */
    remove(){
        this.data.previousHash = this.getHash();
        window.location.hash = "";
        history.replaceState(null, null, window.location.pathname);
        this.data.currentHash = "";
    }

    /**
     * Get current hash
     */
    getHash(){
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
window.HashManager = new HashManager();

