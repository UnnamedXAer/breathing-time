import { getProductionExerciseDefaultState } from "../../../src/store/modules/exercise/defaultState";
import { messages } from "../../../src/i18n";
import { beforeWindowUnloadHander } from "../../../src/helpers/helpers";

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

    beforeEach(() => {
      type EventArgs = [
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions | undefined
      ];

      // before we are inside a hook executing as part of the test
      // we can use cy.on methods and create stubs, something
      // we could not do from Cypress.on callbacks
      const returnValueStub = cy.stub().as("returnValue");

      cy.on("window:before:load", (win) => {
        const original = win.addEventListener;
        win.addEventListener = function (...args: EventArgs) {
          if (args && args[0] === "beforeunload") {
            return original.call(
              this,
              "beforeunload",
              (ev: BeforeUnloadEvent) => {
                const handler = args[1] as typeof beforeWindowUnloadHander;
                if (handler["e2eName"] === "beforeWindowUnloadHander") {
                  Object.defineProperty(ev, "preventDefault", {
                    get() {
                      return function () {
                        void 0;
                      };
                    },
                    set() {
                      return function () {
                        void 0;
                      };
                    },
                  });
                  Object.defineProperty(ev, "returnValue", {
                    get() {
                      return "";
                    },
                    set: returnValueStub,
                  });

                  handler.call(this, ev);
                  return;
                }

                return handler.call(this, ev);
              }
            );
          }
          return original.apply(this, args);
        };
      });
    });

    it.only("shows browser prompt when user tries to navigate to different site, reload or close tab", function () {
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
      cy.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cy.get<any>("@returnValue").should("to.have.been.calledWith", true);
    });
  });
});
