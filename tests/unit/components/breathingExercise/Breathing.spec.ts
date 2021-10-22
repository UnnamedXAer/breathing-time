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
import { RouteLocationNormalized } from "vue-router";
import MixinLeaveExercise from "@/components/BreathingExercise/MixinLeaveExercise.vue";
import Modal from "@/components/modal/Modal.vue";

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

  it("calls next screen when counter reaches 'breaths per round'", async () => {
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

  it("shows exercise leave confirmation if try to navigate from 'exercise' routes", async () => {
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
          counter: 5,
        };
      },
      global: {
        plugins: [store],
        mixins: [MixinLeaveExercise],
        mocks: {
          $router: {
            replace: replaceSpy,
          },
        },
      },
    });

    const routeName = "Home";

    expect(wrapper.vm.showModal).to.be.false;
    expect(wrapper.vm.allowNavigation).to.be.false;
    expect(wrapper.vm.routeToNavigate).to.be.null;
    expect(wrapper.findComponent(LeaveExerciseConfirm).exists()).to.be.false;

    const to = {
      name: routeName,
      params: {},
    } as RouteLocationNormalized;
    const from = {} as RouteLocationNormalized;
    const next = () => void 0;

    expect(Breathing.beforeRouteLeave).to.not.be.undefined;

    if (!Breathing.beforeRouteLeave) {
      expect(false, "beforeRouteLeave hook is missing").eq(true);
      return;
    }

    Breathing.beforeRouteLeave.call(wrapper.vm, to, from, next);

    expect(wrapper.vm.showModal).to.be.true;
    expect(wrapper.vm.allowNavigation).to.be.false;
    expect(wrapper.vm.routeToNavigate).eq(routeName);

    await wrapper.vm.$nextTick();

    const leaveExerciseConfirmWrapper =
      wrapper.findComponent(LeaveExerciseConfirm);
    expect(leaveExerciseConfirmWrapper.exists()).to.be.true;
  });

  it("leaves exercise if user confirms dialog", async () => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
    };

    const replaceSpy = chai.spy();

    const wrapper = mount(Breathing, {
      attachTo: document.body,
      data() {
        return {
          showStartTip: false,
          counter: 5,
        };
      },
      global: {
        plugins: [store],
        mixins: [MixinLeaveExercise],
        mocks: {
          $router: {
            replace: replaceSpy,
          },
        },
      },
    });

    const routeName = "Home";

    const to = {
      name: routeName,
      params: {},
    } as RouteLocationNormalized;
    const from = {} as RouteLocationNormalized;
    const next = () => void 0;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    Breathing.beforeRouteLeave!.call(wrapper.vm, to, from, next);
    await wrapper.vm.$nextTick();

    // LeaveExerciseConfirm - use underling modal component
    // to capture correct element (html).
    const leaveExerciseWrapper = wrapper.findComponent(Modal);

    const actionWrappers = leaveExerciseWrapper.findAll(
      '[data-test="actions"] [data-test="btn"]'
    );

    const confirmActionWrapper = actionWrappers.find((x) =>
      x.text().includes("yes")
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await confirmActionWrapper!.trigger("click");

    expect(replaceSpy).to.be.called.once;
    expect(replaceSpy).to.be.called.with({
      name: to.name,
      params: {
        allowNavigation: 1,
      },
    });
  });

  it("allows to navigate to next phase without asking", () => {
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
          counter: 5,
        };
      },
      global: {
        plugins: [store],
        mixins: [MixinLeaveExercise],
        mocks: {
          $router: {
            replace: replaceSpy,
          },
        },
      },
    });

    const routeName = "BreathingExercise-BreathHold";

    const to = {
      name: routeName,
      params: {},
    } as RouteLocationNormalized;
    const from = {} as RouteLocationNormalized;
    const next = () => void 0;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let accepted = Breathing.beforeRouteLeave!.call(wrapper.vm, to, from, next);

    expect(accepted).to.be.true;

    to.name = "BreathingExercise-Summary";

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    accepted = Breathing.beforeRouteLeave!.call(wrapper.vm, to, from, next);

    expect(accepted).to.be.false;
  });

  it.only('hides animation is disabled in the "Preferences"', async () => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
      disableAnimation: false,
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
            replace: () => void 0,
          },
        },
      },
    });

    const animationWrapper = wrapper.get('[data-test="animation-wrapper"]');
    expect(animationWrapper.text()).empty;

    state.exercise.disableAnimation = true;
    await wrapper.vm.$nextTick();
    expect(animationWrapper.text()).eq("ex.breathing.enable_animation");
  });
});
