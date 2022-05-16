type FileConfigNormal = {
    fileName: string,
    lambdaName: string,
    sortType: Exclude<InputFluxSortTypes, InputFluxSortTypes.TIMESTAMP>,
}

type FileConfigTimeStamp = Omit<FileConfigNormal, 'sortType'> & {
    sortType: InputFluxSortTypes.TIMESTAMP, // Discriminant
    getTimestamp: (fileName: string) => number,
}

type File3ConfigFile = Omit<FileConfigNormal, 'fileName'> & {
    fileName: 'file3' | 'File 3 must be the last element to be processed' // Discriminant
}

type FileConfig = FileConfigNormal | FileConfigTimeStamp

enum InputFluxSortTypes {
    TIMESTAMP,
    ALPHABETICAL,
    NONE
}

// Dynamic tuple.
const globalConfig: [...FileConfig[], File3ConfigFile ] = [
    {
        fileName: 'file1',
        lambdaName: 'file1Processor',
        sortType: InputFluxSortTypes.ALPHABETICAL
    },
    {
        fileName: 'file2',
        lambdaName: 'file2Processor',
        sortType: InputFluxSortTypes.TIMESTAMP,
        getTimestamp: () => 1
    },
    {
        fileName: 'file2',
        lambdaName: 'file2Processor',
        sortType: InputFluxSortTypes.NONE,
    },
    {
        fileName: 'file3',
        lambdaName: 'file2Processor',
        sortType: InputFluxSortTypes.NONE,
    },
];


// type guard for filter
const isTimeStampConfig = (fileConfig: FileConfig): fileConfig is FileConfigTimeStamp => 'fileName' in fileConfig
// the array is cast to the corresponding type thanks to the type guard
const iAmOfTimestampType = globalConfig.filter(isTimeStampConfig);