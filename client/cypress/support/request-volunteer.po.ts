import { FoodType, ItemType } from 'src/app/requests/request';


export class RequestVolunteerPage {
  private readonly baseUrl = '/requests/volunteer';
  private readonly pageTitle = '.volunteer-view-title';
  private readonly requestItemTypeDropDown = '[data-test=requestItemTypeSelect]';
  private readonly requestFoodTypeDropDown = '[data-test=requestFoodTypeSelect]';
  private readonly dropdownOptionSelector = `mat-option`;
  private readonly requestListItemSelector = '.volunteer-request-card';
  private readonly button = '[data-test=backtoHomepageButton]';

  navigateTo() {
    return cy.visit(this.baseUrl);
  }

  getVolunteerViewTitle() {
    return cy.get(this.pageTitle);
  }

  getRequestListItems() {
    return cy.get(this.requestListItemSelector);
  }
  backtoHomepageButton(){
    return cy.get(this.button);
  }

  selectItemType(value: ItemType) {
    cy.get(this.requestItemTypeDropDown).click();
    return cy.get(`${this.dropdownOptionSelector}[value="${value}"]`).click();
  }

  selectFoodType(value: FoodType) {
    cy.get(this.requestFoodTypeDropDown).click();
    return cy.get(`${this.dropdownOptionSelector}[value="${value}"]`).click();
  }
}
