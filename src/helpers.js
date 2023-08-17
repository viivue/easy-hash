/**
 * Fire an event
 * @param context
 */
export function fireEvent(context){
    window.addEventListener("hashchange", () => {
        context.eventList.forEach(callback => callback(context.data))
    })
}