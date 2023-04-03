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

  constructor(
    private requestService: RequestService,
    private snackBar: MatSnackBar
  ) {}

  updateRequestPriority(request: Request) {
    request.requestPriority = request.requestPriority;
  }
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
    this.filteredRequests = [...this.serverFilteredRequests];
    this.sortRequests();
  }

  ngOnInit(): void {
    this.getRequestsFromServer();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  sortRequests() {
    this.filteredRequests.sort((a, b) => {
      const priorityA = a.requestPriority || 0;
      const priorityB = b.requestPriority || 0;

      return priorityB - priorityA;
    });
  }
}
