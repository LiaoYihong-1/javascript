

function deepEqual(o1,o2){
    let t1 = typeof o1
    let t2 = typeof o2
    if(t1 !== t2){
        return false
    }
    if(t1 !== "object" || o1==null||o2==null){
        return o1 === o2;
    }else{
        if((o1 === null && o2 !== null) || (o1 !== null && o2 === null)) {
            return false;
        }
        if(o1.constructor !== o2.constructor){
            return false
        }
        const props1 = Reflect.ownKeys(o1);
        const props2 = Reflect.ownKeys(o2);

        if (props1.length !== props2.length) {
            return false;
        }

        for (const prop of props1) {
            let val1 = o1[prop];
            let val2 = o2[prop];


            if (typeof val1 === 'object' && val1 !== null &&
                typeof val2 === 'object' && val2 !== null) {
                if (!deepEqual(val1, val2)) {
                    return false;
                }
            }
            else if (val1 !== val2) {
                return false;
            }
        }
    }
    return true;
}

module.exports = {
    deepEqual
};