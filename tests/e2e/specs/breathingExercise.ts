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
});

describe("Breathing Exercise - simulate", function () {
  const { breathsPerRound, breathTime, numberOfRounds, recoveryTime } =
    getProductionExerciseDefaultState();

  before(function () {
    // "now" needs to be passed for click events to work.
    // "Date" must be specified to now to work
    // so if functions argument is passed other functions
    // must be specified as well
    cy.clock(Date.now(), [
      "Date",
      "setInterval",
      "setTimeout",
      "clearTimeout",
      "clearInterval",
    ]);
    cy.visit("/breathing-exercise/start");
  });

  it("starts exercise and moves through the phases screens", function () {
    context("Start screen", function () {
      context("pressing start and watching count down", function () {
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
            timeout: 100,
          }).should("have.text", "2");

          cy.tick(1000);
          cy.get('[data-test="ex-start-counter-value"]', {
            timeout: 100,
          }).should("have.text", "1");

          cy.tick(1000);
          cy.get('[data-test="ex-start-counter-value"]', {
            timeout: 100,
          }).should("have.text", "Go");
        });

        for (let tIdx = 0; tIdx < numberOfRounds; tIdx++) {
          context("PHASES, round: " + (tIdx + 1), function () {
            context("Breathing screen", function () {
              context("should be in the Breathing screen (phase)", function () {
                cy.tick(1000);
                cy.url().should(
                  "equal",
                  Cypress.config().baseUrl + "breathing-exercise/breathing"
                );
              });

              context(
                "should show start tip for a while, then start counting",
                function () {
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

                    cy.get('[data-test="ex-phase-counter"]').should(
                      "not.exist"
                    );
                    cy.get('[data-test="breathing-next-screen-btn"]').should(
                      "not.exist"
                    );
                    cy.get('[data-test="ex-footer-tip"]').should("not.exist");

                    cy.tick(breathTime);

                    cy.get('[data-test="ex-phase-counter"]').should(
                      "be.visible"
                    );
                    cy.get('[data-test="breathing-next-screen-btn"]').should(
                      "be.visible"
                    );
                    cy.get('[data-test="ex-footer-tip"]').should("be.visible");
                  });
                }
              );

              context(
                'should count up to "breaths per round" value',
                function () {
                  const counterSelector = '[data-test="ex-phase-counter"]';

                  for (let i = 1; i <= breathsPerRound; i++) {
                    cy.get(counterSelector)
                      .invoke("text")
                      .should("be.eq", "" + i);
                    cy.tick(breathTime);
                  }
                }
              );
            });

            context("Breath Hold screen", function () {
              context(
                "should be in the Breath Hold screen (phase)",
                function () {
                  cy.url().should(
                    "equal",
                    Cypress.config().baseUrl + "breathing-exercise/breath-hold"
                  );
                }
              );

              context(
                "should show start tip for a while, then start counting",
                function () {
                  cy.get('[data-test="languages"]').then(($select) => {
                    const locale = $select.val() as Language;

                    cy.contains(
                      '[data-test="ex-header-title"]',
                      messages[locale].ex.hold.title
                    );

                    cy.contains(
                      '[data-test="start-tip"]',
                      messages[locale].ex.hold.start_tip
                    ).should("be.visible");
                  });

                  cy.get('[data-test="ex-phase-counter"]').should("not.exist");
                  cy.get(
                    '[data-test="breath-hold-next-screen-action-btn"]'
                  ).should("not.exist");
                  cy.get('[data-test="ex-footer-tip"]').should("not.exist");

                  cy.tick(breathTime);

                  cy.get('[data-test="ex-phase-counter"]').should("be.visible");
                  cy.get(
                    '[data-test="breath-hold-next-screen-action-btn"]'
                  ).should("be.visible");
                  cy.get('[data-test="ex-footer-tip"]').should("be.visible");
                  if (3 === numberOfRounds) {
                    // @TODO: check for last round info in the footer.
                  }
                }
              );

              context(
                'should count up until user presses the "Next Phase" button',
                function () {
                  const counterSelector = '[data-test="ex-phase-counter"]';
                  const randomResult = Math.round(Math.random() * 5);

                  cy.log(
                    `(random) - this time user should hold breath for: ${randomResult} sec`
                  );

                  for (let i = 0; ; ) {
                    cy.get(counterSelector)
                      .invoke("text")
                      .should("be.eq", "" + i);

                    if (++i > randomResult) {
                      break;
                    }
                    cy.tick(1000);
                  }
                  cy.get('[data-test="languages"]').then(($select) => {
                    const locale = $select.val() as Language;

                    cy.contains<HTMLButtonElement>(
                      messages[locale].ex.hold.skip_to_next
                    ).click();
                  });
                }
              );
            });

            context("Recovery screen", function () {
              context("should be in the Recovery screen (phase)", function () {
                cy.url().should(
                  "equal",
                  Cypress.config().baseUrl + "breathing-exercise/recovery"
                );
              });

              context(
                "should show start tip for a while, then start counting",
                function () {
                  cy.get('[data-test="languages"]').then(($select) => {
                    const locale = $select.val() as Language;

                    cy.contains(
                      '[data-test="ex-header-title"]',
                      messages[locale].ex.recovery.title
                    );

                    cy.contains(
                      '[data-test="start-tip"]',
                      messages[locale].ex.recovery.start_tip
                    ).should("be.visible");
                  });

                  cy.get('[data-test="ex-phase-counter"]').should("not.exist");
                  cy.get('[data-test="recovery-next-screen-btn"]').should(
                    "not.exist"
                  );
                  cy.get('[data-test="ex-footer-tip"]').should("not.exist");

                  cy.tick(breathTime);

                  cy.get('[data-test="ex-phase-counter"]').should("be.visible");
                  cy.get('[data-test="recovery-next-screen-btn"]').should(
                    "be.visible"
                  );
                  cy.get('[data-test="ex-footer-tip"]').should("be.visible");
                }
              );

              context('should count up to the "recoveryTime"', function () {
                const counterSelector = '[data-test="ex-phase-counter"]';

                for (let i = 0; i <= recoveryTime; i++) {
                  cy.get(counterSelector)
                    .invoke("text")
                    .should("be.eq", "" + i);

                  cy.tick(1000);
                }
              });

              if (tIdx < numberOfRounds - 1) {
                context("should go back to the breathing phase", function () {
                  cy.url().should(
                    "equal",
                    Cypress.config().baseUrl + "breathing-exercise/breathing"
                  );
                });
              }
            });
          });
        } // for numberOfRounds

        context("Summary screen", function () {
          context("should be in the Summary screen", function () {
            cy.url().should(
              "equal",
              Cypress.config().baseUrl + "breathing-exercise/recovery"
            );
          });

          context("should show results of the exercise", function () {
            cy.get('[data-test="languages"]').then(($select) => {
              const locale = $select.val() as Language;

              const welcomeMessage =
                messages[locale].ex.summary.congrats_finished;
              const roundText = messages[
                locale
              ].ex.summary.round_with_num.replace("{0}", "");
              const averageText = messages[
                locale
              ].ex.summary.averageTime.replace(
                "@:ex.summary.num_of_seconds",
                ""
              );
              const shareBtnText = messages[locale].ex.summary.share_results;

              cy.contains(welcomeMessage);

              cy.get<HTMLTableRowElement>("tr").then(($rows) => {
                console.log($rows.text());
                expect($rows.length).equal(numberOfRounds);
                $rows.toArray().forEach((row, idx) => {
                  cy.wrap(row.firstChild)
                    .should("contain.text", roundText)
                    .and("contain.text", "" + (idx + 1));

                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  cy.wrap(row.firstChild!.nextSibling!.textContent).should(
                    "match",
                    /\d s/
                  );
                });
              });
              cy.contains(averageText).should("be.visible");
              cy.contains(averageText)
                .invoke("text")
                .and(
                  "match",
                  new RegExp(averageText + "\\s*\\d+\\.?\\d*\\s\\w+")
                );

              cy.get(`button[title="${shareBtnText}"]`).should("be.visible");
            });
          });
        });
      });
    });
  });
});
