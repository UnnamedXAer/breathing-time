import { expect } from "chai";
import { mount } from "@vue/test-utils";
import LeaveExerciseConfirm from "@/components/BreathingExercise/LeaveExerciseConfirm.vue";
import Modal from "@/components/modal/Modal.vue";

describe("LeaveExerciseConfirm.vue", () => {
  afterEach(() => {
    document.body.outerHTML = "";
  });

  it("render modal in teleport", () => {
    const wrapper = mount(LeaveExerciseConfirm, {});

    const modalWrapper = wrapper.getComponent(Modal);
    console.log(modalWrapper.find('[data-test="modal"]').html());

    expect(modalWrapper.find('[data-test="modal"]').exists()).to.be.true;
  });
});
