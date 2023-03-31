import { Component, Input, /*OnInit*/ } from '@angular/core';
import { Request } from '../request';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent /*implements OnInit*/ {
[x: string]: any;

  @Input() request: Request;
  @Input() simple?: boolean = false;
  @Input() showName: boolean;
  priority: number;
  }


  // THIS CODE MAY NOT BE NECESSARY. --Jaydon
  /*protected condensedRequestBody: string;

  condenseRequestBody(): void {
    if(this.request.description.length < 20) {
      this.condensedRequestBody = this.request.description.slice(0, 20) + '...';
    }
    else {
      this.condensedRequestBody = this.request.description;
    }
  }

  ngOnInit(): void {
    this.condenseRequestBody();
  }*/

}
