import { flushPromises, mount, shallowMount } from "@vue/test-utils";
import Start from "@/components/BreathingExercise/Start.vue";
import chai, { expect } from "chai";
import { ExerciseMutations } from "@/store/modules/exercise/types";
import { createStoreFactory, namespaceName } from "@/store/createStore";

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

  it("changes content when counting starts", async () => {
    const store = createStoreFactory();
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

    wrapper.vm.counter = 1;
    await flushPromises();

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

  it("counter content for different counter values", async () => {
    const countdownTime = 4;
    const wrapper = shallowMount(Start, {});

    wrapper.vm.counter = countdownTime - 1;
    await flushPromises();

    const counterWrapper = wrapper.get('[data-test="ex-start-counter"]');
    expect(counterWrapper.get("p:first-child").text()).eq("ex.start.get_ready");
    expect(counterWrapper.get("p:nth-child(2)").text()).eq(
      "" + (countdownTime - 1)
    );

    wrapper.vm.counter = 0;
    await flushPromises();

    expect(counterWrapper.get("p:nth-child(2)").text()).eq("ex.start.go");
  });

  it("starts counting on start pressed", async () => {
    const wrapper = shallowMount(Start);

    const startBtnWrapper = wrapper.get('[data-test="ex-start-start-btn"]');

    await startBtnWrapper.trigger("click");

    const counterWrapper = wrapper.find('[data-test="ex-start-counter"]');
    expect(counterWrapper.exists()).to.be.true;
  });

  it.skip("redirects after counting finish", (done) => {
    const commitSpy = chai.spy();
    const replaceSpy = chai.spy();
    const wrapper = shallowMount(Start, {
      global: {
        mocks: {
          $store: {
            commit: commitSpy,
          },
          $router: {
            replace: replaceSpy,
          },
        },
      },
    });
    wrapper.vm.counter = 0;
    const startBtnWrapper = wrapper.get('[data-test="ex-start-start-btn"]');

    void startBtnWrapper.trigger("click");

    setTimeout(() => {
      expect(commitSpy).to.have.been.called.once;
      expect(commitSpy).to.have.been.called.with(
        namespaceName("exercise", ExerciseMutations.Start)
      );
      expect(replaceSpy).to.have.been.called.once;

      expect(replaceSpy).to.have.been.called.with({
        name: "BreathingExercise-Breathing",
      });

      done();
    }, 1001);
  });
});
