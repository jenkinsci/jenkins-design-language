import { css } from './css';

describe('utils/css', () => {
    it('should add classes to base class', () => {
        const str = css({ primary: true }, 'base');
        expect(str).toEqual('base is-primary');
    });
    it('should handle multiple classes', () => {
        const str = css({}, 'base', 'other');
        expect(str).toEqual('base other');
    });
    it('handle empty base class', () => {
        const str = css({ primary: true });
        expect(str).toEqual(' is-primary');
    });
    it('handles non-css props', () => {
        const props: any = { boogey: true };
        const str = css(props);
        expect(str).toEqual('');
    });
});
