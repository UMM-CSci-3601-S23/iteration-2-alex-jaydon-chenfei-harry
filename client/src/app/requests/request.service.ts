import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Request, ItemType, FoodType } from './request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  // The URL for the requests part of the server API
  readonly requestUrl: string = `${environment.apiUrl}requests`;
  readonly newRequestUrl: string = `${environment.apiUrl}requests/new`;
  readonly updatedCardUrl: string = `${environment.apiUrl}requests/edit/`;

  private readonly itemTypeKey = 'itemType';
  private readonly foodTypeKey = 'foodType';

  constructor(private httpClient: HttpClient) {
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
}
