### Concepts ### 
* Overloading: having a same function  with different signatures

**Documentation:** https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads

### Context ###
instead of having two different functions, we can regroup logically linked functions by creating a single function with different signatures. In this example, we want to recreate a Springboot-like function: when you pass a pageable object, it should return a Paginated object containing our data, otherwise it should just return the data itself.