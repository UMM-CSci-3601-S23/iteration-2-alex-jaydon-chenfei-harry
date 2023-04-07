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
      _id: '1',
      name: 'bob',
      itemType: 'food',
      description: 'I would like to be able to get some spaghetti noodles',
      foodType: 'grain',
      priority: 3
    },
    {
      _id: '2',
      name: 'tim',
      itemType: 'toiletries',
      description: 'I need some toothpaste',
      foodType: '',
      priority: 4
    },
    {
      _id: '3',
      name: 'timmy',
      itemType: 'other',
      description: 'Would it be possible for me to get some Advil?',
      foodType: '',
      priority: 1
    }
  ];

  constructor() {
    super(null);
  }

  getRequests(filters?: { itemType?: ItemType; foodType?: FoodType }): Observable<Request[]> {
      return of(MockRequestService.testRequests);
  }


}
