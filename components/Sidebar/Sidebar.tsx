import * as React from 'react';
import { ClickListener } from '@jdl2/onclick';
import { KeyListener } from '@jdl2/keypress';
import { SidebarBehavior } from './SidebarBehavior';
import { ArrowLeft } from '@jdl2/icons/ArrowLeft';
import { Search } from '@jdl2/icons/Search';
import { AppLogo } from './AppLogo';
import { SidebarItem } from './SidebarItem';

interface SidebarSheetProps {
    title: string;
    onClose: (e: React.MouseEvent<HTMLElement>) => void;
}

interface SidebarProps {
    main: React.ReactNode;
    sheet?: React.ReactNode & { props: SidebarSheetProps };
    footer?: React.ReactNode;
    collapse?: boolean;
}

export class Sidebar extends React.Component<SidebarProps> {
    static AppLogo = AppLogo;
    static Item = SidebarItem;

    nav: SidebarBehavior;

    componentDidMount() {
        this.nav = new SidebarBehavior(this.props.collapse!);
    }

    componentDidUpdate() {
        if (this.props.sheet) {
            const element = document.querySelector('.Nav-Sheet:not(.is-showing)');
            if (element) {
                this.nav.showSheet(element);
            }
        }
    }

    closeSheet() {
        if (this.props.sheet) {
            this.nav.showMain(() => this.props.sheet!.props.onClose());
        }
    }

    render() {
        const { main, sheet, footer } = this.props;
        return (
            <KeyListener onEscapePressed={() => this.closeSheet()}>
                <div className="NavSlider">
                    <div className="NavSliderContainer" />
                    <div className="NavSlider-Overlay" />
                </div>
                <ClickListener onClickOutside={() => this.nav.isCollapsed && this.closeSheet()}>
                    <div className="Nav is-expanded">
                        <div className="NavExpander">
                            <div className="NavExpander-Handle" />
                        </div>
                        <div className="NavSheet-Container">
                            <div className="Nav-Base">
                                {main}
                                {footer && (
                                    <div className="NavFooter">
                                        <div className="Nav-Bound NavFooter-Bound">{footer}</div>
                                    </div>
                                )}
                            </div>
                            {sheet && (
                                <div className="Nav-Sheet" data-sheet="sheet">
                                    <div className="NavHeader">
                                        <div className="Nav-Bound">
                                            <div role="button"
                                                className="NavHoverIcon NavHeader-Back mr1"
                                                onClick={() => this.closeSheet()}
                                            >
                                                <ArrowLeft className="Icon x24" />
                                            </div>
                                            <div className="NavLink-Title">
                                                <div className="NavTitle">{sheet.props.title}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mx2 mt1">
                                        <div className="Filter Nav-Filter">
                                            <Search className="Filter-Icon" />
                                            <input
                                                type="text"
                                                className="Filter-Input"
                                                placeholder="Filter"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt4">{sheet}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </ClickListener>
            </KeyListener>
        );
    }
}
