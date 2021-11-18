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
    const { breathsPerRound, breathTime } = getProductionExerciseDefaultState();
    const startCountdownTime = 4_000;
    const phaseTipTime = breathTime;

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
      cy.tick(startCountdownTime);
      cy.url().should(
        "equal",
        Cypress.config().baseUrl + "breathing-exercise/breathing"
      );
      cy.tick(phaseTipTime);

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

      cy.tick(breathsPerRound * breathTime);

      cy.url().should(
        "equal",
        Cypress.config().baseUrl + "breathing-exercise/breath-hold"
      );

      cy.tick(phaseTipTime);
      cy.get('[data-test="modal"]').should("not.exist");
      cy.contains("a", messages.en.header.home).click();
      cy.get('[data-test="modal"]').should("be.visible");
      cy.contains("button", messages.en.common.no).click();
      cy.get('[data-test="ex-phase-counter"]').trigger("mousemove");

      cy.contains(messages.en.ex.hold.skip_to_next).click();

      cy.url().should(
        "equal",
        Cypress.config().baseUrl + "breathing-exercise/recovery"
      );

      cy.tick(phaseTipTime);
      cy.get('[data-test="modal"]').should("not.exist");
      cy.contains("a", messages.en.header.home).click();
      cy.get('[data-test="modal"]').should("be.visible");
      cy.contains("button", messages.en.common.no).click();
      cy.get('[data-test="ex-phase-counter"]').trigger("mousemove");

      cy.visit("/breathing-exercise/summary");

      cy.url().should(
        "equal",
        Cypress.config().baseUrl + "breathing-exercise/summary"
      );

      cy.contains("a", messages.en.header.home).click();
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
      cy.tick(startCountdownTime + phaseTipTime);
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

    it("exits from exercise if user confirms the dialog", function () {
      cy.clock(Date.now(), [
        "Date",
        "setInterval",
        "setTimeout",
        "clearTimeout",
        "clearInterval",
      ]);
      cy.visit("/breathing-exercise/start");
      cy.contains("button", messages.en.ex.start.start).click();
      cy.tick(startCountdownTime + phaseTipTime);
      cy.url().should(
        "equal",
        Cypress.config().baseUrl + "breathing-exercise/breathing"
      );
      cy.contains("a", messages.en.header.home).click();
      cy.contains("button", messages.en.common.yes).click();
      cy.url().should("equal", Cypress.config().baseUrl);
    });

    it("counts even if leave dialog is displayed", function () {
      cy.clock(Date.now(), [
        "Date",
        "setInterval",
        "setTimeout",
        "clearTimeout",
        "clearInterval",
      ]);

      cy.visit("/breathing-exercise/start");
      cy.contains("button", messages.en.ex.start.start).click();
      cy.tick(startCountdownTime);
      cy.url().should(
        "equal",
        Cypress.config().baseUrl + "breathing-exercise/breathing"
      );
      cy.tick(phaseTipTime);

      cy.get<HTMLScriptElement>('[data-test="ex-phase-counter"]').then(
        ($counter) => {
          const counterValue = $counter.text();
          expect(counterValue).to.be.equal("1");

          cy.contains("a", messages.en.header.home).click();
          expect(breathsPerRound).greaterThan(
            4,
            "should be at least 5 breath per round"
          );

          const passedBreaths = Math.floor(breathsPerRound / 2);

          cy.tick(passedBreaths * breathTime);

          cy.contains("button", messages.en.common.no).click();

          cy.get('[data-test="ex-phase-counter"]').contains(
            (passedBreaths + 1).toString()
          );
          cy.tick((breathsPerRound - passedBreaths) * breathTime);
        }
      );

      cy.url().should(
        "equal",
        Cypress.config().baseUrl + "breathing-exercise/breath-hold"
      );
    });

    it("stays on current screen until user does not dismiss leave dialog", function () {
      cy.clock(Date.now(), [
        "Date",
        "setInterval",
        "setTimeout",
        "clearTimeout",
        "clearInterval",
      ]);

      cy.visit("/breathing-exercise/start");
      cy.contains("button", messages.en.ex.start.start).click();
      cy.tick(startCountdownTime + phaseTipTime);
      cy.url().should(
        "equal",
        Cypress.config().baseUrl + "breathing-exercise/breathing"
      );
      cy.contains("a", messages.en.header.home).click();

      cy.tick(breathTime * (breathsPerRound + 1));

      cy.url().should(
        "equal",
        Cypress.config().baseUrl + "breathing-exercise/breathing"
      );

      cy.contains("button", messages.en.common.no).click();

      cy.url().should(
        "equal",
        Cypress.config().baseUrl + "breathing-exercise/breath-hold"
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

    it("shows browser prompt when user tries to navigate to different site, reload or close tab", function () {
      cy.clock(Date.now(), [
        "Date",
        "setInterval",
        "setTimeout",
        "clearTimeout",
        "clearInterval",
      ]);

      cy.visit("/breathing-exercise/start");

      cy.contains("button", messages.en.ex.start.start).click();
      cy.tick(startCountdownTime);
      cy.url().should(
        "equal",
        Cypress.config().baseUrl + "breathing-exercise/breathing"
      );
      cy.tick(phaseTipTime);
      cy.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cy.get<any>("@returnValue").should("to.have.been.calledWith", true);

      // check breath hold phase
      cy.visit("/breathing-exercise/start");
      cy.contains("button", messages.en.ex.start.start).click();
      cy.tick(startCountdownTime);
      cy.get('[data-test="start-tip"]').should("exist");
      cy.tick(phaseTipTime);
      cy.get('[data-test="breathing-next-screen-btn"]').click();
      cy.get('[data-test="start-tip"]').should("exist");
      cy.tick(phaseTipTime);

      cy.url().should(
        "equal",
        Cypress.config().baseUrl + "breathing-exercise/breath-hold"
      );

      cy.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cy.get<any>("@returnValue").should("have.callCount", 2);

      // check breath recovery phase
      cy.visit("/breathing-exercise/start");
      cy.contains("button", messages.en.ex.start.start).click();
      cy.tick(startCountdownTime);
      cy.get('[data-test="start-tip"]').should("exist");
      cy.tick(phaseTipTime);
      cy.get('[data-test="breathing-next-screen-btn"]').click();
      cy.get('[data-test="start-tip"]').should("exist");
      cy.tick(phaseTipTime);
      cy.get('[data-test="breath-hold-next-screen-action-btn"]').click();
      cy.get('[data-test="start-tip"]').should("exist");
      cy.tick(phaseTipTime);

      cy.url().should(
        "equal",
        Cypress.config().baseUrl + "breathing-exercise/recovery"
      );

      cy.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cy.get<any>("@returnValue").should("have.callCount", 3);

      cy.visit("/breathing-exercise/summary");
      cy.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cy.get<any>("@returnValue").should("have.callCount", 3);
    });
  });
});
