export function mergeDeep<A, B>(a: A, b: B): A & B {
    if (a === null || a === undefined) return b as A & B;
    if (b === null || b === undefined) return a as A & B;

    if (Array.isArray(a) || Array.isArray(b)) {
        return b as A & B;
    }

    if (typeof a !== 'object' || typeof b !== 'object') {
        return b as A & B;
    }
    // keep a if repeats and not object
    let result = { ...a } as A & B;
    let resultRef = result as any;
    for (let key in b) {
        if (a.hasOwnProperty(key)) {
            let aValue = (a as any)[key];
            if(aValue != null &&  b[key] != null && typeof aValue === typeof b[key] && isObject(b[key])){
                resultRef[key] = mergeDeep((a as any)[key],b[key])
            }
        }else{
            resultRef[key] = b[key]
        }
    }

    return result;
}
function isObject(item: any): item is object {
    return item !== null && typeof item === 'object' && !Array.isArray(item);
}