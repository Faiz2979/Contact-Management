

export class WebResponse<T>{
    data?: T;
    errors?: string;
    paging?: Paging;
}

export class Paging{
    size: number;
    page: number;
    total_page: number;
}

