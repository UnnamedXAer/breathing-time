import Breathing from "@/components/BreathingExercise/Breathing.vue";
import { createStoreFactory } from "@/store/createStore";
import { flushPromises, mount } from "@vue/test-utils";
import chai, { expect } from "chai";
import Header from "@/components/BreathingExercise/Header.vue";
import StartTip from "@/components/BreathingExercise/StartTip.vue";
import Lungs from "@/components/BreathingExercise/counter/Lungs.vue";
import LeaveExerciseConfirm from "@/components/BreathingExercise/LeaveExerciseConfirm.vue";
import Counter from "@/components/BreathingExercise/counter/Counter.vue";
import Footer from "@/components/BreathingExercise/Footer.vue";
import { StoreState } from "@/store/types";

describe("Breathing Exercise / Breathing.vue", () => {
  it("renders correctly", async () => {
    const store = createStoreFactory();
    let showStartTip = true;

    const wrapper = mount(Breathing, {
      global: {
        plugins: [store],
      },
    });

    const headerWrapper = wrapper.findComponent(Header);
    const starTipWrapper = wrapper.findComponent(StartTip);
    const lungsWrapper = wrapper.findComponent(Lungs);
    let counterWrapper = wrapper.findComponent(Counter);
    const nextBtnWrapper = wrapper.find(
      '[data-test="breathing-next-screen-btn"]'
    );
    const footerWrapper = wrapper.findComponent(Footer);
    const leaveExerciseConfirmWrapper =
      wrapper.findComponent(LeaveExerciseConfirm);

    expect(headerWrapper.exists()).to.be.true;
    expect(headerWrapper.text()).eq("ex.breathing.title");
    expect(starTipWrapper.exists()).eq(showStartTip);
    expect(starTipWrapper.text()).eq("ex.breathing.start_tip");
    expect(lungsWrapper.exists()).eq(!showStartTip);
    expect(counterWrapper.exists()).eq(!showStartTip);
    expect(nextBtnWrapper.exists()).eq(!showStartTip);
    expect(footerWrapper.exists()).eq(!showStartTip);
    expect(leaveExerciseConfirmWrapper.exists()).to.be.false;

    showStartTip = false;
    await wrapper.setData({ showStartTip: showStartTip });
    console.log("showStartTip", showStartTip);
    counterWrapper = wrapper.findComponent(Counter);
    expect(counterWrapper.exists()).eq(!showStartTip);
  });

  it("counts up automatically", async () => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
      breathTime: 0,
    };

    const wrapper = mount(Breathing, {
      data() {
        return {
          showStartTip: false,
        };
      },
      global: {
        plugins: [store],
        mocks: {
          $router: {
            replace: () => {
              return;
            },
          },
        },
      },
    });

    await flushPromises();

    expect(wrapper.vm.counter).greaterThan(1);
  });

  it('navigates to the next screen on "Next Screen" press', async () => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
    };

    const replaceSpy = chai.spy();

    const wrapper = mount(Breathing, {
      data() {
        return {
          showStartTip: false,
        };
      },
      global: {
        plugins: [store],
        mocks: {
          $router: {
            replace: replaceSpy,
          },
        },
      },
    });

    const startBtnWrapper = wrapper.get(
      '[data-test="breathing-next-screen-btn"]'
    );

    await startBtnWrapper.trigger("click");

    expect(replaceSpy).to.have.been.called.once;
    expect(replaceSpy).to.have.been.called.with({
      name: "BreathingExercise-BreathHold",
    });
  });

  it("calls next screen when counter reaches 'breath per round'", async () => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
    };

    const replaceSpy = chai.spy();

    mount(Breathing, {
      data() {
        return {
          showStartTip: false,
          breathTime: 0,
          breathsPerRound: 1,
        };
      },
      global: {
        plugins: [store],
        mocks: {
          $router: {
            replace: replaceSpy,
          },
        },
      },
    });

    await flushPromises();

    expect(replaceSpy).to.have.been.called.once;
    expect(replaceSpy).to.have.been.called.with({
      name: "BreathingExercise-BreathHold",
    });
  });
});
