Array.prototype.findLast = function (predicate) {
    return this.reverse().find(predicate);
};
