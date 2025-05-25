export function memoize<F extends (...args: any[]) => any>(fn: F): F {
    const cache = new Map<string, ReturnType<F>>();

    return function (this: ThisParameterType<F>, ...args: F[]): ReturnType<F> {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key)!;
        }

        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    } as F;
}
