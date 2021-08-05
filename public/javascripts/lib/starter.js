import { emitStartStop } from "../socket_stuff.js";
export default class Starter {
    constructor(cyclePeriod, loopFunction) {
        this.cyclePeriod = cyclePeriod;
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
        this.button.innerText = "Stop";
        this.intervalId = setInterval(() => {
            this.loopFunction(this.stopCycle.bind(this));
        }, this.cyclePeriod);
    }
    stopCycle() {
        this.button.innerText = "Start";
        clearInterval(this.intervalId);
    }
}
//# sourceMappingURL=starter.js.map