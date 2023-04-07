import { ItemType, FoodType } from 'src/app/requests/request';

export class RequestDonorPage {
  private readonly baseUrl = '/requests/donor';
  private readonly pageTitle = '.donor-view-title';
  private readonly requestItemTypeDropDown = '[data-test=requestItemTypeSelect]';
  private readonly requestFoodTypeDropDown = '[data-test=requestFoodTypeSelect]';
  private readonly dropdownOptionSelector = `mat-option`;
  private readonly requestListItemSelector = '.donor-request-card';
  private readonly requestDescriptionSelection = '.request-card-description';
  private readonly button1 = '[data-test=backtoHomepageButton]';
  private readonly button2 = '[data-test=expandViewButton]';


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
    return cy.get(this.button1);
  }

  expandViewButton(){
    return cy.get(this.button2) ;
  }

  getRequestDescriptions(){
    return cy.get(this.requestDescriptionSelection);
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
