import * as React from 'react';
import * as Enzyme from 'enzyme';
import { withCss } from './withCss';

describe('utils/withCss', () => {
    it('should add classes to wrapped component css method', () => {
        const Comp = withCss(({ css, children }) => (
            <div className={css('Comp')}>{children}</div>
        ));
        const c = Enzyme.render(<Comp primary>yolo</Comp>);
        expect('' + c).toEqual('<div class="Comp is-primary">yolo</div>');
    });

    it("doesn't crash without a base class", () => {
        const Comp = withCss(({ css, children }) => (
            <div className={css()}>{children}</div>
        ));
        const c = Enzyme.render(<Comp primary>yolo</Comp>);
        expect('' + c).toEqual('<div class=" is-primary">yolo</div>');
    });
});
