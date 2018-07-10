import { $ } from './ElementSet';

function perform(event: string, e: Element | null) {
    const htmlElement = e as HTMLElement;
    if (!htmlElement) {
        throw new Error('Invalid element to trigger an event: ' + e);
    }
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent(event, true, true);
    htmlElement.dispatchEvent(evt);
}

describe('ElementSet', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = `
        <div class="elem1" title="title 1">
            <div class="child1">text 1</div>
        </div>
        <div class="elem2">
            <div class="child2">text 2</div>
        </div>
        <div class="elem3">
            <div class="child3">text 3 1</div>
            <div class="child3">text 3 2</div>
            <div class="child3">text 3 3</div>
        </div>
        `;
    });

    it('$, .length, .is', () => {
        const $invalid = $('.invalid');
        expect($invalid.is('.something')).toBeFalsy();
        expect($invalid.length).toBe(0);
        expect($invalid.addClass('asdf')).toBeTruthy();

        const $e1 = $('.elem1');
        expect($e1.length).toBe(1);

        const $c3 = $('.child3');
        expect($c3.length).toBe(3);
    });

    it('.is', () => {
        const $e1 = $('.elem1');
        expect($e1.length).toBe(1);
        expect($e1.is('.elem1')).toBeTruthy();
        expect($e1.is('.elem2')).toBeFalsy();
        expect($('.elem2').is('.elem1')).toBeFalsy();

        // test IE9+ support and not
        if (HTMLElement.prototype.msMatchesSelector) {
            const existing = HTMLElement.prototype.msMatchesSelector;
            expect($e1.is('.elem1')).toBeTruthy();
            expect($e1.is('.elem2')).toBeFalsy();
            delete HTMLElement.prototype.msMatchesSelector;
            expect($e1.is('.elem1')).toBeTruthy();
            expect($e1.is('.elem2')).toBeFalsy();
            HTMLElement.prototype.msMatchesSelector = existing;
        } else {
            HTMLElement.prototype.msMatchesSelector = HTMLElement.prototype.matches;
            expect($e1.is('.elem1')).toBeTruthy();
            expect($e1.is('.elem2')).toBeFalsy();
            delete HTMLElement.prototype.msMatchesSelector;
            expect($e1.is('.elem1')).toBeTruthy();
            expect($e1.is('.elem2')).toBeFalsy();
        }
    });

    it('.attr, .removeAttr', () => {
        expect($('.elem1').attr('title')).toEqual('title 1');
        const $e2 = $('.elem2');
        expect($e2.attr('title')).toBeFalsy();
        expect(document.documentElement.innerHTML).not.toContain('title="title 2"');
        $e2.attr('title', 'title 2');
        expect($e2.attr('title')).toBeTruthy();
        expect(document.documentElement.innerHTML).toContain('title="title 2"');

        $e2.removeAttr('title');
        expect($e2.attr('title')).toBeFalsy();
        expect(document.documentElement.innerHTML).not.toContain('title="title 2"');
    });

    it('.addClass, .removeClass', () => {
        const $c3 = $('.child3');

        expect($c3.is('.new')).toBeFalsy();
        expect($('.new').length).toBe(0);

        $c3.addClass('new');

        expect($c3.is('.new')).toBeTruthy();
        expect($('.new').length).toBe(3);

        $c3.removeClass('new');

        expect($c3.is('.new')).toBeFalsy();
        expect($('.new').length).toBe(0);
    });

    it('.on', () => {
        let clicked = false;
        $('.elem2').on('click', e => {
            clicked = true;
        });
        const el = document.querySelector('.child2')!;
        perform('click', el);
        expect(clicked).toBeTruthy();
    });

    it('.first', () => {
        const $e1 = $('.child2').first;
        const e1 = document.querySelector('.child2')!;
        expect($e1).toBe(e1);
    });

    it('.insertBefore, .insertAfter, .remove', () => {
        const $e1 = $('.child1');

        // test strings
        $e1.insertAfter('<div class="next2">next 2</div>');
        expect($('.next2').length).toBe(1);
        $e1.insertBefore('<div class="next2">next 2</div>');
        expect($('.next2').length).toBe(2);
        $('.next2').remove();
        expect($('.next2').length).toBe(0);

        // FIXME: polyfill for insertAdjacentElement ; seems to be unsupported by jsdom
        // https://stackoverflow.com/questions/45833331/jest-can-not-deal-with-insertadjacentelement
        const needsInsertAdjacentElement = !HTMLElement.prototype.insertAdjacentElement;
        if (needsInsertAdjacentElement) {
            Object.defineProperty(HTMLElement.prototype, 'insertAdjacentElement', {
                writable: true,
                value(where: string, e: HTMLElement) {
                    this.insertAdjacentHTML(where, e.outerHTML);
                },
            });
        }

        // test elements
        $e1.insertAfter('<div class="templateDiv">template div</div>');
        const $tpl = $('.templateDiv');
        const elem = $tpl.first;
        $e1.insertAfter(elem);
        expect($('.templateDiv').length).toBe(2);
        $e1.insertBefore(elem);
        expect($('.templateDiv').length).toBe(3);
        $('.templateDiv').remove();
        expect($('.templateDiv').length).toBe(0);

        // test selectors
        $e1.insertAfter('<div class="templateDiv">template div</div>');
        $e1.insertAfter($tpl);
        expect($('.templateDiv').length).toBe(2);
        $e1.insertBefore($tpl);
        expect($('.templateDiv').length).toBe(3);
        $('.templateDiv').remove();
        expect($('.templateDiv').length).toBe(0);

        if (needsInsertAdjacentElement) {
            // For some reason delete is not working here
            Object.defineProperty(HTMLElement.prototype, 'insertAdjacentElement', {
                value: undefined,
            });
        }
    });

    it('.html, .text', () => {
        const $c1 = $('.child1');
        expect($c1.html()).toBe('text 1');
        $c1.html('<span>new text with span</span>');
        expect($c1.html()).toBe('<span>new text with span</span>');
        expect($c1.text()).toBe('new text with span');

        const $c2 = $('.child2');
        expect($c2.text()).toBe('text 2');
        $c2.text('new text 2');
        expect($c2.text()).toBe('new text 2');
    });

    it('width & height', () => {
        const $e1 = $('.child2');

        // jsdom returns 0 for width and height
        expect($e1.width()).toBe(0);
        expect($e1.height()).toBe(0);

        $e1.width(22);
        $e1.height(11);

        const e = $e1.first;
        expect(e.style.width).toBe('22px');
        expect(e.style.height).toBe('11px');
    });

    it('only allows object and string', () => {
        try {
            ($ as any)(123);
            expect(true).toBe('should not be here');
        } catch (e) {}

        const c1 = document.querySelector('.child1') as Element;
        $(c1).attr('title', 'should be set');
        expect(c1.getAttribute('title')).toBe('should be set');
    });
});
