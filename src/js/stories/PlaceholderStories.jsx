import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Placeholder } from '../components';


storiesOf('Placeholder', module)
    .add('general', () => <General />)
;

const style = {
    padding: 10,
};


function General() {
    const columns = [
        { size: 100, head: { text: 50 }, cell: { circle: 20 } },
        { size: 250, flex: true, head: { text: 50 }, cell: { text: 200 } },
        { size: 125, head: { text: 50 }, cell: { text: 100 } },
        { size: 125, head: { text: 50 }, cell: { text: 100 } },
        { size: 50, head: { text: 50 }, cell: { circle: 20 } },
    ];

    return (
        <div>
            <div style={style}>
                <p>Default</p>

                <Placeholder columns={columns} style={{maxHeight: 400}} />
            </div>
        </div>
    );
}
