import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Checkbox from "@/components/ui/Checkbox.vue";

describe("Checkbox.vue", () => {
  it("render with label and id", async () => {
    const label = "Kittens allowed:";
    const id = "kittens_allowed";
    const wrapper = shallowMount(Checkbox, {
      props: {
        name: id,
        id,
        value: false,
      },
      slots: {
        default: label,
      },
    });
    expect(wrapper.text()).eq(label);

    const input = wrapper.get("input");

    expect(input.attributes("id")).eq(id);
    expect(input.attributes("name")).eq(id);
    expect(input.element.checked).to.be.false;

    await wrapper.setProps({ value: true });
    expect(input.element.checked).to.be.true;
  });

  it("check on click", async () => {
    const id = "kittens_allowed";
    const wrapper = shallowMount(Checkbox, {
      props: {
        name: id,
        id,
        value: false,
      },
    });
    const input = wrapper.get("input");
    const ctrlIndicator = wrapper.get(".control_indicator");
    // check if emitted "modify"
  });
});
