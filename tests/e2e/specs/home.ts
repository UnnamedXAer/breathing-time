import { getBestLocale, languages, messages } from "../../../src/i18n/index";

describe("Home.vue", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("Visits the app root url", function () {
    cy.visit("/");

    cy.get('[data-test="header"]').should("be.visible");
    cy.get('[data-test="app-logo"]').should("be.visible");
    cy.get('[data-test="app-router"]').should("be.visible");

    cy.contains("h1", this.packageJson.appTitle);
  });

  it("changes locale", () => {
    const initialLocale = getBestLocale();

    cy.visit("/");
    cy.get<HTMLSelectElement>('[data-test="languages"]')
      .then(($select) => {
        const val = $select.val();

        window.navigator.languages;

        assert(
          val === initialLocale,
          `initial locale should be: "${initialLocale}"`
        );
      })
      .trigger("click")
      .get<HTMLOptionElement>("option")
      .then(($options) => {
        expect($options).lengthOf(languages.length);
      });

    const locale = languages[0] === initialLocale ? languages[1] : languages[0];
    cy.get<HTMLSelectElement>('[data-test="languages"]')
      .select(locale)
      .then(() => {
        cy.get('[data-test="home-link"]').should(
          "have.text",
          messages[locale].header.home
        );
      });
  });

  it("can open breathing instructions", function () {
    const initialLocale = getBestLocale();

    cy.visit("/");

    const showInstructionsLinkText =
      messages[initialLocale].home.exercise_instructions;
    cy.contains(showInstructionsLinkText).trigger("click");

    cy.url().should("equal", Cypress.config().baseUrl + "instructions");
  });

  it("can open preferences", function () {
    const initialLocale = getBestLocale();

    cy.visit("/");

    const preferencesLinkText =
      messages[initialLocale].home.exercise_preferences;
    cy.contains(preferencesLinkText).trigger("click");

    cy.url().should("equal", Cypress.config().baseUrl + "preferences");
  });

  it("can open breathing exercise start screen", function () {
    const initialLocale = getBestLocale();

    cy.visit("/");

    const exerciseLinkText = messages[initialLocale].home.start_exercise;
    cy.contains(exerciseLinkText).trigger("click");

    cy.url().should(
      "equal",
      Cypress.config().baseUrl + "breathing-exercise/start"
    );
  });
});
