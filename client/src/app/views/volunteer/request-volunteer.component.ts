import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { Request, ItemType, FoodType } from '../../requests/request';
import { RequestService } from '../../requests/request.service';

@Component({
  selector: 'app-request-volunteer',
  templateUrl: './request-volunteer.component.html',
  styleUrls: ['./request-volunteer.component.scss'],
  providers: []
})
export class RequestVolunteerComponent implements OnInit, OnDestroy {
  public serverFilteredRequests: Request[];
  public filteredRequests: Request[];

  public requestItemType: ItemType;
  public requestDescription: string;
  public requestFoodType: FoodType;

  private ngUnsubscribe = new Subject<void>();
  private priorityMap = {
    high: 0,
    medium: 1,
    low: 2
  };

  constructor(
    private requestService: RequestService,
    private snackBar: MatSnackBar
  ) {}

  // Gets the requests from the server with the correct filters
  getRequestsFromServer(): void {
    this.requestService
      .getRequests({
        itemType: this.requestItemType,
        foodType: this.requestFoodType
      })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (returnedRequests: Request[]) => {
          this.serverFilteredRequests = returnedRequests;
          this.updateFilter();
        },

        error: (err: any) => {
          let message = '';
          if (err.error instanceof ErrorEvent) {
            message = `Problem in the client – Error: ${err.error.message}`;
          } else {
            message = `Problem contacting the server – Error Code: ${err.status}\nMessage: ${err.message}`;
          }
          this.snackBar.open(message, 'OK', { duration: 5000 });
        }
      });
  }

  public updateFilter(): void {
    this.serverFilteredRequests.sort((a: Request, b: Request) => {
      const priorityA = this.priorityMap[a.foodType];
      const priorityB = this.priorityMap[b.foodType];

      // sort by priority first
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      // if priorities are equal, sort by requestPriority
      const requestPriorityA = a.requestPriority || 0;
      const requestPriorityB = b.requestPriority || 0;
      return requestPriorityB - requestPriorityA;
    });

    this.filteredRequests = [...this.serverFilteredRequests];
  }

  ngOnInit(): void {
    this.getRequestsFromServer();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // Sorts the requests based on request priority and filters out requests with a priority less than 2
  sortRequests() {
    this.filteredRequests.sort((a, b) => {
      const priorityA = this.priorityMap[a.foodType];
      const priorityB = this.priorityMap[b.foodType];

      // sort by priority first
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      // if priorities are equal, sort by requestPriority
      return b.requestPriority - a.requestPriority;
    });
  }



  // Updates the request priority for a specific request and then sorts the requests based on priority
  updateRequestPriority(request: Request, priority: number) {
    request.requestPriority = priority;
    this.sortRequests();
  }
}
