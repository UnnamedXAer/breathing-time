import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Modal from "@/components/modal/Modal.vue";
import { createI18n } from "@/i18n";

// const i18n = new VueI18n({
// 	locale: 'en',
// 	silentTranslationWarn: true
//   })

describe("Modal.vue", () => {
  const title = "Kittens Level:";
  const content = "The Kittens, kittens, kittens";
  const slotDefault = "Kittens in slot";
  const dismiss = () => {
    console.log("dismiss");
  };
  const actions = [
    {
      label: "common.yes",
      handler: () => {
        console.log("yes");
      },
    },
    {
      label: "common.no",
      handler: dismiss,
    },
  ];

  const props = {
    title,
    content,
    dismiss,
  };

  it("render", async () => {
    const wrapper = mount(Modal, {
      props,
      slots: {
        default: slotDefault,
      },
      i18n: createI18n(),
    });
    expect(wrapper.get('[data-test]="slot-default"').text()).eq(slotDefault);
    expect(wrapper.get('[data-test]="content"').text()).eq(content);
    expect(wrapper.get('[data-test]="title"').text()).eq(title);

    expect(
      wrapper.get<HTMLDivElement>('[data-test]="actions"').element.children
        .length
    ).eq(1);
  });
});
