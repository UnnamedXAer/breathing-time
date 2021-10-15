import { mount } from "@vue/test-utils";
import ActionBtn from "@/components/BreathingExercise/ActionBtn.vue";
import { expect } from "chai";

describe("ActionBtn.vue", () => {
  it("renders button with children in the default slot", () => {
    const text = "kittens action";

    const wrapper = mount(ActionBtn, {
      slots: {
        default: text,
      },
    });

    expect(wrapper.text()).eq(text);
  });
});
