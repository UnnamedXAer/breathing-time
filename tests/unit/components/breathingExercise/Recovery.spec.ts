import { mount } from "@vue/test-utils";
import chai, { expect } from "chai";
import { createStoreFactory, namespaceName } from "@/store/createStore";
import Recovery from "@/components/BreathingExercise/Recovery.vue";
import Header from "@/components/BreathingExercise/Header.vue";
import StartTip from "@/components/BreathingExercise/StartTip.vue";
import LeaveExerciseConfirm from "@/components/BreathingExercise/LeaveExerciseConfirm.vue";
import Counter from "@/components/BreathingExercise/counter/Counter.vue";
import Footer from "@/components/BreathingExercise/Footer.vue";
import { StoreState } from "@/store/types";
import Modal from "@/components/modal/Modal.vue";
import { ExerciseMutations } from "@/store/modules/exercise/types";
import { RoundState } from "@/types/breath";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

describe("Breathing Exercise / Recovery.vue", () => {
  it("renders correctly", async () => {
    const store = createStoreFactory();

    const wrapper = mount(Recovery, {
      global: {
        plugins: [store],
      },
    });

    let showStartTip = true;

    const headerWrapper = wrapper.findComponent(Header);
    let starTipWrapper = wrapper.findComponent(StartTip);
    let counterWrapper = wrapper.findComponent(Counter);
    let footerWrapper = wrapper.findComponent(Footer);
    let nextBtnWrapper = wrapper.find(
      '[data-test="breathing-next-screen-btn"]'
    );
    const leaveExerciseConfirmWrapper =
      wrapper.findComponent(LeaveExerciseConfirm);

    expect(headerWrapper.exists()).to.be.true;
    expect(headerWrapper.text()).eq("ex.recovery.title");
    expect(starTipWrapper.exists()).eq(showStartTip);
    expect(starTipWrapper.text()).eq("ex.recovery.start_tip");
    expect(counterWrapper.exists()).eq(!showStartTip);
    expect(nextBtnWrapper.exists()).eq(!showStartTip);
    expect(footerWrapper.exists()).eq(!showStartTip);
    expect(leaveExerciseConfirmWrapper.exists()).to.be.false;

    showStartTip = false;

    await wrapper.setData({ showStartTip });

    starTipWrapper = wrapper.findComponent(StartTip);
    counterWrapper = wrapper.findComponent(Counter);
    nextBtnWrapper = wrapper.find('[data-test="recovery-next-screen-btn"]');
    footerWrapper = wrapper.findComponent(Footer);

    expect(starTipWrapper.exists()).eq(showStartTip);
    expect(counterWrapper.exists()).eq(!showStartTip);
    expect(nextBtnWrapper.exists()).eq(!showStartTip);
    expect(footerWrapper.exists()).eq(!showStartTip);

    expect(footerWrapper.text()).eq("ex.recovery.footer_tip");
  });

  it("counts up automatically", (done) => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
      breathTime: 0,
    };

    const wrapper = mount(Recovery, {
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

    setTimeout(() => {
      setTimeout(() => {
        expect(wrapper.vm.counter).greaterThan(0);
        done();
      });
    });
  });
});
