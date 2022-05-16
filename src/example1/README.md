### Concepts ### 
* Discriminant: a typing according to a specific value.
* Type guard: a function that automatically cast to a type when filtering
* Variadic tuple: Having ...(like a rest parameter) in a tuple type

**Documentation:** 
https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html
https://www.typescriptlang.org/docs/handbook/2/narrowing.html
https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html

### Context ###
We have a global object for configuring lambdas that will be executed for a specific file. 
```
type FileProcessorConfig = {
    fileName: string,
    lambdaName: string,
    sortType: SortType,
    getTimestamp?: (filename: string) => number
}

enum SortType {
    TIMESTAMP,
    ALPHABETICAL,
    NONE
}

const globalConfig: FileProcessorConfig[] = [
    {
        fileName: 'file1',
        lambdaName: 'file1Processor',
        sortType: SortType.TIMESTAMP // should throw error because no getTimestamp is provided
    },
    {
        fileName: 'file3', // should throw error because not last
        lambdaName: 'file2Processor',
        sortType: SortType.NONE,
    },
    {
        fileName: 'file2',
        lambdaName: 'file2Processor',
        sortType: SortType.ALPHABETICAL,
        getTimestamp: ()=> 1 // should throw error because this function isn't needed
    },

    ];

```

If the sortType is Timestamp, we have to define a getTimestamp function.
The config for the filename 'file3' must always comes last because the ordering is actually important.
We could improve the typing of this config.