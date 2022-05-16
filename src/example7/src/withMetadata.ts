// That's actually the same as the second way in the type augmenting section. Reflect metadata augments the existing Reflect API.
import "reflect-metadata";
import {getParamNames} from "./getParamNames";

const queryParamTypes: QueryParamType[] = [];

class TestHandler {
    @Lambda
    getData(@QueryParam id: string,
            @QueryParam size: number) {
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
* argument decorator keep the type in an array. The difference is that now, we use the emitted metadata
* instead of providing the type ourselves
*/
function QueryParam(target: Object, propertyKey: string | symbol,
    parameterIndex: number) {
const parameterTypes = Reflect.getMetadata('design:paramtypes', target, propertyKey);
queryParamTypes[parameterIndex] = parameterTypes[parameterIndex].name  ;
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