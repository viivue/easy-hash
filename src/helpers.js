/**
 * Fire an event
 * @param context
 */
export function fireEvent(context){
    // compare previous with current hash
    if(context.data.previousHash !== context.data.currentHash){
        context.callbacks.forEach(callback => callback(context.data))
    }
}