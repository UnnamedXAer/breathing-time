import { Language } from "@/i18n/types";
import { messages } from "../../../src/i18n";

describe("/instructions screen", function () {
  it("shows breathing exercise instructions and exercise warning", () => {
    cy.visit("/instructions");

    cy.get('[data-test="header"]').should("be.visible");

    cy.get('[data-test="languages"]').then(($select) => {
      const locale = $select.val() as string;
      cy.wrap(locale).as("locale");
    });

    cy.get<Language>("@locale").then((locale) => {
      const warningTitleText = messages[locale].ex.warning.title;
      cy.contains(warningTitleText).should("be.visible");

      const instructionsTitle = messages[locale].instructions.title;
      cy.contains(instructionsTitle).should("be.visible");

      const instPointsLen = messages[locale].instructions.paragraphs.length;

      cy.get("li").should("have.length", instPointsLen).and("be.visible");
    });
  });
});
