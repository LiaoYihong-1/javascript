export function once<F extends (...args: any[]) => any>(func: F): F {
    let hasBeenCalled = false;
    let result: ReturnType<F>;

    return function (...args: F[]) {
        if (!hasBeenCalled) {
            result = func(...args);
            hasBeenCalled = true;
        }
        return result;
    } as F;
}