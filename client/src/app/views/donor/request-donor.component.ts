import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { Request, ItemType, FoodType } from '../../requests/request';
import { RequestService } from '../../requests/request.service';

@Component({
  selector: 'app-request-donor',
  templateUrl: './request-donor.component.html',
  styleUrls: ['./request-donor.component.scss'],
  providers: []
})

export class RequestDonorComponent implements OnInit, OnDestroy {
  public serverFilteredRequests: Request[];
  public sortedRequests: Request[];

  public requestItemType: ItemType;
  public requestFoodType: FoodType;
  private ngUnsubscribe = new Subject<void>();

  constructor(private requestService: RequestService, private snackBar: MatSnackBar) {
  }

  getRequestsFromServer(): void {
    this.requestService.getRequests({
      itemType: this.requestItemType,
      foodType: this.requestFoodType
    }).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: (returnedRequests) => {
        this.serverFilteredRequests = returnedRequests;
        this.sortRequests();
      },

      error: (err) => {
        let message = '';
        if (err.error instanceof ErrorEvent) {
          message = `Problem in the client – Error: {err.error.message}`;
        } else {
          message = `Problem contacting the server – Error Code: ${err.status}\nMessage: ${err.message}`;
        }
        this.snackBar.open(
          message,
          'OK',
          {duration: 5000});
      },
    });
  }

  sortRequests() {
    this.sortedRequests = [...this.serverFilteredRequests].sort((a, b) => {
      const priorityA = a.priority || 0;
      const priorityB = b.priority || 0;
      return priorityB - priorityA;
    });
  }

  ngOnInit(): void {
    this.getRequestsFromServer();
  }

  ngOnDestroy(): void {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
  }
}
