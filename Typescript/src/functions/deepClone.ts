export function deepClone<T>(obj: T): T {
    if (obj === null || typeof obj!== 'object') {
        return obj;
    }
    let clone: any;
    if (Array.isArray(obj)) {
        clone = [];
        for (let i = 0; i < obj.length; i++) {
            clone[i] = deepClone(obj[i]);
        }
    } else {
        clone = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                clone[key] = deepClone(obj[key]);
            }
        }
    }
    return clone;
}
