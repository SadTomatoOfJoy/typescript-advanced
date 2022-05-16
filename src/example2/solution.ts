export const configValidation = {
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
        convertor: (arr: string) => [1],
    }
} as const;

type ConfigType = typeof configValidation;

/*
 If the object for the specified key contains the field "type" with value "json",
 returns a type where the keys come from the "fields" array and have a string value.
 Otherwise, if the object contains the field "type" with value "array", return a string array.
 Otherwise, throw a type error
 */
type ConfigForSpecificKey<K extends keyof ConfigType> = ConfigType[K] extends { type: 'json' } ? { [key in ConfigType[K]['fields'][number]]: string } :
    (ConfigType[K] extends { type: 'array' } ? string[] : never)

/*
Same typing but this time, we take the array type from the return type of the convertor.
 */
type ConfigForSpecificKeyWithConvertor<K extends keyof ConfigType> = ConfigType[K] extends { type: 'json' } ? { [key in ConfigType[K]['fields'][number]]: string } :
    (ConfigType[K] extends { type: 'array' } ? (ConfigType[K] extends { convertor: (arr: string) => (infer U)[] } ? U[] : string[]) : never)

const getConfig = <K extends keyof ConfigType>(configKey: K): ConfigForSpecificKeyWithConvertor<K> => ({}) as any;

// test of typing
const convertorReturnTypeArray = getConfig('trustedIps');
const airtableObject = getConfig('airtable');
