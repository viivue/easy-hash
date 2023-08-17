/**
 * Fire an event
 * @param context
 */
export function fireEvent(context){
    window.addEventListener("hashchange", () => {
        context.callbacks.forEach(callback => callback(context.data))
    })
}