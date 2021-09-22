import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Button from "@/components/ui/Button.vue";

describe("Button.vue", () => {
  it("render given title", () => {
    const title = "Dismiss kittens";
    const wrapper = shallowMount(Button, { slots: { default: title } });
    expect(wrapper.text()).eq(title);

    const elBtn = wrapper.get('[data-test="btn"');
    const classes = elBtn.classes;
    expect(classes.call(elBtn, "btn")).to.be.true;
    expect(classes.call(elBtn, "disabled")).to.be.false;
    expect(classes.call(elBtn, "loading")).to.be.false;
    expect(classes.call(elBtn, "normal")).to.be.true;
    expect(classes.call(elBtn, "contained")).to.be.true;

    expect(elBtn.attributes("disabled")).to.be.undefined;

    expect(wrapper.find('[data-test="btn-loading"]').exists()).to.be.false;
  });

  it("render disabled", () => {
    const title = "Disabled kittens";
    const wrapper = shallowMount(Button, {
      props: {
        disabled: true,
      },
      slots: { default: title },
    });

    const elBtn = wrapper.get('[data-test="btn"');
    const classes = elBtn.classes;
    expect(classes.call(elBtn, "disabled")).to.be.true;
    expect(classes.call(elBtn, "loading")).to.be.false;

    expect(elBtn.attributes("disabled")).to.not.be.undefined;

    expect(wrapper.find('[data-test="btn-loading"]').exists()).to.be.false;
  });

  it("render with loading", () => {
    const title = "Dismiss kittens";
    const wrapper = shallowMount(Button, {
      props: {
        loading: true,
      },
      slots: { default: title },
    });

    const elBtn = wrapper.get('[data-test="btn"');
    const classes = elBtn.classes;
    expect(classes.call(elBtn, "loading")).to.be.true;
    expect(classes.call(elBtn, "disabled")).to.be.false;

    expect(elBtn.attributes("disabled")).to.not.be.undefined;

    expect(wrapper.find('[data-test="btn-loading"]').exists()).to.be.true;
  });

  it("render warning / outlined", () => {
    const title = "Warn the kittens";
    const wrapper = shallowMount(Button, {
      props: {
        mode: "warning",
        variant: "outlined",
      },
      slots: { default: title },
    });

    const elBtn = wrapper.get('[data-test="btn"');
    const classes = elBtn.classes;
    expect(classes.call(elBtn, "warning")).to.be.true;
    expect(classes.call(elBtn, "outlined")).to.be.true;
    expect(classes.call(elBtn, "normal")).to.be.false;
    expect(classes.call(elBtn, "contained")).to.be.false;
  });
});
