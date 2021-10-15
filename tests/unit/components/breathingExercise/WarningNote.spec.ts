import { shallowMount } from "@vue/test-utils";
import WarningNote from "@/components/BreathingExercise/WarningNote.vue";
import { expect } from "chai";

describe("Breathing Exercise / WarningNote.vue", () => {
  it("renders warning note text", () => {
    const wrapper = shallowMount(WarningNote);

    const titleText = wrapper.get('[data-test="warning-note-title"]').text();
    const contentText = wrapper
      .get('[data-test="warning-note-content"]')
      .text();

    expect(titleText).eq("ex.warning.title");
    expect(contentText).eq("ex.warning.text");
  });
});
