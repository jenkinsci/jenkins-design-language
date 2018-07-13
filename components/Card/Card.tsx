import * as React from 'react';
import * as classNames from 'classnames';

interface ChildProps {
    children: React.ReactNode | string;
}

const CardHeader: React.SFC<ChildProps> = ({ children }) => (
    <div className="Card-Header">
        <h6>{children}</h6>
    </div>
);

const CardSection: React.SFC<ChildProps> = ({ children }) => <>{children ? children : null}</>;

const initialState = { focused: false };
type State = Readonly<typeof initialState>;

export class Card extends React.Component<{}, State> {
    static Header = CardHeader;
    static Section = CardSection;

    readonly state: State = initialState;

    handleFocus = (event: React.MouseEvent<HTMLElement>) => {
        this.setState(updateFocusState);
    };

    render() {
        return (
            <div
                onClick={this.handleFocus}
                className={classNames('Card ShadowedCard', { 'Card-Focus': this.state.focused })}
            >
                {React.Children.map(this.props.children, (child, idx) =>
                    React.cloneElement(child as React.ReactElement<any>, { key: idx })
                )}
            </div>
        );
    }
}

const updateFocusState = (prevState: State) => ({
    focused: !prevState.focused,
});
