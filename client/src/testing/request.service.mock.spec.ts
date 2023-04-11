import { TestBed } from '@angular/core/testing';
import { MockRequestService } from './request.service.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MockRequestService', () => {
  let service: MockRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MockRequestService],
    });
    service = TestBed.inject(MockRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addRequest', () => {
    it('should return newRequestId when request is not null', (done: DoneFn) => {
      const request = { description: 'Nature valley bars', itemType: 'food', foodType:'grain' };

      service.addRequest(request).subscribe(response => {
        expect(response).toEqual('newRequestId');
        done();
      });
    });

    it('should return an error when request is null', (done: DoneFn) => {
      service.addRequest(null).subscribe(
        () => {},
        error => {
          expect(error).toEqual({ status: 500, message: 'Internal server error' });
          done();
        }
      );
    });
  });

  describe('updateCard', () => {
    it('should return editCardId when request is not null', (done: DoneFn) => {
      const request = { description: 'Nature valley bars', itemType: 'food', foodType: 'grain' };

      service.updateCard(request).subscribe(response => {
        expect(response).toEqual('editCardId');
        done();
      });
    });

    it('should return an error when request is null', (done: DoneFn) => {
      service.updateCard(null).subscribe(
        () => {},
        error => {
          expect(error).toEqual({ status: 500, message: 'Internal server error' });
          done();
        }
      );
    });
  });


});
