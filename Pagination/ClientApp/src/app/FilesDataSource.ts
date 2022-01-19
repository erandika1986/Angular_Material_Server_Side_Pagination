import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { BehaviorSubject, catchError, merge, Observable, startWith, switchMap, of as observableOf, map} from "rxjs";
import { ClientService } from "./client.service";
import { ClientModel } from "./models/client.model";

export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _pageSize = new BehaviorSubject(2);
    private _status = new BehaviorSubject(1);
    private _totalRecordNumber= new BehaviorSubject(0);

    constructor(
        private _clientService: ClientService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this._matSort.sortChange.subscribe(() => this._matPaginator.pageIndex = 0);
    }

    connect(): Observable<ClientModel[]>
    {
        console.log('Connecting....');

        console.log(this._matPaginator); 
        console.log(this._matSort);

        const displayDataChanges = [
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
        .pipe(
          startWith({}),
          switchMap(() => {
            return this._clientService!
            .findClients(this.filter,this._matPaginator.pageIndex+1,this.pageSize,this.status)
            .pipe(catchError(() => observableOf(null)));
          }),
          map(data => {
  
            if (data === null) {
              return [];
            }
            this.totalRecord =data.totalRecordCount;
            return data.data;
          }),
        )
    }


    disconnect(): void
    {

    }


    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    get pageSize():number
    {
        return this._pageSize.value;
    }

    set pageSize(value:number)
    {
        this._pageSize.next(value);
    }

    get status():number
    {
        return this._status.value;
    }

    set status(value:number)
    {
        this._status.next(value);
    }

    get totalRecord():number
    {
        return this._totalRecordNumber.value;
    }

    set totalRecord(value:number)
    {
        this._totalRecordNumber.next(value);
    }
}