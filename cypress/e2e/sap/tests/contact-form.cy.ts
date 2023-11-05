import { HomePage } from '../pages/home.page';
import { ContactPage } from '../pages/contact.page';

describe('User wants to send a message', () => {
  const homePage = new HomePage();
  const contactPage = new ContactPage();

  beforeEach(() => {
    cy.visit('/');
  });

  it('should show helper texts and the empty form cannot be submitted, when clicking submit button', () => {
    //The user clicks Get in Touch button on menu
    homePage.clickGetInTouchButtonOnMenu();
    homePage.ensureURLIsCorrect('/contact');
    contactPage.closeAllPopUps();
    contactPage.clickSubmitOnEmptyForm();
  });

  it('should show helper texts and the empty form cannot be submitted, when clicking submit button', () => {
    //The user clicks Get in Touch button under menu
    homePage.clickGetInTouchButtonUnderMenu();
    homePage.ensureURLIsCorrect('/contact');
    contactPage.closeAllPopUps();
    contactPage.clickSubmitOnEmptyForm();
  });
});
