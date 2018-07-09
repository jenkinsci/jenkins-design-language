// Very basic query-like interface, inspired by:
// nanoJS <https://vladocar.github.io/nanoJS/>
// NOTE: this will re-evalute for each operation
// so it never operates on stale elements
export class ElementSet {
    private s: string | object;

    constructor(s: string | object) {
        if (typeof s !== 'string' && typeof s !== 'object') {
            throw new Error('Invalid selector (string | object), got: ' + s);
        }
        this.s = s;
    }

    private q(): HTMLElement[] | NodeListOf<HTMLElement> {
        if (typeof this.s === 'string') {
            return document.querySelectorAll(this.s);
        }
        return [this.s] as HTMLElement[];
    }

    each(fn: (e: HTMLElement) => void) {
        const v = this.q();
        if (v.length > 0) {
            if (v.length === 1) {
                fn(v[0]);
            } else {
                for (let i = 0; i < v.length; i++) {
                    fn(v[i]);
                }
            }
        }
        return this;
    }

    get first() {
        return this.q()[0];
    }

    get length() {
        return this.q().length;
    }

    /**
     * Gets the attribute for the first matched element if no value provided
     * or sets the attribute on all matched elements
     * @param {string} a
     * @param {string} v
     * @returns {any}
     */
    attr(a: string, v?: string) {
        if (!v) {
            const n = this.q()[0];
            return n && n.getAttribute(a);
        }
        return this.each(i => {
            i.setAttribute(a, v);
        });
    }

    /**
     * Removes the attribute from all matched elements
     * @param {string} v
     * @returns {this}
     */
    removeAttr(v: string) {
        return this.each(i => {
            i.removeAttribute(v);
        });
    }

    /**
     * Inidcates the first matched element contains the provided class
     * @param {string} s
     * @returns {any}
     */
    is(s: string) {
        const n = this.q()[0];
        if (n) {
            if (n.msMatchesSelector) {
                return n.msMatchesSelector(s);
            }
            return n.matches(s);
        }
        return false;
    }

    /**
     * Adds an event listener of the provied type to all matched elements
     * @param {string} type
     * @param {EventListenerOrEventListenerObject} fn
     * @returns {this}
     */
    on(type: string, fn: EventListenerOrEventListenerObject) {
        return this.each(i => {
            i.addEventListener(type, fn, false);
        });
    }

    /**
     * Adds the class to all matched elements
     * @param {string} v
     * @returns {this}
     */
    addClass(v: string) {
        return this.each(i => {
            i.classList.add(v);
        });
    }

    /**
     * Removes the class from all matched elements
     * @param {string} v
     * @returns {this}
     */
    removeClass(v: string) {
        return this.each(i => {
            i.classList.remove(v);
        });
    }

    /**
     * Gets html of the first element or sets the html on all matched elements
     * @param {string} v
     * @returns {this | string}
     */
    html(v?: string) {
        if (!v) {
            const n = this.q()[0];
            return n && n.innerHTML;
        }
        return this.each(i => {
            i.innerHTML = v;
        });
    }

    /**
     * Gets text of the first element or sets the text on all matched elements
     * @param {string} v
     * @returns {this | string}
     */
    text(v?: string) {
        if (!v) {
            const n = this.q()[0];
            return n && n.textContent;
        }
        return this.each(i => {
            i.textContent = v;
        });
    }

    /**
     * Insert helper
     * @param {InsertPosition} location
     * @param {string | HTMLElement | ElementSet} v
     * @returns {ElementSet}
     */
    private insertAdjacent(
        location: InsertPosition,
        v: string | HTMLElement | ElementSet
    ): ElementSet {
        if (v instanceof ElementSet) {
            return this.insertAdjacent(location, v.first);
        }
        if (v instanceof HTMLElement) {
            return this.each(i => {
                i.insertAdjacentElement(location, v);
            });
        }
        return this.each(i => {
            i.insertAdjacentHTML(location, v);
        });
    }

    /**
     * Adds v before each matched element
     * @param {string | HTMLElement | ElementSet} v item to add
     * @returns {this}
     */
    insertBefore(v: string | HTMLElement | ElementSet) {
        return this.insertAdjacent('beforebegin', v);
    }

    /**
     * Adds v after each matched element
     * @param {string | HTMLElement | ElementSet} v item to add
     * @returns {this}
     */
    insertAfter(v: string | HTMLElement | ElementSet) {
        return this.insertAdjacent('afterend', v);
    }

    /**
     * Removes all the matched elements
     * @returns {this}
     */
    remove() {
        return this.each(i => {
            i.remove();
        });
    }

    /**
     * Returns the width in pixels of the first matched element
     * or sets the width if a value is provided
     * @param {number} v
     * @returns {any}
     */
    width(v?: number) {
        if (!v) {
            const n = this.q()[0];
            return n && n.clientWidth;
        }
        return this.each(i => {
            i.style.width = v + 'px';
        });
    }

    /**
     * Returns the height in pixels of the first matched element
     * or sets the height if a value is provided
     * @param {number} v
     * @returns {any}
     */
    height(v?: number) {
        if (!v) {
            const n = this.q()[0];
            return n && n.clientHeight;
        }
        return this.each(i => {
            i.style.height = v + 'px';
        });
    }
}

/**
 * Basic $ selector
 * @param {string | object} selector
 * @returns {ElementSet}
 */
export function $(selector: string | object) {
    return new ElementSet(selector);
}
