import { mount, shallowMount } from "@vue/test-utils";
import Start from "@/components/BreathingExercise/Start.vue";
import { expect } from "chai";
import store from "@/store";

describe("Breathing Exercise / Start.vue", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(Start, {});
    const startBtn = wrapper.find('[data-test="ex-start-start-btn"]');
    const seeInstrBtn = wrapper.find('[data-test="ex-start-see-instr-btn"]');
    const roundPhases = wrapper.find('[data-test="ex-start-round-phases"]');
    const warningNote = wrapper.find('[data-test="ex-start-warning-note"]');

    expect(startBtn.exists(), "startBtn").to.be.true;
    expect(seeInstrBtn.exists(), "seeInstrBtn").to.be.true;
    expect(roundPhases.exists(), "roundPhases").to.be.true;
    expect(warningNote.exists(), "warningNote").to.be.true;
  });

  it.only("changes content when counting starts", async () => {
    const wrapper = mount(Start, {
      global: {
        plugins: [store],
      },
    });

    let startBtn = wrapper.find('[data-test="ex-start-start-btn"]');
    let seeInstrBtn = wrapper.find('[data-test="ex-start-see-instr-btn"]');
    let roundPhases = wrapper.find('[data-test="ex-start-round-phases"]');
    let warningNote = wrapper.find('[data-test="ex-start-warning-note"]');

    expect(startBtn.exists(), "startBtn").to.be.true;
    expect(seeInstrBtn.exists(), "seeInstrBtn").to.be.true;
    expect(roundPhases.exists(), "roundPhases").to.be.true;
    expect(warningNote.exists(), "warningNote").to.be.true;

    await wrapper.setData({ counter: 1 });

    startBtn = wrapper.find('[data-test="ex-start-start-btn"]');
    seeInstrBtn = wrapper.find('[data-test="ex-start-see-instr-btn"]');
    roundPhases = wrapper.find('[data-test="ex-start-round-phases"]');
    warningNote = wrapper.find('[data-test="ex-start-warning-note"]');
    const counter = wrapper.find('[data-test="ex-start-counter"]');

    expect(startBtn.exists(), "startBtn").to.be.false;
    expect(seeInstrBtn.exists(), "seeInstrBtn").to.be.false;
    expect(roundPhases.exists(), "roundPhases").to.be.false;
    expect(warningNote.exists(), "warningNote").to.be.false;
    expect(counter.exists(), "counter").to.be.true;
  });

  it.only("counter content for different counter values", async () => {
    const countdownTime = 4;
    const wrapper = shallowMount(Start, {
      //   props: {},
      //   data: {
      //     countdownTime,
      //     counter: countdownTime,
      //   },
    });
  });
});
