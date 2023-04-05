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

  it('Should display 7 requests with telling names of the clients', () => {
    page.getRequestListItems().should('have.length', 7);

    page.getRequestListItems().each(el => {
    //some issues with this test
      cy.get('.null-name').should('contain.text', 'No name');
    });
  });

  //Tests with item filters
  it('Should return the correct elements with item filter food', () => {
    page.selectItemType('food');

    page.getRequestListItems().should('have.length', 5);

    page.getRequestListItems().each(el => {
      cy.wrap(el).find('.request-card-title').should('contain.text', 'food');
    });
  });

  it('Should return the correct elements with item filter toiletries', () => {
    page.selectItemType('toiletries');

    page.getRequestListItems().should('have.length', 1);

    page.getRequestListItems().each($list => {
      cy.wrap($list).find('.request-card-title').should('contain.text', 'toiletries');
    });
  });

  it('Should return the correct elements with item filter other', () => {
    page.selectItemType('other');
    page.getRequestListItems().should('have.length', 1);
  });

  //Tests with food filters
  it('Should return the correct elements with item filter food and food filter dairy', () => {
    page.selectItemType('food');
    page.selectFoodType('dairy');

    page.getRequestListItems().should('have.length', 1);

    page.getRequestListItems().each(el => {
      cy.wrap(el).find('.request-card-title').should('contain.text', 'food');
    });
  });

  it('Should return the correct elements with item filter food and food filter meat', () => {
    page.selectItemType('food');
    page.selectFoodType('meat');

    page.getRequestListItems().should('have.length', 1);

    page.getRequestListItems().each(el => {
      cy.wrap(el).find('.request-card-title').should('contain.text', 'food');
    });
  });

  //Tests with the button *EXPAND*
  it('Should return the correct elements before and after clicking the button *EXPAND*', () => {
    //Some issues with the test
    page.selectItemType('food');
    page.selectFoodType('vegetable');

    page.getRequestListItems().should('have.length', 1);

    page.getRequestDescriptions().each(($el) => {
      const maxLength = 42;
      const description = $el.text().slice(0, maxLength);
      expect(description.length).to.be.at.least(5);
    });

    page.expandViewButton().click();

    page.getRequestDescriptions().each(($el) => {
      const maxLength = 42;
      const description = $el.text();
      expect(description.length).to.be.at.least(maxLength);
    });
  });
});
