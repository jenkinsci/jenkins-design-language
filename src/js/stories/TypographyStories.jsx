import React, {PropTypes} from 'react';
import {storiesOf} from '@kadira/storybook';
import {Table} from '../components';

storiesOf('Typography', module)
    .add('Headings', () => <HeadingDemo />)
    .add('Body', () => <TextDemo />)
    .add('Buttons', () => <ButtonDemo />)
    .add('Table', () => <TableDemo />)
    .add('Debug', () => <Debug />)
;

function HeadingDemo(props) {
    const styles = Object.assign({}, props.styles);
    styles.border = '1px solid';

    return (
        <div>
            <h1 style={styles}>Heading 1</h1>
            <h2 style={styles}>Heading 2</h2>
            <h3 style={styles}>Heading 3</h3>
            <h4 style={styles}>Heading 4</h4>
            <h5 style={styles}>Heading 5</h5>
            <h6 style={styles}>Heading 6</h6>
        </div>
    );
}

HeadingDemo.propTypes = {
    styles: PropTypes.object,
};

function TextDemo(props) {
    const styles = Object.assign({}, props.styles);
    styles.border = '1px solid';
    return (
        <p style={styles}>
            The quick brown fox jumps over the lazy dog.
            The planet <i>Neptune</i> is blue and <i><strong>tilted</strong></i>
            on it's side by an <strong>ancient calamity</strong>.
        </p>
    );
}

TextDemo.propTypes = {
    styles: PropTypes.object,
};

function ButtonDemo(props) {
    const styles = Object.assign({}, props.styles);

    return (
        <div>
            <button style={styles}>Default Button</button>
            &nbsp;
            <a className="btn" style={styles}>Link Button</a>
        </div>
    );
}

ButtonDemo.propTypes = {
    styles: PropTypes.object,
};

function TableDemo() {
    return (
        <Table headers={['Header', 'Column']}>
            <tr>
                <td>Body</td>
                <td>Cell</td>
            </tr>
        </Table>
    );
}

function Debug() {
    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            { /* <Everything title="no extra styles"/> */ }
            <Everything title="Lato" styles={{fontFamily: 'Lato'}} />
            <Everything title="LatoLatinWeb" styles={{fontFamily: 'LatoLatinWeb'}} />
            <Everything title="sans-serif" styles={{fontFamily: 'sans-serif'}} />
            <Everything title="serif" styles={{fontFamily: 'serif'}} />
        </div>
    );
}

function Everything(props) {
    return (
        <div style={{padding: 5, width: 300}}>
            <div>{props.title}</div>
            <HeadingDemo styles={props.styles}/>
            <TextDemo styles={props.styles}/>
            <ButtonDemo styles={props.styles}/>
        </div>
    );
}

Everything.propTypes = {
    title: PropTypes.string,
    styles: PropTypes.object,
};
