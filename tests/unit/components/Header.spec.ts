import { expect } from "chai";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { createI18n, languages } from "@/i18n";
import Header from "@/components/header/Header.vue";
import Logo from "@/components/ui/Logo.vue";

describe("Header.vue", function () {
  it("render correctly", () => {
    const wrapper = mount(Header, {
      global: {
        mocks: {
          $i18n: { locale: "en" },
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const languageOptions = wrapper
      .get('[data-test="languages"]')
      .findAll("option");
    expect(wrapper.getComponent(Logo)).exist;
    expect(languageOptions.length).eq(languages.length);
    expect(wrapper.findAll('[data-test="nav"] a').length).greaterThanOrEqual(2);
  });

  it("change language", async () => {
    localStorage.removeItem("locale");

    const wrapper = mount(Header, {
      global: {
        plugins: [createI18n()],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const defaultLocale = wrapper.vm.$i18n.locale;
    const newLocale = languages.find((l) => l !== defaultLocale);
    const languageSelect = wrapper.get('[data-test="languages"]');
    const defaultHomeText = wrapper.get('[data-test="home-link"]').text();

    expect(defaultLocale).not.eq(newLocale);
    expect((languageSelect.element as HTMLSelectElement).value).eq(
      defaultLocale
    );
    await languageSelect.setValue(newLocale);
    expect((languageSelect.element as HTMLSelectElement).value).eq(newLocale);
    expect(wrapper.vm.$i18n.locale).eq(newLocale);
    expect(localStorage.getItem("locale")).eq(newLocale);

    expect(wrapper.get('[data-test="home-link"]').text()).to.not.be.eq(
      defaultHomeText
    );
  });
});
