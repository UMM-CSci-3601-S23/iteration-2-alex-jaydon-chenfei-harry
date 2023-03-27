import { AppPage } from '../support/app.po';

const page = new AppPage();

describe('App', () => {
  beforeEach(() => page.navigateTo());

  it('Should have the correct title', () => {
    page.getAppTitle().should('contain', 'PocketShelf');
  });

  it('There is no sidebar on the homepage', () => {
    // To make the homepage more readable and accessible,
    // the sidebar is removed as a feature
    page.getSidenav()
      .should('not.exist');
    page.getSidenavButton()
      .should('not.exist');


  });

});
