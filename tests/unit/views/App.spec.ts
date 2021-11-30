import { shallowMount, VueWrapper } from "@vue/test-utils";
import App from "@/App.vue";
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
import chai, { expect } from "chai";
import { namespaceName } from "@/store/createStore";
import { ExerciseActions } from "@/store/modules/exercise/types";

describe("App.vue - view", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: VueWrapper<any> | undefined;

  beforeEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = void 0;
    }
  });

  it("renders correctly", () => {
    wrapper = shallowMount(App, {
      global: {
        stubs: ["router-view"],
        mocks: {
          $store: {
            dispatch: () => void 0,
          },
        },
      },
    });

    const headerWrapper = wrapper.findComponent(Header);
    const footerWrapper = wrapper.findComponent(Footer);
    const routerWrapper = wrapper.find('[data-test="app-router"]');

    expect(headerWrapper.exists()).to.be.true;
    expect(footerWrapper.exists()).to.be.true;
    expect(routerWrapper.exists()).to.be.true;
  });

  it("on mount dispatches action to read cached values", async () => {
    const dispatchSpy = chai.spy();

    wrapper = shallowMount(App, {
      global: {
        stubs: ["router-view"],
        mocks: {
          $store: {
            dispatch: dispatchSpy,
          },
        },
      },
    });

    expect(dispatchSpy).to.have.been.called.once;
    expect(dispatchSpy).to.have.been.called.with(
      namespaceName("exercise", ExerciseActions.ReadCachedPreferences)
    );
  });
});
