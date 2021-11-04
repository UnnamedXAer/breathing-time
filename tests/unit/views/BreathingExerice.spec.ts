import { shallowMount, VueWrapper } from "@vue/test-utils";
import BreathingExercise from "@/views/BreathingExercise.vue";
import chai, { expect } from "chai";
import { WatchCallback } from "vue";

describe("Breathing Exercise - View", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: VueWrapper<any> | undefined;
  const storeMock = {
    state: {
      exercise: {
        started: false,
      },
    },
  };

  beforeEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = void 0;
    }
  });

  it("renders correctly", async () => {
    wrapper = shallowMount(BreathingExercise, {
      global: {
        stubs: ["router-view"],
      },
    });

    const headerWrapper = wrapper.find<HTMLHeadingElement>(
      '[data-test="ex-title"]'
    );

    const routerWrapper = wrapper.find('[data-test="ex-router"]');

    expect(headerWrapper.exists()).to.be.true;
    expect(headerWrapper.text()).eq("ex.title");

    expect(routerWrapper.exists()).to.be.true;
  });

  it("adds and removes window before unload event on exercise start / stop", async () => {
    storeMock.state.exercise.started = false;

    wrapper = shallowMount(BreathingExercise, {
      global: {
        stubs: ["router-view"],
      },
    });

    const addEventListenerSpy = chai.spy();
    const removeEventListenerSpy = chai.spy();
    window.addEventListener = addEventListenerSpy;
    window.removeEventListener = removeEventListenerSpy;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const watchStartCallBack = wrapper.vm.$options.watch![
      "$store.state.exercise.started"
    ] as WatchCallback;

    watchStartCallBack(true, false, () => void 0);
    expect(addEventListenerSpy).to.have.been.called.once;

    watchStartCallBack(false, true, () => void 0);
    expect(removeEventListenerSpy).to.have.been.called.once;
  });
});
