import { mount } from "@vue/test-utils";
import chai, { expect } from "chai";
import { createStoreFactory, namespaceName } from "@/store/createStore";
import BreathHold from "@/components/BreathingExercise/BreathHold.vue";
import Header from "@/components/BreathingExercise/Header.vue";
import StartTip from "@/components/BreathingExercise/StartTip.vue";
import LeaveExerciseConfirm from "@/components/BreathingExercise/LeaveExerciseConfirm.vue";
import Counter from "@/components/BreathingExercise/counter/Counter.vue";
import Footer from "@/components/BreathingExercise/Footer.vue";
import { StoreState } from "@/store/types";
import ActionBtn from "@/components/BreathingExercise/ActionBtn.vue";
import Modal from "@/components/modal/Modal.vue";
import Alert from "@/components/ui/Alert.vue";
import { ExerciseMutations } from "@/store/modules/exercise/types";
import { RoundState } from "@/types/breath";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

describe("Breathing Exercise / BreathHold.vue", () => {
  it("renders correctly", async () => {
    const store = createStoreFactory();

    const wrapper = mount(BreathHold, {
      global: {
        plugins: [store],
      },
    });

    let showStartTip = true;

    const headerWrapper = wrapper.findComponent(Header);
    let starTipWrapper = wrapper.findComponent(StartTip);
    let counterWrapper = wrapper.findComponent(Counter);
    let actionBtnWrapper = wrapper.findComponent(ActionBtn);
    let footerWrapper = wrapper.findComponent(Footer);
    const leaveExerciseConfirmWrapper =
      wrapper.findComponent(LeaveExerciseConfirm);

    expect(headerWrapper.exists()).to.be.true;
    expect(headerWrapper.text()).eq("ex.hold.title");
    expect(starTipWrapper.exists()).eq(showStartTip);
    expect(starTipWrapper.text()).eq("ex.hold.start_tip");
    expect(counterWrapper.exists()).eq(!showStartTip);
    expect(actionBtnWrapper.exists()).eq(!showStartTip);
    expect(footerWrapper.exists()).eq(!showStartTip);
    expect(leaveExerciseConfirmWrapper.exists()).to.be.false;

    showStartTip = false;

    await wrapper.setData({ showStartTip });

    starTipWrapper = wrapper.findComponent(StartTip);
    counterWrapper = wrapper.findComponent(Counter);
    actionBtnWrapper = wrapper.findComponent(ActionBtn);
    footerWrapper = wrapper.findComponent(Footer);
    expect(starTipWrapper.exists()).eq(showStartTip);
    expect(counterWrapper.exists()).eq(!showStartTip);
    expect(actionBtnWrapper.exists()).eq(!showStartTip);
    expect(footerWrapper.exists()).eq(!showStartTip);

    expect(actionBtnWrapper.text()).eq("ex.hold.skip_to_next");
    expect(footerWrapper.text()).eq("ex.hold.footer_tip");
  });

  it("counts up automatically", (done) => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
      breathTime: 0,
    };

    const wrapper = mount(BreathHold, {
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

    // double timeout for: "startTipTimeout" and "interval" timeouts
    // to be called in component before testing results
    setTimeout(() => {
      setTimeout(() => {
        expect(wrapper.vm.counter).greaterThan(0);
        done();
      });
    });
  });

  it("updates exercise state on mount", () => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
    };
    const commitSpy = chai.spy();
    store.commit = commitSpy;

    mount(BreathHold, {
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

    expect(commitSpy).to.have.been.called.once;
    expect(commitSpy).to.have.been.called.with(
      namespaceName("exercise", ExerciseMutations.SetRoundState),
      RoundState.BreathHold
    );
  });

  it("stores results on next screen action", () => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
    };
    const commitSpy = chai.spy();
    store.commit = commitSpy;

    const wrapper = mount(BreathHold, {
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

    wrapper.vm.nextScreen();
    type Spy = {
      __spy: {
        calls: (string | number | undefined)[][];
      };
    };
    const _commitSpy = commitSpy as unknown as Spy;

    expect(commitSpy).to.have.been.called.twice;
    expect(_commitSpy.__spy.calls[1][0]).eq(
      namespaceName("exercise", ExerciseMutations.AddHoldTime)
    );
    expect(_commitSpy.__spy.calls[1][1]).match(/\d/);
  });

  it("navigates to next screen on action btn press", async () => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
    };
    store.commit = () => void 0;

    const replaceSpy = chai.spy();

    const wrapper = mount(BreathHold, {
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

    const actionBtnWrapper = wrapper.get(
      '[data-test="next-screen-action-btn"]'
    );
    await actionBtnWrapper.trigger("click");

    expect(replaceSpy).to.have.been.called.once;
    expect(replaceSpy).to.have.been.called.with({
      name: "BreathingExercise-Recovery",
    });
  });

  it("allows to navigate to the Recovery screen without asking", async () => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
    };
    store.commit = () => void 0;

    const wrapper = mount(BreathHold, {
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

    if (!BreathHold.beforeRouteLeave) {
      expect(false, "beforeRouteLeave hook is missing").eq(true);
      return;
    }

    const routeName = "BreathingExercise-Recovery";
    const to = {
      name: routeName,
    } as RouteLocationNormalized;
    const from = {} as RouteLocationNormalized;
    const next = (() => void 0) as NavigationGuardNext;

    const accepted = BreathHold.beforeRouteLeave.call(
      wrapper.vm,
      to,
      from,
      next
    );

    expect(wrapper.vm.showModal).to.be.false;
    expect(accepted).to.be.true;
  });

  it("ask before leaving exercise", async () => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
    };
    store.commit = () => void 0;

    const wrapper = mount(BreathHold, {
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

    const routeName = "Home";
    const to = {
      name: routeName,
      params: {},
    } as RouteLocationNormalized;
    const from = {} as RouteLocationNormalized;
    const next = (() => void 0) as NavigationGuardNext;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const accepted = BreathHold.beforeRouteLeave!.call(
      wrapper.vm,
      to,
      from,
      next
    );

    await wrapper.vm.$nextTick();

    const leaveExerciseConfirmWrapper =
      wrapper.findComponent(LeaveExerciseConfirm);

    expect(wrapper.vm.showModal).to.be.true;
    expect(accepted).to.be.false;
    expect(leaveExerciseConfirmWrapper.exists()).to.be.true;
  });

  it("leave the exercise if user confirms dialog", async () => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
    };
    store.commit = () => void 0;
    const replaceSpy = chai.spy();

    const wrapper = mount(BreathHold, {
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

    const routeName = "Home";

    const to = {
      name: routeName,
      params: {},
    } as RouteLocationNormalized;
    const from = {} as RouteLocationNormalized;
    const next = () => void 0;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    BreathHold.beforeRouteLeave!.call(wrapper.vm, to, from, next);
    await wrapper.vm.$nextTick();

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

  it("shows alert if user is idle too long", async () => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
    };
    store.commit = () => void 0;

    const wrapper = mount(BreathHold, {
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

    let alertWrapper = wrapper.findComponent(Alert);

    expect(alertWrapper.exists()).to.be.false;

    await wrapper.setData({ counter: 601 });

    alertWrapper = wrapper.findComponent(Alert);

    expect(alertWrapper.exists()).to.be.true;
  });

  it("can dismiss alert about idle", async () => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
    };
    store.commit = () => void 0;

    const wrapper = mount(BreathHold, {
      data() {
        return {
          counter: 601,
          showAreYouThere: true,
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

    let alertWrapper = wrapper.findComponent(Alert);

    await alertWrapper.get('[data-test="alert-dismiss-btn"]').trigger("click");

    await wrapper.vm.$nextTick();
    alertWrapper = wrapper.findComponent(Alert);

    expect(alertWrapper.exists()).to.be.false;
  });

  it.only("does not shows idle alert after dismissing it", async () => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
    };
    store.commit = () => void 0;

    const wrapper = mount(BreathHold, {
      data() {
        return {
          counter: 666,
          showStartTip: false,
          showAreYouThere: true,
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

    let alertWrapper = wrapper.findComponent(Alert);
    expect(alertWrapper.exists()).to.be.true;

    wrapper.vm.dismissAlert();
    wrapper.vm.count();

    await wrapper.vm.$nextTick();

    alertWrapper = wrapper.findComponent(Alert);
    expect(alertWrapper.exists()).to.be.false;
  });

  it("info about last round", async () => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
      numberOfRounds: 3,
      holdTimes: [],
    };
    store.commit = () => void 0;

    const wrapper = mount(BreathHold, {
      data() {
        return {
          counter: 601,
          showAreYouThere: true,
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

    let footerText = wrapper.getComponent(Footer).text();
    expect(
      footerText,
      "should not show message about last round"
    ).to.not.includes("ex.hold.last_round_tip");

    state.exercise.holdTimes = [1, 2];
    await wrapper.vm.$nextTick();

    footerText = wrapper.getComponent(Footer).text();
    expect(footerText, "should show message about last round").to.includes(
      "ex.hold.last_round_tip"
    );
  });
});
