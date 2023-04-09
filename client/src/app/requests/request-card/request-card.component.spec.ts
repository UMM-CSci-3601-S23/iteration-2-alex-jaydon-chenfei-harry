import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCardComponent } from './request-card.component';

import { HttpClientModule } from '@angular/common/http';

describe('RequestCardComponent', () => {
  let component: RequestCardComponent;
  let fixture: ComponentFixture<RequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestCardComponent ],
      imports: [HttpClientModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle viewExpanded property and log to console', () => {
    spyOn(console, 'log');
    expect(component.viewExpanded).toBe(false);
    component.expandView();
    expect(component.viewExpanded).toBe(true);
    expect(console.log).toHaveBeenCalledWith('expandView() called');
    expect(console.log).toHaveBeenCalledWith(component.request.name);
  });
});
