import { expect } from "chai";
import { shallowMount, mount, RouterLinkStub } from "@vue/test-utils";
import { languages, messages } from "@/i18n";
import Header from "@/components/header/Header.vue";
import Logo from "@/components/ui/Logo.vue";
import { Language } from "@/i18n/types";

describe("Header.vue", () => {
  it("render correctly", () => {
    const wrapper = mount(Header, {
      global: {
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
  });

  it.only("change language", async (d) => {
    localStorage.removeItem("locale");
    const i18nMock = { locale: "pl" as Language, messages };
    const wrapper = shallowMount(Header, {
      global: {
        mocks: {
          $i18n: i18nMock,
          $t: (key: string) =>
            i18nMock.messages[i18nMock.locale]["header"]["home"],
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const languageSelect = wrapper.get('[data-test="languages"]');
    // const locale = Header.i18n!.locale;
    const locale = "en";

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newLocale = languages.find((l) => l !== locale)!;

    console.log(
      "LLLL --> ",
      (languageSelect.element as HTMLSelectElement).value
    );
    expect((languageSelect.element as HTMLSelectElement).value).eq(locale);
    await languageSelect.setValue(newLocale);

    expect((languageSelect.element as HTMLSelectElement).value).eq(newLocale);
    setTimeout(() => {
      expect(localStorage.getItem("locale")).eq(newLocale);
      d();
    }, 200);
  });
});
