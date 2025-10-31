export const startViewTransition = (callback: () => void) => {
    if (!document.startViewTransition) {
        callback();
    }else{
        document.startViewTransition(callback);
    }
}