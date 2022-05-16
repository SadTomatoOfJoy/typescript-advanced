interface Array<T> {
    findLast(predicate: (value: T) => boolean): T | undefined;
}
