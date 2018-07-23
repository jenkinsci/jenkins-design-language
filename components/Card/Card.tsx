import * as React from 'react';
import * as classNames from 'classnames';

export interface ChildProps {
    children: any;
}

const CardHeader: React.SFC<ChildProps> = ({ children }) => (
    <div className="Card-Header">
        <h6>{children}</h6>
    </div>
);

export const CardSection: React.SFC<ChildProps> = ({ children }) => (
    <div className="Card-Section">{children}</div>
);

export const CardListItem: React.SFC<ChildProps> = ({ children }) => (
    <div className="Card-ListItem">{children}</div>
);

// TODO implement card alerts
// export const CardAlert: React.SFC<ChildProps> = ({ children }) => (
//     <div className="Card-Alert">{children}</div>
// );

const initialState = { focused: false };
type State = Readonly<typeof initialState>;

export class Card extends React.Component<{}, State> {
    static Header = CardHeader;
    static Section = CardSection;
    static ListItem = CardListItem;

    readonly state: State = initialState;

    handleFocus = () => {
        this.setState(updateFocusState);
    };

    render() {
        const { children } = this.props;
        return (
            <div
                onClick={this.handleFocus}
                className={classNames('Card ShadowedCard', { 'Card-Focus': this.state.focused })}
            >
                {React.Children.map(children, (child, idx) =>
                    React.cloneElement(child as React.ReactElement<any>, { key: idx })
                )}
            </div>
        );
    }
}

const updateFocusState = (prevState: State) => ({
    focused: !prevState.focused,
});
