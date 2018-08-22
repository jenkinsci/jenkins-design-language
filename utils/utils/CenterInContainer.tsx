import * as React from 'react';

export function CenterInContainer({ children }: { children: React.ReactNode | React.ReactNode[] }) {
    return (
        <div className="CenterOnScreen">
            <div>{children}</div>
        </div>
    );
}
