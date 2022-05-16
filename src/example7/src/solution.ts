import {getParamNames} from "./getParamNames";

const queryParamTypes: QueryParamType[] = [];

class TestHandler {
    @Lambda
    getData(@QueryParam('string') id: string,
            @QueryParam('number') size: number) {
        return `id ${id} and size ${size}`
        }
}

/*
* A function decorator that does the heavy lifting. We replace the original function by 
* another handler function. We take the arguments we want from the event and then pass it
* to the original function to finally return a formatted response. 
*/
function Lambda(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod: Function = descriptor.value;
    descriptor.value = async function (event: any) {
        const args = getArgumentsFromEvent(originalMethod, event);
        const resultOfOriginalMethod = await originalMethod.apply(this, args);
        return {
            statusCode: 200,
            body: JSON.stringify({'message': resultOfOriginalMethod}),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
        };
    }
}

type QueryParamType = 'string' | 'number' | 'boolean';

/* 
* argument decorator to just keep the type in an array
*/
function QueryParam(type: QueryParamType) {
    return (target: any, functionName: string, parameterIndex: number) => {
        queryParamTypes[parameterIndex] = type;
    }
}

function getArgumentsFromEvent(originalMethod: Function, event: any){
    const paramNames = getParamNames(originalMethod);
    return queryParamTypes.map((type,i) => {
        const name = paramNames[i];
        const queryParamStringValue = event.queryStringParameters[name];
        return convertValue(queryParamStringValue, type);
    })
}

function convertValue(value: string, type: QueryParamType){
    if(type === 'number'){
        return Number(value);
    } else if (type === 'boolean'){
        return value === 'true';
    } else {
        return value;
    }
}

(new TestHandler() as any)
    .getData({queryStringParameters: {id: '5', size: '6'}})
    .then((result: any) =>
        console.log(result)
    );
