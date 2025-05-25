export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
    let result: Record<string, T[]> = {};
    if(typeof key == "function"){
        throw new TypeError("key can't be a function")
    }
    array.forEach(item => {
        const groupKey = String(item[key]);

        if (!result[groupKey]) {
            result[groupKey] = [];
        }

        result[groupKey].push(item);
    });

    return result;
}