/**
 * A logger that provides links back to the actual log message source in chrome debug tools
 * as well as providing stack traces automatically at DEBUG level
 *
 * and is easy to configure. It supports node's process.env and browser's localStorage
 * and even query params
 */

import { LRUList } from './LRUList';
import { isObject } from 'util';

const LOG_ARGUMENT_KEY = 'APP_LOG_LEVEL';

type LogItem = string | object | number;

export enum LogLevel {
    ERROR = 0,
    WARN = 10,
    INFO = 20,
    DEBUG = 40,
    TRACE = 50,
}

function forEachLogLevel(callback: (logLevel: LogLevel) => void) {
    for (const level in LogLevel) {
        if (!isNaN(Number(level))) {
            callback(level as any); // tslint:disable-line
        }
    }
}

function getMessageText(message: LogItem[]): string {
    let msg = '';
    for (const arg of message) {
        if (msg) {
            msg += ' ';
        }
        if (isObject(arg)) {
            msg += JSON.stringify(arg);
        } else {
            msg += arg;
        }
    }
    return msg;
}

/**
 * List of any specified logging level rules
 */
const logLevels: { pattern: RegExp; level: LogLevel }[] = [];

/**
 * A logging class that provides methods which correctly link to the script location
 * where logging happens
 */
export class Logger {
    /**
     * Basic logging levels
     */
    static Level = LogLevel;

    protected _channel: string;
    protected _logLevel: LogLevel = LogLevel.INFO;

    error(...args: LogItem[]) {
        /* ignore */
    }

    warn(...args: LogItem[]) {
        /* ignore */
    }

    info(...args: LogItem[]) {
        /* ignore */
    }

    debug(...args: LogItem[]) {
        /* ignore */
    }

    trace(...args: LogItem[]) {
        /* ignore */
    }

    /**
     * Creates a new Logger
     *
     * @argument {array<class|string>} channel log channel
     */
    constructor(...channel: string[]) {
        this._channel = channel
            .map(part => part.toString())
            .reduce((arr, val) => [...arr, ...val.split('.')], [])
            .join('.');
    }

    setLogLevel(level: LogLevel) {
        this._logLevel = level;
        forEachLogLevel(l => {
            this.init(l);
        });
    }

    init(logLevel: LogLevel) {
        const functionName = LogLevel[logLevel].toLowerCase();
        if (this.isEnabled(logLevel)) {
            // If this channel is debugging enabled, use console.warn so we also get a stack trace, at least on chrome
            let fn =
                logLevel !== LogLevel.ERROR && this.isEnabled(LogLevel.DEBUG) ? console.warn : console[functionName];
            if (!fn) {
                fn = console.log;
            }
            this[functionName] = fn.bind(console, '[' + LogLevel[logLevel] + ' ' + this._channel + ']:');
        } else {
            this[functionName] = function() {}; // tslint:disable-line
        }
    }

    isEnabled(logLevel: LogLevel) {
        return logLevel <= this._logLevel;
    }

    getLevel() {
        let level = LogLevel.ERROR;
        for (const logLevel of logLevels) {
            if (logLevel.pattern.test(this._channel)) {
                level = logLevel.level;
            }
        }
        return level;
    }
}

/**
 * Do this so we can call setLogLevel _after_ base properties are configured
 * to override the logging methods with `console.log` bind methods
 */
export class DevelopmentLogger extends Logger {
    constructor(...channel: string[]) {
        super(...channel);
        this.setLogLevel(this.getLevel());
    }
}

/**
 * Production does a completely different thing from development logging:
 * * track _all_ log messages and add them to a queue
 *
 */
export class ProductionLogger extends Logger {
    static logMessages: LRUList<{ level: LogLevel; channel: string; message: LogItem[] }> = new LRUList(2000);

    static dumpLog() {
        for (const item of ProductionLogger.logMessages.items) {
            // tslint:disable-next-line
            const fn = console[LogLevel[item.level].toLowerCase()] || console.warn;
            fn('[' + LogLevel[item.level] + ' ' + item.channel + ']: ' + getMessageText(item.message));
        }
        ProductionLogger.logMessages.clear();
    }

    log(level: LogLevel, ...message: LogItem[]) {
        ProductionLogger.logMessages.add({ message, level, channel: this._channel });
    }

    error(...args: LogItem[]) {
        ProductionLogger.dumpLog();
        this.log(LogLevel.ERROR, ...args);
        ProductionLogger.dumpLog();
    }

    warn(...args: LogItem[]) {
        this.log(LogLevel.WARN, ...args);
    }

    info(...args: LogItem[]) {
        this.log(LogLevel.INFO, ...args);
    }

    debug(...args: LogItem[]) {
        this.log(LogLevel.DEBUG, ...args);
    }

    trace(...args: LogItem[]) {
        this.log(LogLevel.TRACE, ...args);
    }
}

function parseLoggingRules(rules: string | null | undefined) {
    if (!rules) {
        return;
    }
    rules.split(/,/).map(rule => {
        const [wildcard, level] = rule.split(/=/);
        logLevels.push({
            pattern: new RegExp(
                wildcard
                    .split('')
                    .map(c => (c === '*' ? '.*' : c.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')))
                    .join('')
            ),
            level: LogLevel[level],
        });
    });
}

export function processLoggingRules() {
    // clear current logLevels
    logLevels.length = 0;

    // browser local storage
    if (localStorage) {
        parseLoggingRules(localStorage.getItem(LOG_ARGUMENT_KEY));
    }

    // node process env
    if (process && process.env) {
        parseLoggingRules(process.env[LOG_ARGUMENT_KEY]);
    }

    // browser query string
    if (window && window.location && window.location.href) {
        const pattern = new RegExp('.*[?&]' + LOG_ARGUMENT_KEY + '=([^&#]+).*');
        if (pattern.test(window.location.href)) {
            parseLoggingRules(decodeURIComponent(window.location.href).replace(pattern, '$1'));
        }
    }
}

processLoggingRules();

export function createLogger(...channel: string[]) {
    if (process.env.PROD_LOGGER) {
        return new ProductionLogger(...channel);
    }
    return new DevelopmentLogger(...channel);
}
