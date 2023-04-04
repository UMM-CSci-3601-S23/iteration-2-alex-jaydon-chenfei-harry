import { Component, Input, /*OnInit*/ } from '@angular/core';
import { Request } from '../request';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent /*implements OnInit*/ {
[x: string]: any;
  @Input() viewExpanded: boolean;
  @Input() request: Request;
  @Input() simple?: boolean = false;
  @Input() showName: boolean;
  priority: number;
  expandView(): void {
    this.viewExpanded = !this.viewExpanded;
    console.log('expandView() called');
    console.log(this.request.name);
  }

}

