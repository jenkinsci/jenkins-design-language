import * as React from 'react';
import { ChevronRight } from '@jdl2/icons/ChevronRight';

export interface SidebarItemProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    chevron?: boolean;
}

export function SidebarItem({ children, icon, onClick, chevron }: SidebarItemProps) {
    return (
        <div
            role="button"
            className={`NavLink ${chevron && 'NavLink-SheetOpener'}`}
            onClick={onClick}
        >
            <div className="Nav-Bound">
                {icon && <div className="NavHoverIcon">{icon}</div>}
                <div className="NavLink-Title">{children}</div>
                {chevron && <ChevronRight />}
            </div>
        </div>
    );
}
