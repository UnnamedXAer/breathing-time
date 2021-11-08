import { getBestLocale, messages } from "../../../src/i18n";

describe("Header.vue", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("renders correct screens after header links used", function () {
    cy.visit("/");
    const initialLocale = getBestLocale();
    const homeLinkText = messages[initialLocale].header.home;
    const aboutLinkText = messages[initialLocale].header.about;
    cy.log(initialLocale, homeLinkText);
    cy.get('[data-test="header"]').contains(aboutLinkText).click();

    cy.url().should("eq", Cypress.config().baseUrl + "about");

    const aboutHeadlineText = messages[initialLocale].header.about;
    cy.log("aboutHeadlineText", aboutHeadlineText);
    cy.contains("h1", aboutHeadlineText);

    cy.get('[data-test="header"]').contains(homeLinkText).click();
    cy.url().should("eq", Cypress.config().baseUrl);
    cy.get('[data-test="header"]').contains(aboutLinkText).click();
    cy.url().should("eq", Cypress.config().baseUrl + "about");
    cy.get('[data-test="app-logo-router-link"]').click();
    cy.url().should("eq", Cypress.config().baseUrl);

    cy.contains("h1", this.packageJson.appTitle);
  });
});
