import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/BreathingExercise/counter/Counter.vue";

describe("Breathing Exercise / Counter.vue", () => {
  it("render given number", () => {
    const number = 13;
    const wrapper = shallowMount(Counter, {
      props: {
        number,
      },
    });
    expect(wrapper.text()).eq("" + number);
  });
});
