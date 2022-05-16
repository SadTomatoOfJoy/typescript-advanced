const DATA: Something = [];

type Pageable = {
    size: number,
    page: number,
}

type Paginated<T> = {
    data: T[],
    hasMore: boolean,
}

class Something {}
/* to overload, we define abstract functions with the signatures we want and one implementation that will actually take as a parameter
 * the union of all the parameters and will return the union of the return types. The implementation has to manage the
 * actual return value according to the params we pass.
*/
class SomethingRepositoryWithOverloading {
    findAll(): Something[];
    findAll(pageable: Pageable): Paginated<Something>;
    findAll(pageable?: Pageable): Something[] | Paginated<Something> {
        return pageable ? { data: [], hasMore: false} : [];
    }
}

const arrayResult = new SomethingRepositoryWithOverloading().findAll();
const paginatedResult = new SomethingRepositoryWithOverloading().findAll({size: 1, page: 5});
