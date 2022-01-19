import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, fromEvent, Subject, takeUntil } from 'rxjs';
import { ClientService } from './client.service';
import { FilesDataSource } from './FilesDataSource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy,AfterViewInit  {

  clients:any;
  dataSource: FilesDataSource;
  pageSizes:number[] =[2,4,6,8,10,20];
  
  displayedColumns = ['id', 'firstName', 'lastName', 'mobile', 'email'];

  @ViewChild(MatPaginator,{static:true}) 
  paginator: MatPaginator;

  @ViewChild(MatSort, {static:true}) 
  sort: MatSort;

  @ViewChild('filter', {static: true})
  filter: ElementRef;

  private _unsubscribeAll: Subject<any>;

  constructor(private _clientService: ClientService)
  {
    this._unsubscribeAll = new Subject();
  }


  ngOnInit(): void
  {
    this.dataSource = new FilesDataSource(this._clientService, this.paginator, this.sort);

    fromEvent(this.filter.nativeElement, 'keyup')
    .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(150),
        distinctUntilChanged()
    )
    .subscribe(() => {
        if ( !this.dataSource )
        {
            return;
        }

        this.dataSource.filter = this.filter.nativeElement.value;
    });
  }

  ngAfterViewInit() {

  }

  onChangePage(pe:PageEvent) {
    this.dataSource.pageSize = pe.pageSize;
  }

  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }

}
