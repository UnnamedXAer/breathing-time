import About from "@/views/About.vue";
import { mount, shallowMount, VueWrapper } from "@vue/test-utils";
import { expect } from "chai";

describe("About.vue - view", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: VueWrapper<any> | undefined;

  beforeEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = void 0;
    }
  });

  it.only("renders correctly", () => {
    wrapper = mount(About, {
      global: {
        stubs: {
          "i18n-t": {
            template: '<p data-test="about-stub-i18n-t" ></p>',
          },
          // "router-link": true,
        },
      },
    });

    console.log("-?>>>>", wrapper.html());

    const headerWrapper = wrapper.get('[data-test="about-title"]');
    const contentWrapper = wrapper.get('[data-test="about-content"]');
    const appVersionWrapper = wrapper.get('[data-test="about-version"]');
    expect(headerWrapper.text()).eq("about.title");
    expect(contentWrapper.text()).to.not.be.empty;
    expect(appVersionWrapper.text()).includes(process.env.APP_VERSION);
  });
});
