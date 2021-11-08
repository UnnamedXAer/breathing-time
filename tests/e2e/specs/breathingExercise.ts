import { Language } from "@/i18n/types";
import { messages } from "../../../src/i18n";

describe("Breathing Exercise", () => {
  it("show main elements on start page", function () {
    cy.visit("/breathing-exercise/start");

    cy.get('[data-test="languages"]').then(($select) => {
      const locale = $select.val() as string;
      cy.wrap(locale).as("locale");
    });

    cy.get<Language>("@locale").then((locale) => {
      const warningTitleText = messages[locale].ex.warning.title;
      cy.contains(warningTitleText).should("be.visible");

      const headlineText = messages[locale].ex.title;
      cy.contains(headlineText).should("be.visible");

      const roundPhasesTitleText = messages[locale].ex.phases.title;
      const roundPhasesLen = 3;
      cy.contains(roundPhasesTitleText).should("be.visible");
      cy.get('[data-test="ex-start-round-phases"]')
        .should("be.visible")
        .get("li")
        .should("be.visible")
        .and("have.length", roundPhasesLen);

      const instructionsBtnText = messages[locale].ex.start.see_instructions;
      cy.contains("button", instructionsBtnText).should("be.visible");

      const startBtnText = messages[locale].ex.start.start;
      cy.contains("button", startBtnText).should("be.visible");
    });
  });

  it("can navigate to breathing instructions", function () {
    cy.visit("/breathing-exercise/start");

    cy.get('[data-test="ex-start-see-instr-btn"]').click();
    cy.url().should("include", "/instructions");
  });

  it("starts exercise and moves through the phases screens", function () {
    cy.visit("/breathing-exercise/start");

    cy.get('[data-test="languages"]').then(($select) => {
      const locale = $select.val() as string;
      cy.wrap(locale).as("locale");
    });

    cy.get<Language>("@locale").then((locale) => {
      const getReadyText = messages[locale].ex.start.get_ready;
      cy.get('[data-test="ex-start-start-btn"]').click();
      cy.get('[data-test="ex-start-counter"]')
        .should("be.visible")
        .contains(getReadyText)
        .get('[data-test="ex-start-counter-value"]')
        .should("be.visible")
        .and("have.text", "3")
        .get('[data-test="ex-start-counter-value"]')
        .should("have.text", "2")
        .get('[data-test="ex-start-counter-value"]')
        .should("have.text", "1")
        .get('[data-test="ex-start-counter-value"]')
        .should("have.text", "Go");
    });
  });
});
