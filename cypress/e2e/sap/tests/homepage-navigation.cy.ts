import { HomePage } from '../pages/home.page';

describe('User wants to navigate to different pages', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    cy.visit('/');
  });

  it('should show proper bookmarks on navigation bar, when visiting  homepage', () => {
    homePage.checkNavbarPresence();
    homePage.checkBookMarksPresence([
      'Banking',
      'Insurance',
      'Finance & ESG',
      'Services',
      'Partners',
      'Company',
      'Resources',
    ]);
  });

  it('should navigate to Financial Control page, when clicking Finance & ESG -> Financial Control on the menu  ', () => {
    homePage.checkBookMarksPresence(['Finance & ESG']);
    homePage.hoverOnMenuAndPickOption('Finance & ESG', 'Financial Control');
    homePage.ensureURLIsCorrect('finance-esg/financial-control/');
    homePage.checkHeaderPresence('Financial Control');
  });
});
