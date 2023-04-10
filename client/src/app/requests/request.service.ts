import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Request, ItemType, FoodType } from './request';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  static addRequest(addRequest: any) {
    throw new Error('Method not implemented.');
  }
  // The URL for the requests part of the server API
  readonly requestUrl: string = `${environment.apiUrl}requests`;
  readonly newRequestUrl: string = `${environment.apiUrl}requests/new`;
  readonly priorityUrl: string = `${environment.apiUrl}requests/set-priority`;
  readonly updatedCardUrl: string = `${environment.apiUrl}requests/edit/`;

  private readonly itemTypeKey = 'itemType';
  private readonly foodTypeKey = 'foodType';
  private readonly priorityKey = 'priority';

  constructor(private httpClient: HttpClient) {
  }

  public getPriorityKey(): string {
    return this.priorityKey;
  }

  getRequests(filters?: {name?: string; itemType?: ItemType; foodType?: FoodType}): Observable<Request[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.itemType) {
        httpParams = httpParams.set(this.itemTypeKey, filters.itemType);
      }
      if (filters.foodType) {
        httpParams = httpParams.set(this.foodTypeKey, filters.foodType);
      }
    }
    return this.httpClient.get<Request[]>(this.requestUrl, {
      params: httpParams,
    });

  }

  filterRequests(requests: Request[]): Request[] {
    const filteredRequests = requests;

    return filteredRequests;
  }

  addRequest(newRequest: Partial<Request>): Observable<string> {
    // Send post request to add a new Request with the Request data as the body.
    return this.httpClient.post<{id: string}>(this.newRequestUrl, newRequest).pipe(map(res => res.id));
  }


  updateCard(updatedCard: Partial<Request>, _id: string ): Observable<string> {
    return this.httpClient.put<{id: string}>(this.updatedCardUrl + _id, updatedCard).pipe(map(res => {
      console.log(res);
      return res.id;
    }));
  }

  /*setPriority(key: string, value: any){
    localStorage.setItem(key,JSON.stringify(value));
  }

  getPriority(key: string){
    localStorage.getItem(key);
  }

  sendSortedRequests(requests: Request[]): Observable<void> {
    const requestOptions = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      // I am not really sure why this is necessary? Ask Harry what is going on here.
    };
    return this.httpClient.put<void>(`${this.requestUrl}/sorted`, requests, requestOptions);
  }*/
  addRequestPriority(request: Request, priorityGiven: string): Observable<number> {
    // Send a POST request to change the priority of a Request object.
    // Requires a Request object that contains an _id field, as well as a priority value!

    // vvvv WE JUST NEED THIS PART WORKING vvvv
    // How to make it call the Server url with the requested priority parameter?
    // A correct HTTP put request should look like this:
    // http://localhost:{serverPort}/requests/set-priority/{id}?priority={priorityNumber}
    // with the right values in the {}

    // PUT http://localhost:4562/api/requests/set-priority/588935f57546a2daea44de7c?priority=2
    const putUrl = `${this.priorityUrl}/${request._id}`;
    const priorityBody = new HttpParams().set(this.priorityKey, priorityGiven);

    return this.httpClient.put<{priority: number}>(putUrl, priorityGiven, {
      params: priorityBody,
    }).pipe(map(res => res.priority));
  }


}
