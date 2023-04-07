import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public sortedRequests: Request[];

  constructor(
    private requestService: RequestService,
    private snackBar: MatSnackBar,
  ){}

  updateRequestPriority(request: Request, priority: string) {
    this.requestService
      .addRequestPriority(request, priority)
      .subscribe({
        next: () => {
          this.updateFilter();
        }
      });
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
    //this.sortRequests();
  }


  ngOnInit(): void {
    this.getRequestsFromServer();
    /*var priority = this.requestService.get('priority');
    if('priority'){
      this.
    }*/
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /*sortRequests() {
    this.sortedRequests = this.filteredRequests.sort((a, b) => {
      const priorityA = a.priority || 0;
      const priorityB = b.priority || 0;
      return priorityB - priorityA;
    });
    this.sendSortedRequests(); // Call sendSortedRequests after sorting
  }

  sendSortedRequests(): void {
    this.requestService.sendSortedRequests(this.sortedRequests).subscribe(() => {
      console.log('Sorted requests sent to the server');
    }, error => {
      console.error('Error sending sorted requests:', error);
    });
  }*/
}
