import { getBestLocale, messages } from "../../../src/i18n";

describe("/about screen", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("shows info about application", function () {
    cy.visit("/about");
    cy.get('[data-test="header"]').should("be.visible");
    cy.get('[data-test="about-title"]').should("be.visible");
    cy.get('[data-test="about-content"]').should("be.visible");
    cy.contains(this.packageJson.appVersion).should("be.visible");
  });

  it("navigates to preferences when user clicks in the link in text", function () {
    cy.visit("/about");
    const initialLocale = getBestLocale();
    const preferencesLinkText = messages[initialLocale].about.preferences;
    cy.get("a[href]").contains(preferencesLinkText).click();

    cy.url().should("equal", Cypress.config().baseUrl + "preferences");
  });

  it("opens WHM page in new tab when user clicks in the link in text", function () {
    cy.visit("/about");
    cy.get('a[href^="https://www.wimhofmethod.com"][target="_blank"]').contains(
      "Wim Hof Method"
    );
  });
});
