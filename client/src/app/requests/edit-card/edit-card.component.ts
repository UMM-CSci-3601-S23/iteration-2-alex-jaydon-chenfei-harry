import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FoodType, ItemType } from '../request';
import { RequestService } from '../request.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent {

  public type: ItemType = 'food';

  editCardForm = new FormGroup({
    name: new FormControl('', Validators.compose([])),
    // We want descriptions to be short and sweet, yet still required so we have at least some idea what
    // the client wants
    description: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(200),
    ])),

    itemType: new FormControl<ItemType>('food',Validators.compose([
      Validators.required,
      Validators.pattern('^(food|toiletries|other)$'),
    ])),

    foodType: new FormControl<FoodType>('',Validators.compose([
      Validators.pattern('^(dairy|grain|meat|fruit|vegetable|)$'),
    ])),
  });

  readonly editCardValidationMessages = {
    description: [
      {type: 'required', message: 'Description is required'},
      {type: 'minlength', message: 'Description must be at least 5 characters long'},
      {type: 'maxlength', message: 'Description cannot be more than 200 characters long'},
    ],
    itemType: [
      { type: 'required', message: 'Item type is required' },
      { type: 'pattern', message: 'Item type must be food, toiletries, or other' },
    ],
    foodType: [
      {type: 'pattern', message: 'Food type must be one of dairy, grain, meat, fruit, or vegetable'},
    ]
  };

  constructor(private requestService: RequestService, private route: ActivatedRoute,
      private snackBar: MatSnackBar, private router: Router) {
  }

  formControlHasError(controlName: string): boolean {
    return this.editCardForm.get(controlName).invalid &&
      (this.editCardForm.get(controlName).dirty || this.editCardForm.get(controlName).touched);
  }

  getErrorMessage(name: keyof typeof this.editCardValidationMessages): string {
    for(const {type, message} of this.editCardValidationMessages[name]) {
      if (this.editCardForm.get(name).hasError(type)) {
        return message;
      }
    }
    return 'Unknown error';
  }

  submitForm() {
      {
      this.route.paramMap.pipe(map((paramMap: ParamMap) => { console.log(paramMap); return paramMap.get('id'); })).subscribe({
        next: id => {
          console.log(id);
          this.requestService.updateCard(this.editCardForm.value, id ).subscribe({
            next: (_) => {
              this.snackBar.open(
                `Request successfully submitted`,
                null,
                { duration: 2000 }
              );
            },
            error: err => {
              this.snackBar.open(
                `Problem contacting the server – Error Code: ${err.status}\nMessage: ${err.message}`,
                'OK',
                { duration: 5000 }
              );
            },
            // complete: () => console.log('Add user completes!')
          });
        }
      });

    };
  }
}
