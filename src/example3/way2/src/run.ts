/* If we want to externalize the type augmentation in another file, we can also
* just import it as a side effect in the file you want to get the augmentation.
* a notable example of a library that we import like that is reflect-metadata
*/
import "./findLast"
const testArray = [1,2,3,4,5,6];
console.log(testArray.findLast((elem)=> elem > 4));
