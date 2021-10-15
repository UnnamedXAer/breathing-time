import chai, { expect } from "chai";
import { mount } from "@vue/test-utils";
import LeaveExerciseConfirm from "@/components/BreathingExercise/LeaveExerciseConfirm.vue";
import Modal from "@/components/modal/Modal.vue";

describe("LeaveExerciseConfirm.vue", () => {
  afterEach(() => {
    document.body.outerHTML = "";
  });

  it("render correctly in the teleport", () => {
    const cancelHandler = chai.spy();
    const confirmHandler = chai.spy();

    const wrapper = mount(LeaveExerciseConfirm, {
      //vue test util mount does not like on[Something] functions like onCancel
      props: {
        cancelHandler,
        confirmHandler,
      },
    });

    const modalWrapper = wrapper.getComponent(Modal);

    expect(modalWrapper.element.parentNode?.nodeName).eq("BODY");
    expect(modalWrapper.get('[data-test="content"]').text()).eq(
      "ex.leave.content"
    );
    expect(modalWrapper.get('[data-test="title"]').text()).eq("ex.leave.title");
    expect(modalWrapper.get('[data-test="actions"]').text()).eq(
      "common.yes" + "common.no"
    );
  });
});
