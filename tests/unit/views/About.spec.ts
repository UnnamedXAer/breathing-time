import About from "@/views/About.vue";
import { mount, VueWrapper } from "@vue/test-utils";
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

  it("renders correctly", () => {
    wrapper = mount(About, {
      global: {
        stubs: {
          "router-link": true,
        },
      },
    });

    const headerWrapper = wrapper.get('[data-test="about-title"]');
    const contentWrapper = wrapper.get('[data-test="about-content"]');
    const appVersionWrapper = wrapper.get('[data-test="about-version"]');

    expect(headerWrapper.text()).eq("about.title");
    expect(contentWrapper.text()).to.not.be.empty;
    expect(appVersionWrapper.text()).includes(process.env.APP_VERSION);
  });
});
