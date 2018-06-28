import * as React from 'react';
import * as Enzyme from 'enzyme';
import { withCss } from './withCss';

describe('utils/withCss', () => {
    it('should add classes to wrapped component css method', () => {
        const Comp = withCss(({ css, children }) => (
            <div className={css('Comp')}>{children}</div>
        ));
        const c = Enzyme.render(<Comp primary>yolo</Comp>);
        console.log(c);
        expect('' + c).toEqual('<div class="Comp is-primary">yolo</div>');
        return c;
    });
});
