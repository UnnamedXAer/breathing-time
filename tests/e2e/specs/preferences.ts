import { messages } from "../../../src/i18n";

describe("/preferences screen", function () {
  const prefMsgs = messages.en.preferences;

  context("controls are usable", function () {
    it("displays and allows to update value of the range control", function () {
      cy.visit("/preferences");

      cy.get("#num-of-rounds")
        .parent<HTMLLabelElement>()
        .as("rangeControl")
        .then(($rangeControl) => {
          const inpValue = $rangeControl.find("input").val();

          cy.wrap($rangeControl)
            .should("include.text", prefMsgs.num_of_rounds)
            .and("include.text", inpValue);
        });

      cy.get("@rangeControl").within(() => {
        cy.get('[data-test="label"]')
          .then(($els) => {
            console.log("}} ->", $els);
          })
          .click()
          .then(($el) => {
            console.log("---", $el);
          });
      });
    });
  });

  it("shows customizable values", function () {
    cy.visit("/preferences");

    cy.get('[data-test="header"]').should("be.visible");

    cy.contains("h1", prefMsgs.title).should("be.visible");

    cy.get("main")
      .get('[data-test="preferences-fields"]')
      .within(() => {
        cy.contains(prefMsgs.num_of_rounds).should("be.visible");
        cy.contains(prefMsgs.breaths_per_round).should("be.visible");
        cy.contains(prefMsgs.breathing_pace).should("be.visible");
        cy.contains(prefMsgs.recovery_time).should("be.visible");
        cy.contains(prefMsgs.disable_animation).should("be.visible");
        cy.contains(prefMsgs.disable_start_tips).should("be.visible");
      });
    cy.get("main .preferences").contains("button", prefMsgs.restore_default);
  });

  context("Preferences allows alternate exercise", function () {
    //
  });
});
