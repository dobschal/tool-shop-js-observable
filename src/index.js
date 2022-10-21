/**
 * @typedef {Object} Observable
 * @template O
 * @augements O
 * @property {(key: string, callback: (any) => void) => void} $on
 */

/**
 * @template O
 * @param {O} plainData 
 * @returns Observable<O>
 */
export function Observable(plainData) {
    const listener = [];
    if (Array.isArray(plainData)) {
        return ObservableArray(plainData);
    }
    return new Proxy({
        ...plainData,
        $on(key, callback) {
            listener.push({ key, callback });
            callback(plainData[key]);
        }
    }, {
        set(target, key, value) {
            target[key] = value;
            listener.forEach(({ key: key2, callback }) => {
                if (key === key2) callback(value);
            });
            return true;
        }
    });
}

/**
 * @param {Array<any>} array 
 * @returns {Observable<Array>}
 */
export function ObservableArray(array) {
    const listener = [];

    array.$on = function (key, callback) {
        listener.push({ key, callback });
    };

    const methods = ["filter", "find", "findIndex", "join", "map", "push", "some", "sort"];

    for (const method of methods) {
        array[method] = function (...args) {
            const retVal = Array.prototype[method].apply(this, args);
            listener.forEach(({ key, callback }) => {
                if (key === method) callback(retVal);
            });
            return retVal;
        };
    }

    return array;
}