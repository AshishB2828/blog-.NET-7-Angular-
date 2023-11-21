export class PagedResult<T> {

    noOfPages: number = 0;
    totalCount: number = 0;
    data: Array<T> = [];
    isPrevAvailable: boolean = false;
    isNextAvailable: boolean = false;

    constructor() {

    }

}