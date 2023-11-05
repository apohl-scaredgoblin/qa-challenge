import { BasePage } from './base.page';

export class HomePage extends BasePage {
  elements = {
    navigation: 'navigation',
    menuDropdown: '.current-dropdown',
    menuDropdownSubOption: '.ux-menu-link__text',
    getInTouchHeaderButton: '.header-button',
    getInTouchButtonUnderMenu: '.button',
  };

  constructor() {
    super('/');
  }

  public checkNavbarPresence() {
    cy.findAllByRole(this.elements.navigation).should('exist');
  }

  public checkBookMarksPresence(labels: string[]) {
    labels.forEach((l) => cy.findByRole(this.elements.navigation).findAllByText(l).should('be.visible'));
  }

  public hoverOnMenuAndPickOption(menuOption: string, subOption: string) {
    cy.findAllByRole(this.elements.navigation).findByText(menuOption).realHover();
    cy.get(this.elements.menuDropdown).should('be.visible');
    cy.get(this.elements.menuDropdown).findByText(subOption).click();
  }

  public ensureURLIsCorrect(url: string) {
    cy.url().should('include', url);
  }

  public checkHeaderPresence(text: string) {
    cy.get('h3').contains(text).should('exist');
  }

  public clickGetInTouchButtonOnMenu() {
    cy.get(this.elements.getInTouchHeaderButton).contains('Get in touch').should('exist').click();
  }

  public clickGetInTouchButtonUnderMenu() {
    cy.get(this.elements.getInTouchButtonUnderMenu).contains('Get in touch').should('exist').click();
  }
}
