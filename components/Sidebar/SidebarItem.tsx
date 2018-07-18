import * as React from 'react';

export interface SidebarItemProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export function SidebarItem({ children, icon, onClick }: SidebarItemProps) {
    return (
        <div className="NavLink" onClick={onClick}>
            <div className="Nav-Bound">
                {icon && <div className="NavHoverIcon">{icon}</div>}
                <div className="NavLink-Title">{children}</div>
            </div>
        </div>
    );
}
