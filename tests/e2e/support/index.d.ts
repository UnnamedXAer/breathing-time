// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<Subject>;
      setSliderValue(value: number): Chainable<void>;
    }
  }
}
