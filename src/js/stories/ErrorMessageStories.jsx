import React, { PropTypes } from 'react';
import { storiesOf } from '@kadira/storybook';
import { ErrorMessage } from '../components/ErrorMessage';

storiesOf('ErrorMessage', module)
    .add('general', () => <General />)
    .add('sizes', () => <Sizes />)
;

const style = {
    padding: 10,
};


function General() {
    return (
        <div>
            <div style={style}>
                <p>ErrorMessage (standalone)</p>

                <ErrorMessage>text as children</ErrorMessage>

                <ErrorMessage text="text as 'text' property" />
            </div>
        </div>
    );
}

// Sizes

// show several ErrorMessages spacing
function ErrorMessageGroup(props) {
    const count = props.count || 3;
    const array = new Array(count);

    return (
        <div>
            {React.Children.map(array, (item, index) => (
                <ErrorMessage>Element #{index}</ErrorMessage>
            ))}
        </div>
    );
}

ErrorMessageGroup.propTypes = {
    count: PropTypes.number,
};

function Sizes() {
    return (
        <div>
            <div style={style}>
                <p>Using no layout</p>
                <ErrorMessageGroup />
            </div>
            <div className="layout-small" style={style}>
                <p>Using layout-small</p>
                <ErrorMessageGroup />
            </div>
            <div className="layout-medium" style={style}>
                <p>Using layout-medium</p>
                <ErrorMessageGroup />
            </div>
            <div className="layout-large" style={style}>
                <p>Using layout-large</p>
                <ErrorMessageGroup />
            </div>
        </div>
    );
}
