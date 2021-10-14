import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import StartTip from "@/components/BreathingExercise/StartTip.vue";

describe("StartTip.vue", () => {
  it("render given text", () => {
    const text = "kittens tip";
    const wrapper = shallowMount(StartTip, {
      slots: {
        default: text,
      },
    });
    expect(wrapper.text()).eq(text);
  });
});
