import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Alert from "@/components/ui/Alert.vue";

describe("Alert.vue", () => {
  it("render given text in default mode", () => {
    const msg = "Kittens are there.";
    const wrapper = shallowMount(Alert, {
      slots: { default: msg },
    });

    expect(wrapper.get('[data-test="slotwrapper"]').text()).eq(msg);
    const elAlert = wrapper.get('[data-test="alert"');
    const classes = elAlert.classes;
    expect(classes.call(elAlert, "alert")).to.be.true;
    expect(classes.call(elAlert, "normal")).to.be.true;
    expect(classes.call(elAlert, "contained")).to.be.true;
    expect(classes.call(elAlert, "dismissable")).to.be.false;
    expect(classes.call(elAlert, "with_icon")).to.be.false;

    expect(wrapper.find(".close_btn").exists()).to.be.false;
    expect(wrapper.find(".alert_icon").exists()).to.be.false;
  });

  it("render warning / outlined", () => {
    const msg = "Kittens are there.";

    const wrapper = shallowMount(Alert, {
      props: {
        mode: "warning",
        variant: "outlined",
      },
      slots: { default: msg },
    });

    expect(wrapper.get('[data-test="slotwrapper"]').text()).eq(msg);
    const elAlert = wrapper.get('[data-test="alert"');
    const classes = elAlert.classes;
    expect(classes.call(elAlert, "alert")).to.be.true;
    expect(classes.call(elAlert, "normal")).to.be.false;
    expect(classes.call(elAlert, "outlined")).to.be.true;
    expect(classes.call(elAlert, "dismissable")).to.be.false;
    expect(classes.call(elAlert, "with_icon")).to.be.true;

    expect(wrapper.find(".close_btn").exists()).to.be.false;
    expect(wrapper.find(".alert_icon").exists()).to.be.true;
  });

  it("allow to dismiss", () => {
    const msg = "Kittens are there.";
    let dismissed = false;
    function onDismiss() {
      dismissed = true;
    }

    const wrapper = shallowMount(Alert, {
      props: {
        dismiss: onDismiss,
      },
      slots: { default: msg },
    });

    expect(wrapper.get('[data-test="slotwrapper"]').text()).eq(msg);
    const elAlert = wrapper.get('[data-test="alert"');
    const classes = elAlert.classes;
    expect(classes.call(elAlert, "dismissable")).to.be.true;

    expect(wrapper.find(".close_btn").exists()).to.be.true;

    wrapper.get(".close_btn").trigger("click");
    expect(dismissed).to.be.true;
  });
});
