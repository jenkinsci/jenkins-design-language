import * as React from 'react';
import { ChevronRight } from '@jdl2/icons/ChevronRight';
import { Check } from '@jdl2/icons/Check';

interface Props {
    icon: React.ReactNode;
    brand: string;
    name?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    chevron?: boolean;
    checked?: boolean;
}

export function AppLogo({ icon, brand, name, onClick, checked, chevron }: Props) {
    return (
        <div role="button" className="NavHeader NavAppSwitcher" onClick={onClick}>
            <div className="Nav-Bound">
                {checked && <Check className="NavOption-Check" />}
                <div className="NavHoverIcon">{icon}</div>
                <div className="NavLink-Title">
                    <div className="NavSubtitle">{brand}</div>
                    {name && <div className="NavTitle">{name}</div>}
                </div>
                {chevron && <ChevronRight className="mr1" />}
            </div>
        </div>
    );
}
