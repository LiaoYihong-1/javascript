Function.prototype.myCall = function(context, ...args) {
    context = context || globalThis;

    let fnSymbol = Symbol('call');

    context[fnSymbol] = this;

    let result = context[fnSymbol](...args);

    delete context[fnSymbol];

    return result;
};

Function.prototype.myApply = function(context, argsArray) {
    context = context || globalThis;

    if (!Array.isArray(argsArray)) {
        return null;
    }

    let fnSymbol = Symbol('apply');

    context[fnSymbol] = this;

    let result = context[fnSymbol](...argsArray);

    delete context[fnSymbol];

    return result;
};

Function.prototype.myBind = function(context, ...bindArgs) {
    const originalFunc = this;

    return function(...callArgs) {
        const allArgs = bindArgs.concat(callArgs);

        return originalFunc.myApply(context, allArgs);
    };
};
