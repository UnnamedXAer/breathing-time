import { expect } from "chai";
import { mount, config } from "@vue/test-utils";
import Modal from "@/components/modal/Modal.vue";

config.global.mocks.$t = (key: string) => key;

describe("Modal.vue", () => {
  const title = "Kittens Level:";
  const content = "The Kittens, kittens, kittens";
  const slotDefault = "Kittens in default slot";
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

  Modal.i18n = Modal.i18n || {
    locale: "en",
  };

  afterEach(() => {
    document.body.outerHTML = "";
  });

  it("render", async () => {
    const wrapper = mount(Modal, {
      props,
      slots: {
        default: slotDefault,
      },
    });
    console.log(document.body);
    const modalWrapper = wrapper.getComponent(Modal);

    expect(modalWrapper.get('[data-test="modal-body"]').text()).contains(
      slotDefault
    );
    expect(modalWrapper.get('[data-test="content"]').text()).eq(content);
    expect(modalWrapper.get('[data-test="title"]').text()).eq(title);
    expect(
      modalWrapper.get<HTMLDivElement>('[data-test="actions"]').element.children
        .length
    ).eq(1);
  });
});
