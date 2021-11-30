import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Range from "@/components/ui/Range.vue";

describe("Range.vue", () => {
  const label = "Kittens Level:";
  const id = "kittens_level";
  const min = 1;
  const max = 3;
  const step = 1;
  const valueTranslation = {
    1: "slow",
    2: "moderate",
    3: "fast",
  };

  const props = {
    name: id,
    id,
    value: min + 1,
    min,
    max,
    step,
  };

  it("render with label and id", async () => {
    const wrapper = mount(Range, {
      props,
      slots: {
        default: label,
      },
    });
    expect(wrapper.get('[data-test="label"]').text()).eq(label);
    expect(wrapper.get('[data-test="value"]').text()).eq("" + (min + 1));

    const input = wrapper.get("input");
    expect(input.attributes("id")).eq(id);
    expect(input.attributes("name")).eq(id);
    expect(input.attributes("min")).eq("" + min);
    expect(input.attributes("max")).eq("" + max);
    expect(input.attributes("step")).eq("" + step);
  });

  it("check emits", async () => {
    const wrapper = mount(Range, {
      props: props,
      slots: {
        default: label,
      },
    });

    const input = wrapper.get("input");
    await input.setValue("3");

    expect(wrapper.emitted()).haveOwnProperty("modify");
    expect(wrapper.emitted()["modify"][0]).to.be.eql([id, 3]);
  });

  it("value translation", async () => {
    const wrapper = mount(Range, {
      props: { ...props, valueTranslation },
      slots: {
        default: label,
      },
    });

    expect(wrapper.get('[data-test="value"]').text()).eq(valueTranslation[2]);

    await wrapper.setProps({ value: 3 });

    const displayValue = wrapper.get('[data-test="value"]').text();

    expect(displayValue).eq(valueTranslation[3]);
  });
});
