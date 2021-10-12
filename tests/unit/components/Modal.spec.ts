import { expect } from "chai";
import { mount, config } from "@vue/test-utils";
import Modal from "@/components/modal/Modal.vue";

config.global.mocks.$t = (key: string) => key;

describe("Modal.vue", () => {
  const title = "Kittens Level:";
  const content = "The Kittens, kittens, kittens";
  const slotDefault = "Kittens in default slot";

  let lastAction = "";

  const dismiss = () => {
    lastAction = "dismiss";
  };
  const actions = [
    {
      label: "common.yes",
      handler: () => {
        lastAction = actions[0].label;
      },
    },
    {
      label: "common.no",
      handler: () => {
        lastAction = actions[1].label;
      },
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

  it("render correctly with title content and default slot filled", () => {
    const wrapper = mount(Modal, {
      props,
      slots: {
        default: slotDefault,
      },
    });

    const modalWrapper = wrapper.getComponent(Modal);

    expect(modalWrapper.get('[data-test="modal-backdrop"]')).to.exist;
    expect(modalWrapper.get('[data-test="modal-body"]').text()).contains(
      slotDefault
    );
    expect(modalWrapper.get('[data-test="content"]').text()).eq(content);
    expect(modalWrapper.get('[data-test="title"]').text()).eq(title);
    expect(
      modalWrapper
        .get<HTMLDivElement>('[data-test="actions"] [data-test="btn"]')
        .text()
    ).eq("common.ok");
  });

  it("execute default action", async () => {
    const wrapper = mount(Modal, {
      props,
    });

    const modalWrapper = wrapper.getComponent(Modal);

    const actionElements = modalWrapper
      .get<HTMLDivElement>('[data-test="actions"]')
      .findAll<HTMLButtonElement>('[data-test="btn"]');

    lastAction = "";
    await actionElements[0].trigger("click");
    expect(lastAction).eq("dismiss");
  });

  it("render with custom actions", () => {
    const wrapper = mount(Modal, {
      props: {
        ...props,
        actions,
      },
    });

    const modalWrapper = wrapper.getComponent(Modal);
    const actionElements = modalWrapper.get<HTMLDivElement>(
      '[data-test="actions"]'
    ).element.children;

    expect(actionElements.length).eq(actions.length);
    expect(actionElements[0].textContent).eq(actions[0].label);
    expect(actionElements[1].textContent).eq(actions[1].label);
  });

  it("custom actions executed", async () => {
    const wrapper = mount(Modal, {
      props: {
        ...props,
        actions,
      },
    });

    const modalWrapper = wrapper.getComponent(Modal);

    const actionElements = modalWrapper
      .get<HTMLDivElement>('[data-test="actions"]')
      .findAll<HTMLButtonElement>('[data-test="btn"]');

    lastAction = "";
    await actionElements[0].trigger("click");
    expect(lastAction).eq(actions[0].label);

    lastAction = "";
    await actionElements[1].trigger("click");
    expect(lastAction).eq(actions[1].label);
  });

  it("dismiss on backdrop", async () => {
    const wrapper = mount(Modal, {
      props: {
        ...props,
        actions,
      },
    });

    const modalWrapper = wrapper.getComponent(Modal);

    lastAction = "";
    await modalWrapper.get('[data-test="modal-backdrop"]').trigger("click");
    expect(lastAction).eq("dismiss");
  });
});
