export class Chronometer {
    constructor() {
        this.currentTime = 0; // we use time in 10 milliseconds steps
        this.intervalId = null;
    }
    start(printTimeCallback) {
        this.intervalId = setInterval(() => {
            this.currentTime += 1;
            if (printTimeCallback) {
                printTimeCallback();
            }
        }, 10);
    }
    getMinutes() {
        let minutesPassed = Math.floor(this.currentTime / 100 / 60);
        return minutesPassed;
    }
    getSeconds() {
        let secondsPassed = Math.floor(this.currentTime / 100 % 60);
        return secondsPassed;
    }
    getCentiseconds() {
        let centisecondsPassed = this.currentTime % 100;
        return centisecondsPassed;
    }
    computeTwoDigitNumber(value) {
        let result = '  ';
        if (value >= 0 && value < 10) {
            result = `0${value}`;
        }
        else {
            result = `${value}`;
        }
        return result;
    }
    stop() {
        clearInterval(this.intervalId);
    }
    reset() {
        this.currentTime = 0;
    }
    split() {
        let result = 'mm:ss:SS';
        let formattedMinutes = this.computeTwoDigitNumber(this.getMinutes());
        let formattedSeconds = this.computeTwoDigitNumber(this.getSeconds());
        let formattedCentiseconds = this.computeTwoDigitNumber(this.getCentiseconds());
        result = `${formattedMinutes}:${formattedSeconds}.${formattedCentiseconds}`;
        return result;
    }
}
