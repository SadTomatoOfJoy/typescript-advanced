interface Array<T> {
    findLast(predicate: (value: T) => boolean): T | undefined;
}

Array.prototype.findLast = function (predicate) {
    return this.reverse().find(predicate);
};