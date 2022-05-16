### Concepts ### 
* Declaration merging: When you define the same interface twice, typescript will merge the two declaration onto one
* Module augmentation: adding features to modules or global using declaration merging and modification at runtime.

**Documentation:** https://www.typescriptlang.org/docs/handbook/declaration-merging.html

### Context ###
We want to add a findLast function to the global Array interface that is like `find` but it returns the last one instead of the first one.