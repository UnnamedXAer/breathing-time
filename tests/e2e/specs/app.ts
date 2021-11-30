import { messages } from "../../../src/i18n";

describe("app", () => {
  beforeEach(function () {
    localStorage.clear();
  });

  it.only("shows banner about mobile app on mobile devices", function () {
    cy.viewport("macbook-11");
    cy.visit("/");
    cy.contains("messages.en.banner.text").should("not.exist");
    cy.viewport("samsung-s10");
    cy.contains(messages.en.banner.text).should("be.visible");
  });

  it("allows to open store or dismiss banner", function () {
    cy.visit("/", {
      onBeforeLoad: (win) => {
        win.open = cy.stub();
      },
    });

    cy.get('[data-test="mobile-banner"]').within(() => {
      cy.contains(messages.en.banner.download).click();

      cy.window()
        .its("open")
        .should(
          "have.been.calledOnceWithExactly",
          "https://play.google.com/store/apps/details?id=com.unnamedxaer.breathingtime"
        );

      cy.get('[data-test="mobile-banner-close"]').click().should("not.exist");

      cy.contains(messages.en.banner.text).should("not.exist");
      cy.contains(messages.en.banner.download).should("not.exist");
    });
  });

  it.only("caches dismiss of the mobile banner", function () {
    cy.viewport("samsung-s10");
    cy.visit("/");
    cy.contains(messages.en.banner.download).should("be.visible");

    cy.get('[data-test="mobile-banner-close"]').click();
    cy.contains(messages.en.banner.download).should("not.exist");
    cy.visit("/");
    cy.contains(messages.en.banner.download).should("not.exist");
  });
});
