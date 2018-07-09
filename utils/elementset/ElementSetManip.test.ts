import { $ } from './ElementSet';
import './ElementSetManip';


describe('ElementSetManip', () => {
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

    it('handles classes', () => {
        const $m2 = $('.elem2');
        expect($m2.is('cls2')).toBeFalsy();
        $m2.add.c('cls2');
        expect($m2.is('.cls2')).toBeTruthy();
        $m2.rm.c('cls2');
        expect($m2.is('.cls2')).toBeFalsy();
    });

    it('handles attributes', () => {
        const $m1 = $('.elem1');
        expect($m1.get.attr('title')).toBe('title 1');
        $m1.set.attr('title', 'modified title');
        expect($m1.get.attr('title')).toBe('modified title');
        $m1.rm.attr('title');
        expect($m1.get.attr('title')).toBeFalsy();
    });

    it('handles sizes', () => {
        const $m1 = $('.elem1');
        // jsdom just always returns 0
        expect($m1.get.width()).toBe(0);
        expect($m1.get.height()).toBe(0);
    });
});
