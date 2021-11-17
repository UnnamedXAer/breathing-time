import { getProductionExerciseDefaultState } from "../../../src/store/modules/exercise/defaultState";
import { messages } from "../../../src/i18n";

describe("Breathing Exercise route guards", function () {
  it("allows navigate in and out to/from start screen", function () {
    cy.visit("/");
    cy.contains(messages.en.home.start_exercise).click();
    cy.url().should(
      "equal",
      Cypress.config().baseUrl + "breathing-exercise/start"
    );
    cy.contains("a", messages.en.header.home).click();
    cy.url().should("equal", Cypress.config().baseUrl);
  });

  it("redirects to start screen from exercise phases if exercise not started", function () {
    cy.visit("/breathing-exercise/breathing");
    cy.url().should(
      "equal",
      Cypress.config().baseUrl + "breathing-exercise/start"
    );

    cy.visit("/breathing-exercise/breath-hold");
    cy.url().should(
      "equal",
      Cypress.config().baseUrl + "breathing-exercise/start"
    );

    cy.visit("/breathing-exercise/recovery");
    cy.url().should(
      "equal",
      Cypress.config().baseUrl + "breathing-exercise/start"
    );
  });

  context("asks before leaving phase screen", function () {
    const { breathsPerRound, breathTime, numberOfRounds, recoveryTime } =
      getProductionExerciseDefaultState();
    it("show warning dialog if user tries to navigate out via in-app links", function () {
      cy.clock(Date.now(), [
        "Date",
        "setInterval",
        "setTimeout",
        "clearTimeout",
        "clearInterval",
      ]);
      cy.visit("/breathing-exercise/start");
      cy.contains("button", messages.en.ex.start.start).click();
      cy.tick(4_000);
      cy.url().should(
        "equal",
        Cypress.config().baseUrl + "breathing-exercise/breathing"
      );
      cy.tick(breathTime);

      cy.contains("a", messages.en.header.home).click();

      cy.contains(messages.en.ex.leave.title).should("be.visible");
      cy.contains(messages.en.ex.leave.content).should("be.visible");
      cy.contains("button", messages.en.common.yes).should("be.visible");
      cy.contains("button", messages.en.common.no).should("be.visible");
      cy.get('[data-test="ex-phase-counter"]').should("be.visible");

      cy.contains("button", messages.en.common.no).click();
      cy.get('[data-test="modal"]').should("not.exist");
      // test if modal in on top of others elements
      cy.get('[data-test="ex-phase-counter"]').trigger("mousemove");

      cy.contains("a", messages.en.header.home).click();
      cy.contains("button", messages.en.common.yes).click();
      cy.url().should("equal", Cypress.config().baseUrl);
    });

    it("shows warning dialog if user presses browser's back button", function () {
      cy.clock(Date.now(), [
        "Date",
        "setInterval",
        "setTimeout",
        "clearTimeout",
        "clearInterval",
      ]);
      cy.visit("/breathing-exercise/start");
      cy.contains("button", messages.en.ex.start.start).click();
      cy.tick(4_000 + breathTime);
      cy.url().should(
        "equal",
        Cypress.config().baseUrl + "breathing-exercise/breathing"
      );
      cy.go("back");
      cy.contains(messages.en.ex.leave.title).should("be.visible");
      cy.url().should(
        "equal",
        Cypress.config().baseUrl + "breathing-exercise/breathing"
      );
    });

    it.only("shows browser prompt when user tries to navigate to different site, reload or close tab", function () {
      cy.clock(Date.now(), [
        "Date",
        "setInterval",
        "setTimeout",
        "clearTimeout",
        "clearInterval",
      ]);

      //   cy.on("window:confirm", function (str) {
      //     console.log("---window:confirm", str);
      //   });

      cy.on("window:before:unload", function (ev) {
        setTimeout(() => {
          console.log(
            "+++window:before:unload",
            ev.returnValue,
            ev.defaultPrevented,
            ev
          );

          expect(ev.returnValue).to.be.equal("true");
          expect(ev.defaultPrevented).to.be.true;
        }, 1234);
      });

      cy.visit("/breathing-exercise/start");

      cy.contains("button", messages.en.ex.start.start).click();
      cy.tick(4_000);
      cy.url().should(
        "equal",
        Cypress.config().baseUrl + "breathing-exercise/breathing"
      );
      cy.tick(breathTime);
      cy.reload();
      //   cy.url().should(
      //     "equal",
      //     Cypress.config().baseUrl + "breathing-exercise/breathing"
      //   );
    });
  });
});
