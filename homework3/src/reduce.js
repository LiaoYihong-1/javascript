Array.prototype.myReduce = function (callback, initialValue) {
    if (this === null || this === undefined) {
        //return error when type is null or undefined
        throw new TypeError('called on null or undefined');
    }
    // return error when callback not function
    if (typeof callback!== 'function') {
        throw new TypeError('The callback is not a function');
    }

    let array = Object(this);
    let length = array.length;
    let index = 0;
    let accumulator;

    if (arguments.length === 2) {
         accumulator = initialValue;
    } else {
        if (length === 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        accumulator = array[index++];
    }

    while (index < length) {
        if (index in array) {
            accumulator = callback(accumulator, array[index], index, array);
        }
        index++;
    }

    return accumulator;
};