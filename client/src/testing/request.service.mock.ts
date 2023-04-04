import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Request, ItemType, FoodType } from 'src/app/requests/request';
import { RequestService } from 'src/app/requests/request.service';

@Injectable({
  providedIn: AppComponent
})
export class MockRequestService extends RequestService {
  static testRequests: Request[] = [
    {
      _id: '1_id',
      itemType: 'food',
      description: 'I would like some ground beef',
      foodType: 'meat',
      name:''
    },
    {
      _id: '2_id',
      itemType: 'toiletries',
      description: 'I need more toothpaste',
      foodType: '',
      name:''
    },
    {
      _id: '3_id',
      itemType: 'other',
      description: 'I need more paper plates',
      foodType: '',
      name:''
    },
    {
      _id: '4_id',
      itemType: 'food',
      description: 'I would like some milk',
      foodType: 'dairy',
      name:''
    }
  ];

  constructor() {
    super(null);
  }

  getRequests(filters?: { itemType?: ItemType; foodType?: FoodType }): Observable<Request[]> {
      return of(MockRequestService.testRequests);
  }


}
