import { emitStartStop } from "../socket_stuff.js";
export default class Starter {
    constructor(config, loopFunction) {
        this.config = config;
        this.intervalId;
        this.button = document.getElementById("start-stop");
        this.attachButtonListener();
        this.loopFunction = loopFunction;
    }
    attachButtonListener() {
        this.button.addEventListener('click', () => {
            if (this.button.innerText === "Start") {
                emitStartStop("start");
                this.startCycle();
            }
            else {
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
//# sourceMappingURL=starter.js.map