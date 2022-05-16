### Concepts ### 
* const assertion : immutable variable and values as typings
* Conditional type: variable typing according to a generic
* Conditional typing inference: use a typing contained in the extended clause of the conditional type
* Indexed access type: access the typing of a subset of a type

**Documentation:** 
https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html
https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html

### Context ###
We have a config object that we want to use for some validation:
```
const configValidation = {
    airtable: {
        type: 'json',
        fields: ['host', 'key'],
    },
    google: {
        type: 'json',
        fields: ['id', 'secret'],
    },
    trustedIps: {
        type: 'array',
        convertor: (data: any[]) => [1, 2, 3]
    }
}
```
We also want to have a getConfig function that will get the right typing according to the config we want. 
For example, if I want the airtable config it should return an object with typing {host: string, key: string}

Lastly when the type of the config is array, I want to be able to specify a convertor function which return type should be the typing of the returned array.
