import {DevelopmentLogger, processLoggingRules, ProductionLogger} from './Logger';

const logKeys = ['debug', 'log', 'info', 'warn', 'error'];
describe('Logger', () => {
    let logged: any[] = [];
    const logs: any = [];
    for (const k of logKeys) {
        logs[k] = console[k];
    }

    beforeEach(() => {
        for (const k of logKeys) {
            console[k] = (...args: any[]) => {
                logged.push(args);
            };
        }
        logged = [];
    });

    afterEach(() => {
        for (const k of logKeys) {
            console[k] = logs[k];
        }
        delete process.env.APP_LOG_LEVEL;
    });

    it('keeps queue of info messages', () => {
        process.env.APP_LOG_LEVEL = '*=ERROR';
        processLoggingRules();

        const log = new ProductionLogger('a');

        log.trace('t');
        log.debug('d');
        log.info('i');
        log.warn('w');

        expect(logged.length).toBe(0);

        log.error('yikes!');

        expect(logged.length).toBe(5);
    });

    it('keeps queue of info messages', () => {
        process.env.APP_LOG_LEVEL = '*=WARN';
        processLoggingRules();

        const log = new DevelopmentLogger('a');

        log.trace('t');
        log.debug('d');
        log.info('i');

        expect(logged.length).toBe(0);

        log.warn('w');

        expect(logged.length).toBe(1);

        log.error('yikes!');

        expect(logged.length).toBe(2);
    });
});
