import React, { PropTypes } from 'react';
import { storiesOf } from '@kadira/storybook';
import { FlyoutMenu } from '../components';

storiesOf('FlyoutMenu', module)
    .add('keyboard & focus', () => <KeyboardFocus />)
;

const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
};

const a2z = 'ABCDEFGHIJKLM NOPQRSTUVWXYZ';

function createOptions(text = 'Option', asObject = false) {
    const options = [];

    for (let index = 0; index < 200; index++) {
        const label = `${text} ${options.length + 1}`;
        options.push(!asObject ? label : { label });
    }
    return options;
}


function KeyboardFocus() {
    const options = createOptions();
    options.unshift(a2z);

    return (
        <div style={{...style, height: 400}}>
            <p>This Layout is useful for demonstrating keyboard accessibility and focus behavior.</p>

            <button>Test 1</button>

            <SimpleDropdown
                options={options}
            />

            <button>Test 2</button>
        </div>
    );
}

class SimpleDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.buttonRef = null;

        this.state = {
            open: false,
        };
    }

    _onButtonClick() {
        this.setState({
            open: !this.state.open,
        });
    }

    _onSelectionChange(option, index) {
        this.setState({
            open: false,
        });
    }

    render() {
        return (
            <div>
                <button
                    ref={button => { this.buttonRef = button; }}
                    onClick={() => this._onButtonClick()}
                >
                    {!this.state.open ? 'Open Menu' : 'Close Menu'}
                </button>

            { this.state.open &&
                <FlyoutMenu
                    targetElement={this.buttonRef}
                    positionFunction={positionMenu}
                    options={this.props.options}
                    onSelectionChange={(opt, idx) => this._onSelectionChange(opt, idx)}
                />
            }
            </div>
        );
    }

}

// eslint-disable-next-line max-len, no-unused-vars
function positionMenu(selfWidth:number, selfHeight:number, targetWidth:number, targetHeight:number, targetLeft:number, targetTop:number, viewportWidth:number, viewportHeight:number) {
    return {
        newLeft: targetLeft,
        newTop: targetTop + targetHeight,
    };
}

SimpleDropdown.propTypes = {
    options: PropTypes.array,
};
