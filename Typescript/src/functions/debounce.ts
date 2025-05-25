export function debounce<F extends (...args: any[]) => any>(fn: F, delay: number): F {
    let timer: ReturnType<typeof setTimeout> | null = null;

    return function (this: ThisParameterType<F>, ...args: F[]) {
        // clean old timer
        if (timer) {
            clearTimeout(timer);
        }
        // keep last timer
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    } as F;
}
