import { mount, shallowMount, VueWrapper } from "@vue/test-utils";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: VueWrapper<any> | undefined;

  beforeEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = void 0;
    }
  });

  it("renders correctly", async () => {
    const store = createStoreFactory();

    wrapper = mount(Recovery, {
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

    wrapper = mount(Recovery, {
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(wrapper!.vm.counter).greaterThan(0);
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

    mount(Recovery, {
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
      RoundState.Recovery
    );
  });

  it("navigates to next screen on 'skip to next' press", async () => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
    };
    store.commit = () => void 0;

    const replaceSpy = chai.spy();

    wrapper = mount(Recovery, {
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
      '[data-test="recovery-next-screen-btn"]'
    );
    await actionBtnWrapper.trigger("click");

    expect(replaceSpy).to.have.been.called.once;
    expect(replaceSpy).to.have.been.called.with({
      name: "BreathingExercise-Breathing",
      params: { fromRecovery: 1 },
    });
  });

  it("allows to navigate to the Breathing/Summary screen without asking", async () => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
    };
    store.commit = () => void 0;

    wrapper = mount(Recovery, {
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

    if (!Recovery.beforeRouteLeave) {
      expect(false, "beforeRouteLeave hook is missing").eq(true);
      return;
    }

    let routeName = "BreathingExercise-Breathing";
    const to = {
      name: routeName,
    } as RouteLocationNormalized;
    const from = {} as RouteLocationNormalized;
    const next = (() => void 0) as NavigationGuardNext;

    let accepted = Recovery.beforeRouteLeave.call(wrapper.vm, to, from, next);

    expect(wrapper.vm.showModal).to.be.false;
    expect(accepted).to.be.true;

    //navigate to summary
    routeName = "BreathingExercise-Summary";
    to.name = routeName;

    accepted = Recovery.beforeRouteLeave.call(wrapper.vm, to, from, next);

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

    wrapper = mount(Recovery, {
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
    const accepted = Recovery.beforeRouteLeave!.call(
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

    wrapper = mount(Recovery, {
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
    Recovery.beforeRouteLeave!.call(wrapper.vm, to, from, next);
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

  it("skip to next button's text changes if current round is last.", async () => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
      numberOfRounds: 3,
      holdTimes: [],
    };
    store.commit = () => void 0;

    wrapper = mount(Recovery, {
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

    const expectedText = () =>
      "ex.recovery.skip_to_" +
      (state.exercise.holdTimes.length >= state.exercise.numberOfRounds
        ? "summary"
        : "next");

    let nextScreenBtnText = wrapper
      .get('[data-test="recovery-next-screen-btn"]')
      .text();

    expect(nextScreenBtnText, "should includes 'next'").eq(expectedText());

    state.exercise.holdTimes = [1, 2, 3];
    await wrapper.vm.$nextTick();

    nextScreenBtnText = wrapper
      .get('[data-test="recovery-next-screen-btn"]')
      .text();

    expect(nextScreenBtnText, "should includes 'summary'").eq(expectedText());
  });

  it("redirects to proper screen (Breathing/Summary) based on current round number", async () => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
      numberOfRounds: 3,
      holdTimes: [],
    };
    store.commit = () => void 0;
    const replaceSpy = chai.spy();

    wrapper = mount(Recovery, {
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

    const nextScreenBtnWrapper = wrapper.get(
      '[data-test="recovery-next-screen-btn"]'
    );

    await nextScreenBtnWrapper.trigger("click");

    const expectedParam = {
      name: "BreathingExercise-Breathing",
      params: {
        fromRecovery: 1,
      },
    };

    expect(replaceSpy).to.have.been.called.once;
    expect(
      replaceSpy,
      "should redirect to 'Breathing'"
    ).to.have.been.called.with(expectedParam);

    expectedParam.name = "BreathingExercise-Summary";

    state.exercise.holdTimes = [1, 2, 3];
    await wrapper.vm.$nextTick();
    await nextScreenBtnWrapper.trigger("click");

    expect(replaceSpy).to.have.been.called.twice;
    expect(replaceSpy, "should redirect to 'Summary'").to.have.been.called.with(
      expectedParam
    );
  });

  it("redirects automatically after counting finish", (done) => {
    const store = createStoreFactory();
    const state = store.state as StoreState;
    (state as StoreState).exercise = {
      ...state.exercise,
      disableStartTips: true,
      recoveryTime: 1,
    };

    store.commit = () => void 0;
    const replaceSpy = chai.spy();
    wrapper = shallowMount(Recovery, {
      global: {
        plugins: [store],
        mocks: {
          $router: {
            replace: replaceSpy,
          },
        },
      },
    });

    // start tip tm, interval 0 -> 1, interval -> 1 -> next screen
    setTimeout(() =>
      setTimeout(() =>
        setTimeout(() => {
          expect(replaceSpy).to.have.been.called.once;
          expect(replaceSpy).to.have.been.called.with({
            name: "BreathingExercise-Breathing",
            params: {
              fromRecovery: 1,
            },
          });

          done();
        })
      )
    );
  });
});
