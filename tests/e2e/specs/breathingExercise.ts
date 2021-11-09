import { Language } from "@/i18n/types";
import { messages } from "../../../src/i18n";
import { getProductionExerciseDefaultState } from "../../../src/store/modules/exercise/defaultState";

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

  describe("starts exercise and moves through the phases screens", function () {
    describe("Start screen", function () {
      it("pressing start and watching count down", function () {
        cy.clock();
        cy.visit("/breathing-exercise/start");

        cy.get('[data-test="languages"]').then(($select) => {
          const locale = $select.val() as Language;
          const getReadyText = messages[locale].ex.start.get_ready;
          cy.get('[data-test="ex-start-start-btn"]').click();
          cy.get('[data-test="ex-start-counter"]').should("be.visible");

          cy.contains(getReadyText)
            .get('[data-test="ex-start-counter-value"]', { timeout: 1100 })
            .should("be.visible")
            .and("have.text", "3");

          cy.tick(1000);
          cy.get('[data-test="ex-start-counter-value"]', {
            timeout: 1,
          }).should("have.text", "2");

          cy.tick(1000);
          cy.get('[data-test="ex-start-counter-value"]', {
            timeout: 1,
          }).should("have.text", "1");

          cy.tick(1000);
          cy.get('[data-test="ex-start-counter-value"]', {
            timeout: 1,
          }).should("have.text", "Go");

          cy.tick(1000);
        });
      });
    });

    describe("Breathing screen", function () {
      it("should be in the Breathing screen (phase)", function () {
        cy.url().should(
          "equal",
          Cypress.config().baseUrl + "breathing-exercise/breathing"
        );
      });

      it("should show start tip for a while, then start counting down", function () {
        cy.clock();

        cy.get('[data-test="languages"]').then(($select) => {
          const locale = $select.val() as Language;

          cy.contains(
            '[data-test="ex-header-title"]',
            messages[locale].ex.breathing.title
          );

          cy.contains(
            '[data-test="start-tip"]',
            messages[locale].ex.breathing.start_tip
          ).should("be.visible");

          cy.get('[data-test="ex-phase-counter]').should("not.exist");
          cy.get('[data-test="breathing-next-screen-btn"]').should("not.exist");
          cy.get('[data-test="ex-footer-tip"]').should("not.exist");

          const { breathTime } = getProductionExerciseDefaultState();
          cy.tick(breathTime);

          cy.get('[data-test="ex-phase-counter]').should("be.visible");
          cy.get('[data-test="breathing-next-screen-btn"]').should(
            "be.visible"
          );
          cy.get('[data-test="ex-footer-tip"]').should("be.visible");
        });
      });
    });
  });
});
