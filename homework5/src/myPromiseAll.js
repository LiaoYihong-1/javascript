function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        let results = new Array(promises.length);

        let completed = 0;

        // if empty, then return
        if (promises.length === 0) {
            resolve(results);
            return;
        }

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then((value) => {
                    results[index] = value;
                    completed++;
                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    });
}

module.exports = {
    myPromiseAll
};