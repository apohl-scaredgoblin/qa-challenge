import { BasePage } from './base.page';

export class ContactPage extends BasePage {
  elements = {
    formIframe: '#hs-form-iframe-0',
    firstNameLabel: 'First name',
    lastNameLabel: 'Last name',
    workEmaiLabel: 'Work email',
    countryLabel: 'Country',
    phoneNumberLabel: 'Phone number',
    areaOfInterestLabel: 'What is your area of interest?',
    howCanHelpLabel: 'How can we help you?',
    submitCheckboxLabel:
      'By submitting this form you have read and agreed to our privacy policy and you allow SAP Fioneer to store and process the information submitted on this form.',
    marketingCheckboxLabel:
      'Please tick this box if you would like to receive our latest updates, insights and exclusive invites.',
    submitButton: '.hs-button',
    errorMessage: '.hs-error-msg',
    popupExitButton: '.pum-close',
    acceptCookiesButton: '.flatsome-cookies__accept-btn',
    errorRollup: '.hs_error_rollup',
  };

  constructor() {
    super('/contact');
  }

  private getIframeDocument = () => {
    return (
      cy
        .get(this.elements.formIframe)
        // Cypress yields jQuery element, which has the real
        // DOM element under property "0".
        // From the real DOM iframe element we can get
        // the "document" element, it is stored in "contentDocument" property
        // Cypress "its" command can access deep properties using dot notation
        // https://on.cypress.io/its
        .its('0.contentDocument')
        .should('exist')
    );
  };

  private getIframeBody = () => {
    // get the document
    return (
      this.getIframeDocument()
        // automatically retries until body is loaded
        .its('body')
        .should('not.be.undefined')
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        .then(cy.wrap)
    );
  };

  public closeAllPopUps() {
    cy.get(this.elements.popupExitButton).click();
    cy.get(this.elements.acceptCookiesButton).click();
  }

  private findFormLabel(label: string) {
    return this.getIframeBody().findByLabelText(label, { exact: false });
  }

  private ensureInputIsEmpty(label: string) {
    return this.findFormLabel(label).should('be.empty');
  }

  private ensureDropdownIsEmpty(label: string) {
    return this.findFormLabel(label).should('not.have.value');
  }

  public ensureAllInputsAreEmpty() {
    this.ensureInputIsEmpty(this.elements.firstNameLabel);
    this.ensureInputIsEmpty(this.elements.lastNameLabel);
    this.ensureInputIsEmpty(this.elements.workEmaiLabel);
    this.ensureDropdownIsEmpty(this.elements.countryLabel);
    this.ensureInputIsEmpty(this.elements.phoneNumberLabel);
    this.ensureDropdownIsEmpty(this.elements.areaOfInterestLabel);
    this.ensureInputIsEmpty(this.elements.howCanHelpLabel);
  }

  private ensureCheckBoxIsNotChecked(label: string) {
    return this.getIframeBody().findByLabelText(label, { exact: false }).should('not.be.checked');
  }

  public ensureAllCheckboxesAreNotChecked() {
    this.ensureCheckBoxIsNotChecked(this.elements.submitCheckboxLabel);
    this.ensureCheckBoxIsNotChecked(this.elements.marketingCheckboxLabel);
  }

  public checkErrorMessagePresence(selector: string, text: string) {
    return this.getIframeBody()
      .findByLabelText(selector, { exact: false })
      .parents('.field')
      .find(this.elements.errorMessage)
      .contains(text)
      .should('exist');
  }

  //Method checks all the required fields and validation errors
  public checkAllErrorMessagesPresence() {
    const requiredInputText = 'Please complete this required field.';
    const requiredDropdownText = 'Please select an option from the dropdown menu.';

    this.checkErrorMessagePresence(this.elements.firstNameLabel, requiredInputText);
    this.checkErrorMessagePresence(this.elements.lastNameLabel, requiredInputText);
    this.checkErrorMessagePresence(this.elements.workEmaiLabel, requiredInputText);
    this.checkErrorMessagePresence(this.elements.countryLabel, requiredDropdownText);
    this.checkErrorMessagePresence(this.elements.howCanHelpLabel, requiredInputText);
    this.checkErrorMessagePresence(this.elements.marketingCheckboxLabel, requiredInputText);
  }

  public clickSubmitButton() {
    this.getIframeBody().find(this.elements.submitButton).contains('Submit').click();
  }

  public clickSubmitOnEmptyForm() {
    this.ensureAllInputsAreEmpty();
    this.ensureAllCheckboxesAreNotChecked();
    this.clickSubmitButton();
    this.checkAllErrorMessagesPresence();
    this.getIframeBody()
      .find(this.elements.errorRollup)
      .contains('Please complete all required fields.')
      .should('exist');
  }
}
