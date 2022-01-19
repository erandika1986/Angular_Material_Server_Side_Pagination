import { ClientModel } from "./client.model";

export interface ClientPaginatedItemModel
{
    currentPage:number;
    pageSize:number;
    totalPageCount:number;
    totalRecordCount:number;
    data:ClientModel[];
}