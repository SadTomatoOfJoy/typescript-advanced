### Concepts ### 
* Decorator: A structural design pattern to alter or add functionality
* Reflect: A javascript reflection API that you can augment for typescript with libraries like reflec metadata

**Documentation:** https://www.typescriptlang.org/docs/handbook/decorators.html

### Context ###
We want to make a framework for aws lambda handlers. One way yo do this would be to make a class that contains a function annotated with @Lambda that will be the handler function. Its parameters annotated with @Queryparam should be taken from event.queryStringParameters. Below is an example of a typical handler function:
```
const testHandler = (event: any) => {
    const id = event.queryStringParameters['id'];
    const size = Number(event.queryStringParameters['size']);
    return {
        statusCode: 200,
        body: JSON.stringify({'message': `id ${id} and size ${size}`}),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
    }
}
```