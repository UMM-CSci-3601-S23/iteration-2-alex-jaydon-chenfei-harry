

export class RequestVolunteerPage {
  private readonly baseUrl = '/requests/volunteer';
  private readonly pageTitle = '.volunteer-view-title';
  private readonly button = '[data-test=backtoHomepageButton]';

  navigateTo() {
    return cy.visit(this.baseUrl);
  }

  getVolunteerViewTitle() {
    return cy.get(this.pageTitle);
  }

  backtoHomepageButton(){
    return cy.get(this.button);
  }

}
