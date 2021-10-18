import Breathing from "@/components/BreathingExercise/Breathing.vue";
import { createStoreFactory } from "@/store/createStore";
import { mount } from "@vue/test-utils";
import { expect } from "chai";
import Header from "@/components/BreathingExercise/Header.vue";
import StartTip from "@/components/BreathingExercise/StartTip.vue";
import Lungs from "@/components/BreathingExercise/counter/Lungs.vue";
import LeaveExerciseConfirm from "@/components/BreathingExercise/LeaveExerciseConfirm.vue";
import Counter from "@/components/BreathingExercise/counter/Counter.vue";
import Footer from "@/components/BreathingExercise/Footer.vue";

describe("Breathing Exercise / Breathing.vue", () => {
  const store = createStoreFactory();

  it("renders correctly", async () => {
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
    const nextBtnWrapper = wrapper.find('[data-test="breathing-counter"]');
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
});
