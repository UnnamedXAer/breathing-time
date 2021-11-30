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

  it("check on click / emits", async () => {
    const id = "kittens_allowed";
    const wrapper = shallowMount(Checkbox, {
      props: {
        name: id,
        id,
        value: false,
      },
    });

    await wrapper.trigger("click");
    expect(wrapper.emitted()).haveOwnProperty("modify");
    expect(wrapper.emitted()["modify"][0]).to.be.eql([id, true]);
    await wrapper.trigger("click");
    expect(wrapper.emitted()["modify"][1]).to.be.eql([id, false]);
  });
});
