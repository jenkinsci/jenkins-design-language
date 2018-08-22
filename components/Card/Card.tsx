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

export const CardDescription: React.SFC<ChildProps> = ({ children }) => (
    <div className="Card-Description">{children}</div>
);

export const CardListItem: React.SFC<ChildProps> = ({ children }) => (
    <div className="Card-ListItem">{children}</div>
);

export const CardAlert: React.SFC<ChildProps> = ({ children }) => (
    <div className="Card-Alert">{children}</div>
);

export enum CardType {
    Shadowed,
}

const initialState = { focused: false };
type State = Readonly<typeof initialState>;

type CardProps = Partial<{
    width: string;
    type: CardType;
}>;

export class Card<T extends object = object> extends React.Component<CardProps, State> {
    static Header = CardHeader;
    static Description = CardDescription;
    static ListItem = CardListItem;
    static Alert = CardAlert;

    readonly state: State = initialState;

    handleFocus = () => {
        this.setState(updateFocusState);
    };

    render() {
        const { children } = this.props;
        return (
            <div
                role="gridcell"
                onClick={this.handleFocus}
                style={{ width: this.props.width + 'px' }}
                className={classNames('Card', {
                    ShadowedCard: this.props.type === CardType.Shadowed,
                    'is-focused': this.state.focused,
                })}
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
