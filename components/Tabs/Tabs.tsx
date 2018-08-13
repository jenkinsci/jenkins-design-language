import * as React from 'react';

interface TabProps {
    title: string | number;
}

export class Tab extends React.Component<TabProps> {
    render() {
        return this.props.children;
    }
}

interface TabState {
    selectedTab: number;
}

export class Tabs extends React.Component<any, TabState> {
    state: TabState = { selectedTab: 0 };

    setSelectedTab(selectedTab: number) {
        this.setState({ selectedTab });
    }

    render() {
        const activeChildren = React.Children.toArray(this.props.children).filter(i => i);
        return (
            <>
                <div className="Tabs mt6">
                    {activeChildren.map((
                        tab: any, // tslint:disable-line
                        idx
                    ) => (
                        <a
                            href="#"
                            className={`Tabs-Tab ${idx === this.state.selectedTab && 'is-active'}`}
                            key={tab.props.title}
                            onClick={e => {
                                e.preventDefault();
                                this.setSelectedTab(idx);
                            }}>
                            {tab.props.title}
                        </a>
                    ))}
                </div>

                {activeChildren.map((child: JSX.Element, idx) => (this.state.selectedTab === idx ? child : null))}
            </>
        );
    }
}
