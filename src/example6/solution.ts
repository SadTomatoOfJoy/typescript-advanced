/*
* The never type disappears in union type. So string | never = string.
* Here, we filter the string or number fields of a type thnaks to the never type.
* For example, if we have a type with {a: string, b: number, c: Date}, we first create
* a type {a: 'a', b: 'b', c: never}. Then when we form a union type from all the type values.
*  
*/
type OnlyStringKeys<T> = { [key in keyof T]: T[key] extends string | number ? key : never }[keyof T];

function groupBy<T extends {}>(array: T[], key: OnlyStringKeys<T>): {[k: string]: T[]}{
    return {};
};

const array = [{a:'1', b: 4, c: new Date()}, {a:'2', b: 5, c: new Date()}]

const grouped = groupBy(array, 'b');
const group = grouped.anything;
