import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientPaginatedItemModel } from './models/client.paginated.item.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) { 
  }

  
  findClients(searchText:string,currentPage:number,pageSize:number,status:number):Observable<ClientPaginatedItemModel>
  {
      return this.httpClient.get<ClientPaginatedItemModel>(environment.apiUrl + 'Client/getAllClients',{
          params:new HttpParams()
          .set('searchText',searchText)
          .set('currentPage',currentPage.toString())
          .set('pageSize',pageSize.toString())
          .set('status',status.toString())
        });
  }

}
