import { ItemType, FoodType } from 'src/app/requests/request';

export class RequestDonorPage {
  private readonly baseUrl = '/requests/donor';
  private readonly pageTitle = '.donor-view-title';
  private readonly requestItemTypeDropDown = '[data-test=requestItemTypeSelect]';
  private readonly requestFoodTypeDropDown = '[data-test=requestFoodTypeSelect]';
  private readonly dropdownOptionSelector = `mat-option`;
  private readonly requestListItemSelector = '.donor-nav-list .donor-list-item';
  private readonly button = '[data-test=backtoHomepageButton]';

  navigateTo() {
    return cy.visit(this.baseUrl);
  }

  getDonorViewTitle() {
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
