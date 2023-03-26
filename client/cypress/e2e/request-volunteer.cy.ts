import { RequestVolunteerPage } from '../support/request-volunteer.po';

const page = new RequestVolunteerPage();

describe('Volunteer View', () => {
  before(() => {
    cy.task('seed:database');
  });

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getVolunteerViewTitle().should('have.text', 'Needs requested');
  });

  it('should be able to navigate back to homepage', () => {
    // Ability to navigate to Home
    page.backtoHomepageButton().click();
    cy.url().should('match', /^https?:\/\/[^/]+\/?$/);
  });

});
