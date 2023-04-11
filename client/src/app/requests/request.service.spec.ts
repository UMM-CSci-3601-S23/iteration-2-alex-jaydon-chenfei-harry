import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Request } from './request';
import { RequestService } from './request.service';
import { environment } from 'src/environments/environment';
import { MockRequestService } from 'src/testing/request.service.mock';

describe('RequestService', () => {
  //small collection of test Requests
  const testRequests: Request[] = [
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

  let requestService: RequestService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    requestService = TestBed.inject(RequestService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('When getRequests() is called with no parameters', () => {
    it('calls `api/requests`', () => {
      const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testRequests));

      requestService.getRequests().subscribe(() => {
        expect(mockedMethod)
          .withContext('one call')
          .toHaveBeenCalledTimes(1);

        expect(mockedMethod)
          .withContext('talks to the correct endpoint')
          .toHaveBeenCalledWith(requestService.requestUrl, { params: new HttpParams() });
      });
    });
  });

  describe('When getRequests() is called with a parameter', () => {
    //test food top level category
    it('correctly calls api/requests with itemType \'food\'', () => {
      const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testRequests));

      //getting requests with top category food
      requestService.getRequests({itemType: 'food'}).subscribe(() => {
        expect(mockedMethod)
          .withContext('one call')
          .toHaveBeenCalledTimes(1);

        expect(mockedMethod)
          .withContext('talks to the correct endpoint')
          .toHaveBeenCalledWith(requestService.requestUrl, { params: new HttpParams().set('itemType', 'food')});
      });
    });
    //test a foodType level category
    it('correctly calls api/requests with foodType \'dairy\'', () => {
      const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testRequests));

      //get requests with foodType dairy
      requestService.getRequests({foodType: 'dairy'}).subscribe(() => {
        //check if called once
        expect(mockedMethod)
          .withContext('one call')
          .toHaveBeenCalledTimes(1);
        //check if it's at the correct endpoint
        expect(mockedMethod)
          .withContext('talks to the correct endpoint')
          .toHaveBeenCalledWith(requestService.requestUrl, { params: new HttpParams().set('foodType', 'dairy')});
      });
    });
  });

  describe('When getRequests() is called with multiple parameters', () => {
    //test a itemType 'food' with a foodType 'meat'
    it('correctly calls api/requests with itemType \'food\' and foodType \'meat\'', () => {
      const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testRequests));

      requestService.getRequests({itemType: 'food', foodType: 'meat'}).subscribe(() => {
        //This gets the arguments for the first call to the 'mockMethod'
        const [url, options] = mockedMethod.calls.argsFor(0);
        //Gets the HttpParams from the options part of the call
        const calledHttpParams: HttpParams = (options.params) as HttpParams;
        expect(mockedMethod)
          .withContext('one call')
          .toHaveBeenCalledTimes(1);

        expect(url)
          .withContext('talks to the correct endpoint')
          .toEqual(requestService.requestUrl);

        expect(calledHttpParams.get('itemType'))
          .withContext('type of item')
          .toEqual('food');

        expect(calledHttpParams.get('foodType'))
          .withContext('type of food')
          .toEqual('meat');
      });
    });
  });

  describe('filterRequests', ()=> {
    it('returns the correct array of requests', ()=>{
      expect(requestService.filterRequests(testRequests) === testRequests);
    });
  });

  describe('addRequest', ()=> {
    it('talks to the right endpoint and is called once', waitForAsync(() => {
      // Mock the `httpClient>>>>>>> Presentation.addUser()` method, so that instead of making an HTTP request,
      // it just returns our test data.
      const REQUEST_ID = '2';
      const mockedMethod = spyOn(httpClient, 'post').and.returnValue(of(REQUEST_ID));

      // paying attention to what is returned (undefined) didn't work well here,
      // but I'm putting something in here to remind us to look into that
      requestService.addRequest(testRequests[1]).subscribe((returnedString) => {
        console.log('The thing returned was:' + returnedString);
        expect(mockedMethod)
          .withContext('one call')
          .toHaveBeenCalledTimes(1);
        expect(mockedMethod)
          .withContext('talks to the correct endpoint')
          .toHaveBeenCalledWith(requestService.newRequestUrl, testRequests[1]);
      });
  }));
    it('returns an error if the request fails', () => {
      const mockHttpClient = spyOn(httpClient, 'post').and.returnValue(throwError('Error'));

      requestService.addRequest(testRequests[1]).subscribe(
        () => fail('Expected error to be thrown'),
        (error) => expect(error).toEqual('Error')
      );
    });
});
  describe('updateCard', () => {

    it('sends a PUT request to the correct endpoint and is called once', () => {
      const mockHttpClient = spyOn(httpClient, 'put').and.returnValue(of({ id: 'test-id' }));
      const testId = 'test-id';

      requestService.updateCard(testRequests[1], testId).subscribe((returnedString) => {
        expect(mockHttpClient).toHaveBeenCalledTimes(1);
        expect(mockHttpClient).toHaveBeenCalledWith(requestService.updatedCardUrl + testId, testRequests[1]);
        expect(returnedString).toEqual('test-id');
      });
    });

    it('returns an error if the server responds with an error status code', () => {
      spyOn(httpClient, 'put').and.returnValue(throwError({ status: 404 }));

      requestService.updateCard(testRequests[1], '1').subscribe({
        error: (err) => {
          expect(err.status).toBe(404);
        },
      });
    });

    it('returns the correct data if the server responds with a success status code and the `id` property is present', () => {
      const updatedId = 'updated-id';
      spyOn(httpClient, 'put').and.returnValue(of({ id: updatedId }));

      requestService.updateCard(testRequests[1], '1').subscribe((id) => {
        expect(id).toEqual(updatedId);
      });
    });

    it('returns null if the server responds with a success status code but the `id` property is not present', () => {
      spyOn(httpClient, 'put').and.returnValue(of({}));

      requestService.updateCard(testRequests[1], '1').subscribe((id) => {
        expect(id).toEqual(undefined);
      });
    });
  });
  describe('addRequestPriority', () => {
    let httpClientSpy: { put: jasmine.Spy };
    let service: RequestService;

    beforeEach(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['put']);
      service = new RequestService(httpClientSpy as any);
    });

    it('should update request priority', () => {
      const priorityGiven = '2';
      const expectedPriority = 2;

      httpClientSpy.put.and.returnValue(of({ priority: expectedPriority }));

      service.addRequestPriority(testRequests[1], priorityGiven).subscribe(priority => {
        expect(priority).toEqual(expectedPriority);
      });

      expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
      expect(httpClientSpy.put.calls.mostRecent().args[0]).toEqual(`${service.priorityUrl}/${testRequests[1]._id}`, 'URL');
      expect(httpClientSpy.put.calls.mostRecent().args[1].toString()).toEqual('2', 'priorityGiven as param');
    });

    it('should return the correct priority when updating the request priority', () => {
      const priorityGiven = '1';
      const expectedPriority = 1;

      httpClientSpy.put.and.returnValue(of({ priority: expectedPriority }));

      service.addRequestPriority(testRequests[2], priorityGiven).subscribe(priority => {
        expect(priority).toEqual(expectedPriority);
      });

      expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
      expect(httpClientSpy.put.calls.mostRecent().args[0]).toEqual(`${service.priorityUrl}/${testRequests[2]._id}`, 'URL');
      expect(httpClientSpy.put.calls.mostRecent().args[1].toString()).toEqual('1', 'priorityGiven as param');
    });

    it('should send the correct data to the server when updating the request priority', () => {
      const priorityGiven = '3';
      const expectedPriority = 3;

      httpClientSpy.put.and.returnValue(of({ priority: expectedPriority }));

      service.addRequestPriority(testRequests[0], priorityGiven).subscribe();

      expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
      expect(httpClientSpy.put.calls.mostRecent().args[0]).toEqual(`${service.priorityUrl}/${testRequests[0]._id}`, 'URL');
      expect(httpClientSpy.put.calls.mostRecent().args[1].toString()).toEqual('3', 'priorityGiven as param');
    });
  });
});


