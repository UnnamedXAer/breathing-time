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
});
