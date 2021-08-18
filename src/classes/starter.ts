import { emitStartStop } from "../socket_stuff.js";

export default class Starter {
  config: Config;
  intervalId: number;
  button: HTMLButtonElement;
  cyclePeriod: number;
  loopFunction: Function;

  constructor(config: Config, loopFunction: Function) {
    this.config = config;
    this.intervalId;
    this.button = document.getElementById("start-stop") as HTMLButtonElement; 
    this.attachButtonListener();
    this.loopFunction = loopFunction;
  }

  private attachButtonListener() {
    this.button.addEventListener('click', () => {
      if (this.button.innerText === "Start") {
        emitStartStop("start");
        this.startCycle();
      } else {
        emitStartStop("stop");
        this.stopCycle();
      }
    });
  }

  startCycle() {
    this.config.running = true;
    this.button.innerText = "Stop";

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }

    this.intervalId = setInterval(() => {
      this.loopFunction(this.stopCycle.bind(this));
    }, this.config.period);
  }


  stopCycle() {
    this.config.running = false;
    this.button.innerText = "Start";
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
}
