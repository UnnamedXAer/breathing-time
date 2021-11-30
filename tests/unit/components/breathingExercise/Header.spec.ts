import Header from "@/components/BreathingExercise/Header.vue";
import { mount } from "@vue/test-utils";
import { expect } from "chai";

describe("Breathing Exercise / Header.vue", () => {
  it("renders childrens in slots", () => {
    const defaultSlotText = "default kittens";
    const additionalSlotText = "more kittens";
    const additionalSlotTmpl = `<small data-test="in-test-selector">${additionalSlotText}</small>`;

    const wrapper = mount(Header, {
      slots: {
        default: defaultSlotText,
        additional: additionalSlotTmpl,
      },
    });

    const tipText = wrapper.get('[data-test="ex-header-title"]').text();
    const additionalSlot = wrapper.find('[data-test="in-test-selector"]');

    expect(tipText).eq(defaultSlotText);
    expect(additionalSlot.exists()).to.be.true;
  });
});
