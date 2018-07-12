import * as React from 'react';
import * as Util from '@jdl2/util';

const initialState = { focused: false }; // TODO implement being focused on component
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
} & P;

class CardComponent<T extends object = object> extends React.Component<Props<T>, State> {
    static ofType<T extends object>() {
        return CardComponent as Constructor<CardComponent<T>>;
    }

    static readonly defaultProps: Props = defaultProps;
    readonly state: State = initialState;

    render() {
        const { props, children, component: InjectedComponent } = this.props;
        const renderProps = { focused: this.state.focused };
        return InjectedComponent ? (
            <InjectedComponent {...props} {...renderProps}>
                {children}
            </InjectedComponent>
        ) : null;
    }
}

type CardInfoProps = { title: string };
const CardInfo: React.SFC<CardInfoProps & CardComponentProps> = ({ title, children }) => (
    <>
        <div className="Card ShadowedCard">
            <div className="Card-Header">
                <h6>{title}</h6>
            </div>
            {children ? children : null}
        </div>
    </>
);

const CardWithTitle = CardComponent.ofType<CardInfoProps>();
type CardFinalProps = CardInfoProps;
export const Card: React.SFC<CardFinalProps> = ({ title, children }) => (
    <CardWithTitle component={CardInfo} props={{ title }}>
        {children}
    </CardWithTitle>
);

// TODO: make className configurable
