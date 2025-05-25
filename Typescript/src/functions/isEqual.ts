function isEqual(o1: any, o2: any): boolean {
    const t1: string = typeof o1;
    const t2: string = typeof o2;
    if (t1!== t2) {
        return false;
    }
    if (t1!== "object" || o1 === null || o2 === null) {
        return o1 === o2;
    } else {
        if ((o1 === null && o2!== null) || (o1!== null && o2 === null)) {
            return false;
        }
        if (o1.constructor!== o2.constructor) {
            return false;
        }
        const props1: Array<string | symbol> = Reflect.ownKeys(o1);
        const props2: Array<string | symbol> = Reflect.ownKeys(o2);

        if (props1.length!== props2.length) {
            return false;
        }

        for (const prop of props1) {
            const val1: any = o1[prop];
            const val2: any = o2[prop];

            if (typeof val1 === 'object' && val1!== null &&
                typeof val2 === 'object' && val2!== null) {
                if (!isEqual(val1, val2)) {
                    return false;
                }
            } else if (val1!== val2) {
                return false;
            }
        }
    }
    return true;
}

export { isEqual };