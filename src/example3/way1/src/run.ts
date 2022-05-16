/*
* If there are two interfaces with the same name, typescript will merge the fields of the two. 
* Here we already have the Array interface coming from typescript itself and we have a new Array
* interface in this file so typescript will merge the two of them. Of course, this is only typing, and 
* in this example, we need to also define the function at runtime if we want it to work.  
*/

interface Array<T> {
    findLast(predicate: (value: T) => boolean): T | undefined;
}

Array.prototype.findLast = function<T>(this: T[], predicate: (value: T) => boolean): T | undefined {
    return this.reverse().find(predicate);
}

const testArray = [1,2,3,4,5,6];
console.log(testArray.findLast((elem)=> elem > 4));
