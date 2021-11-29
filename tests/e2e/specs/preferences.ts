import { messages } from "../../../src/i18n";

describe("/preferences screen", function () {
  const prefMsgs = messages.en.preferences;

  beforeEach(function () {
    cy.window().then((w) => w.localStorage.clear());
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
        cy.get("input").then(($inp) => {
          const inpValue = $inp.val();
          cy.get('[data-test="value"]').should("have.text", inpValue);
        });

        cy.get("input").then(($inp) => {
          const maxNumberOfRounds = $inp.attr("max") || -10;

          cy.wrap($inp).trigger("click", "right");
          // click does not trigger value change therefore
          // we set in with custom command, but leave click
          // for validation of the element accessibility
          cy.get("input").setSliderValue(+maxNumberOfRounds);

          cy.get("input").should("have.value", maxNumberOfRounds);
          cy.wrap($inp).then(($inp) => {
            const inpValue = $inp.val();
            cy.get('[data-test="value"]').should("have.text", inpValue);
          });
        });
      });
    });

    it("displays and allows to update value of the checkbox control", function () {
      cy.visit("/preferences");

      cy.get("#disable-animation")
        .parent<HTMLLabelElement>()
        .as("checkboxControl")
        .then(($checkboxControl) => {
          cy.wrap($checkboxControl).should(
            "include.text",
            prefMsgs.disable_animation
          );
        });

      cy.get("@checkboxControl").within(($checkboxControl) => {
        cy.get("input").should("not.be.checked");

        const win = $checkboxControl[0].ownerDocument.defaultView;
        const indicatorEl = $checkboxControl.find(".control_indicator")[0];
        let after = win
          ? win.getComputedStyle(indicatorEl, "after")
          : { display: "unknown window" };

        expect(after.display).equals("none");

        cy.wrap($checkboxControl).click();

        cy.window().then((win) => {
          after = win
            ? win.getComputedStyle(indicatorEl, "after")
            : { display: "unknown window" };

          expect(after.display).equals("block");
        });

        cy.get("input").should("be.checked");
      });
    });
  });

  it("restores settings to defaults on button press", function () {
    cy.get("main").within(() => {
      cy.get('[for="disable-animation"]').click();

      cy.contains(prefMsgs.restore_default).click();

      cy.get<HTMLInputElement>("#disable-animation").should("not.be.checked");
    });
  });

  it("Preferences allow to alter the exercise", function () {
    cy.visit("/preferences");

    cy.contains(prefMsgs.disable_start_tips).click();
    cy.contains(prefMsgs.disable_animation).click();

    cy.contains(prefMsgs.num_of_rounds).within(() => {
      cy.get("input").then(($inp) => {
        const minValue = $inp.attr("min") || -100;
        cy.log("min value for", $inp.attr("id"), "is", minValue);
        cy.wrap($inp).setSliderValue(+minValue);
      });
    });

    cy.contains(prefMsgs.breaths_per_round).within(() => {
      cy.get("input").then(($inp) => {
        const minValue = $inp.attr("min") || -100;
        cy.log("min value for", $inp.attr("id"), "is", minValue);
        cy.wrap($inp).setSliderValue(+minValue);
      });
    });

    cy.contains(prefMsgs.breathing_pace).within(() => {
      cy.get("input").then(($inp) => {
        const minValue = $inp.attr("min") || -100;
        cy.log("min value for", $inp.attr("id"), "is", minValue);
        cy.wrap($inp).setSliderValue(+minValue);
      });
    });

    cy.contains(prefMsgs.recovery_time).within(() => {
      cy.get("input").then(($inp) => {
        const minValue = $inp.attr("min") || -100;
        cy.log("min value for", $inp.attr("id"), "is", minValue);
        cy.wrap($inp).setSliderValue(+minValue);
      });
    });

    cy.clock();
    cy.visit("/breathing-exercise");
    cy.contains(messages["en"].ex.start.start).click();
    cy.tick(4_000);
    cy.contains(messages.en.ex.breathing.start_tip).should("not.exist");

    const counterStartValue = 1;

    cy.contains('[data-test="ex-phase-counter"]', counterStartValue).should(
      "be.visible"
    );
  });
});
