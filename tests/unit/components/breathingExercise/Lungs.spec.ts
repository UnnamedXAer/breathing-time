import chai, { expect } from "chai";
import spies from "chai-spies";
import { shallowMount } from "@vue/test-utils";
import Lungs from "@/components/BreathingExercise/counter/Lungs.vue";
import { namespaceName } from "@/store";
import {
  ExerciseActions,
  UpdatePreferencesPayload,
} from "@/store/modules/exercise/types";

chai.use(spies);

describe("Breathing Exercise / Lungs.vue", () => {
  it("render correctly", () => {
    const number = 13;
    const wrapper = shallowMount(Lungs, {
      props: {
        animationDuration: 2000,
        counter: number,
      },
    });

    const title = wrapper
      .get('[data-test="animation-wrapper"]')
      .attributes("title");
    const animationEl = wrapper.find('[data-test="animation"]');
    const disabledInfoEl = wrapper.find('[data-test="animation-disabled"]');

    expect(title).includes("_animation");
    expect(animationEl.exists()).to.be.true;
    expect(disabledInfoEl.exists()).to.be.false;
  });

  it("hides animation when disabled", () => {
    const number = 13;
    const wrapper = shallowMount(Lungs, {
      props: {
        animationDuration: 2000,
        counter: number,
        disableAnimation: true,
      },
    });

    const animationEl = wrapper.find('[data-test="animation"]');
    const disabledInfoEl = wrapper.find('[data-test="animation-disabled"]');

    expect(animationEl.exists()).to.be.false;
    expect(disabledInfoEl.exists()).to.be.true;
  });

  it("dispatches update preferences to toggle animation when clicked", async () => {
    const dispatchSpy = chai.spy();

    const number = 13;
    const wrapper = shallowMount(Lungs, {
      props: {
        animationDuration: 2000,
        counter: number,
      },
      global: {
        mocks: {
          $store: {
            dispatch: dispatchSpy,
          },
        },
      },
    });

    await wrapper.get('[data-test="animation-wrapper"]').trigger("click");

    expect(dispatchSpy).to.be.called.once;
    expect(dispatchSpy).to.have.been.called.with.exactly(
      namespaceName("exercise", ExerciseActions.UpdatePreferences),
      {
        propName: "disableAnimation",
        value: true,
      } as UpdatePreferencesPayload
    );
  });

  it("toggles classes when counter changes", async () => {
    const number = 13;
    const wrapper = shallowMount(Lungs, {
      props: {
        animationDuration: 2000,
        counter: number,
      },
    });

    const animationWrapper = wrapper.get('[data-test="animation"]');

    expect(animationWrapper.classes("odd")).to.be.true;
    expect(animationWrapper.classes("even")).to.be.false;

    await wrapper.setProps({ counter: number + 1 });

    expect(animationWrapper.classes("odd")).to.be.false;
    expect(animationWrapper.classes("even")).to.be.true;
  });
});
