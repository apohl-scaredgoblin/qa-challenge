import { HomePage } from '../pages/home.page';
import { ContactPage } from '../pages/contact.page';

describe('User wants to send a message', () => {
  const homePage = new HomePage();
  const contactPage = new ContactPage();

  beforeEach(() => {
    cy.visit('/');
  });

  it('should show helper texts, when submitting an empty form | clicking get in touch menu button', () => {
    // The user clicks Get in Touch button on menu
    homePage.clickGetInTouchButtonOnMenu();
    homePage.ensureURLIsCorrect('/contact');
    contactPage.closeAllPopUps();
    contactPage.submitEmptyFormAndCheckValidation();
  });

  it('should show helper texts, when submitting an empty form | clicking get in touch contents button', () => {
    // The user clicks Get in Touch button under menu
    homePage.clickGetInTouchButtonUnderMenu();
    homePage.ensureURLIsCorrect('/contact');
    contactPage.closeAllPopUps();
    contactPage.submitEmptyFormAndCheckValidation();
  });
});
