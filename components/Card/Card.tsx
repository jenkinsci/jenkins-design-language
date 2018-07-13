import * as React from 'react';
import * as classNames from 'classnames';
import * as Util from '@jdl2/util';

const initialState = { focused: false };
const defaultProps: DefaultProps = { props: {} };

type State = Readonly<typeof initialState>;
type Props<P extends object = object> = Partial<
    {
        children: RenderCallback | React.ReactNode;
        component: React.ComponentType<CardComponentProps<P>>;
    } & DefaultProps<P>
>;
type DefaultProps<P extends object = object> = { props: P };
type RenderCallback = (args: CardComponentProps) => JSX.Element;
export type CardComponentProps<P extends object = object> = {
    focused: State['focused'];
    focusComponent: CardContainer['focusComponent'];
} & P;

class CardContainer<T extends object = object> extends React.Component<Props<T>, State> {
    static ofType<T extends object>() {
        return CardContainer as Util.Constructor<CardContainer<T>>;
    }

    static readonly defaultProps: Props = defaultProps;
    readonly state: State = initialState;

    render() {
        const { props, children, component: InjectedComponent } = this.props;
        const renderProps = { focused: this.state.focused, focusComponent: this.focusComponent };
        return InjectedComponent ? (
            <InjectedComponent {...props} {...renderProps}>
                {children}
            </InjectedComponent>
        ) : null;
    }

    private focusComponent = (event: React.MouseEvent<HTMLElement>) => {
        this.setState(updateFocusState);
    };
}

const updateFocusState = (prevState: State) => ({
    focused: !prevState.focused,
});

type CardInfoProps = { title: string };
const CardInfo: React.SFC<CardInfoProps & CardComponentProps> = ({
    title,
    children,
    focusComponent,
    focused,
}) => (
    <>
        <div
            onClick={focusComponent}
            className={classNames('Card ShadowedCard', { 'Card-Focus': focused })}
        >
            <div className="Card-Header">
                <h6>{title}</h6>
            </div>
            {children ? children : null}
        </div>
    </>
);

const CardWithTitle = CardContainer.ofType<CardInfoProps>();
export const Card: React.SFC<CardInfoProps> = ({ title, children }) => (
    <CardWithTitle component={CardInfo} props={{ title }}>
        {children}
    </CardWithTitle>
);
