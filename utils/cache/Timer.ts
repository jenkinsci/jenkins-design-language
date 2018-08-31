/**
 * Wraps up the setTimeout, etc. oddness with Typescript as it relates to browser vs. node typings.
 */
export class Timer {
    interval: number = 0;
    run: () => void;

    private timeoutId: any; // tslint:disable-line

    constructor(interval: number, fn: () => void) {
        this.interval = interval;
        this.run = () => {
            try {
                fn();
            } finally {
                this.start();
            }
        };
    }

    start() {
        this.timeoutId = setTimeout(this.run, this.interval);
    }

    stop() {
        clearTimeout(this.timeoutId);
    }
}
