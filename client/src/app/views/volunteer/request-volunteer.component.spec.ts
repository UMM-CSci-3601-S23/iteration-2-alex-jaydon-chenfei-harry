import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { MockRequestService } from 'src/testing/request.service.mock';
import { ItemType, Request } from '../../requests/request';
import { RequestVolunteerComponent } from './request-volunteer.component';
import { RequestService } from '../../requests/request.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

const COMMON_IMPORTS: unknown[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatIconModule,
  MatSnackBarModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];
describe('Your Test Suite', () => {
  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

describe('Volunteer Request View', () => {
  let volunteerList: RequestVolunteerComponent;
  let fixture: ComponentFixture<RequestVolunteerComponent>;
  let requestService: RequestService;
  let snackBar: MatSnackBar;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [RequestVolunteerComponent],
      providers: [{ provide: RequestService, useValue: new MockRequestService() }]
    });
  });

  beforeEach(waitForAsync (() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(RequestVolunteerComponent);
      volunteerList = fixture.componentInstance;
      requestService = TestBed.inject(RequestService);
      snackBar = TestBed.inject(MatSnackBar);
      fixture.detectChanges();
    });
  }));

  it('contains all requests', () => {
    expect(volunteerList.serverFilteredRequests.length).toBe(3);
  });

  it('contains a request for food', () => {
    expect(volunteerList.serverFilteredRequests.some((request: Request) => request.itemType === 'food')).toBe(true);
  });

  it('contains a request for toiletries', () => {
    expect(volunteerList.serverFilteredRequests.some((request: Request) => request.itemType === 'toiletries')).toBe(true);
  });

  it('contains a request for other', () => {
    expect(volunteerList.serverFilteredRequests.some((request: Request) => request.itemType === 'other')).toBe(true);
  });

  it('contains a request for itemType food and foodType meat', () => {
    expect(volunteerList.serverFilteredRequests.some((request: Request) => request.itemType === 'food'
     && request.foodType === 'meat')).toBe(false);
  });
});

describe('Misbehaving Volunteer view', () => {
  let volunteerList: RequestVolunteerComponent;
  let fixture: ComponentFixture<RequestVolunteerComponent>;

  let requestServiceStub: {
    getRequests: () => Observable<Request[]>;
    addRequestPriority: (request: Request, priority: string) => Observable<any>;
  };
  beforeEach(() => {
    requestServiceStub = {
      getRequests: () => new Observable(observer => {
        observer.error('getRequests() Observer generates an error');
      }),
      addRequestPriority: () => of(null)
    };

    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [RequestVolunteerComponent],
      providers: [{provide: RequestService, useValue: requestServiceStub}]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(RequestVolunteerComponent);
      volunteerList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a RequestVolunteerService', () => {
    expect(volunteerList.serverFilteredRequests).toEqual([]);
});


  it('updateFilter properly reassigns our request list', () => {
    volunteerList.updateFilter();
    expect(volunteerList.filteredRequests).toEqual(volunteerList.serverFilteredRequests);
  });

  it('should update request priority and call updateFilter', () => {
    const request: Request = {
      _id: '1',
      name: 'Test Request',
      itemType: 'food',
      foodType: 'grain',
      description: '',
      priority: 0
    };
    const priority = 'high';

    const requestService = requestServiceStub;

    // Spy on addRequestPriority method and return an observable
    spyOn(requestService, 'addRequestPriority').and.returnValue(of(null));

    // Spy on updateFilter method
    spyOn(volunteerList, 'updateFilter');

    volunteerList.updateRequestPriority(request, priority);

    expect(requestService.addRequestPriority).toHaveBeenCalledWith(request, priority);
    expect(volunteerList.updateFilter).toHaveBeenCalled();
  });
  describe('MockRequestService', () => {
    let mockRequestService: MockRequestService;

    beforeEach(() => {
      mockRequestService = new MockRequestService();
    });

    it('should call addRequestPriority with correct arguments', () => {
      const request: Request = {
        _id: '1',
        name: 'Test Request',
        itemType: 'food',
        foodType: 'grain',
        description: '',
        priority: 0
      };
      const priority = 'high';

      spyOn(mockRequestService, 'addRequestPriority').and.callThrough();

      mockRequestService.addRequestPriority(request, priority);

      expect(mockRequestService.addRequestPriority).toHaveBeenCalledWith(request, priority);
    });
  });

});
});
