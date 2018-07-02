import * as React from 'react';

export interface TableColumnProps<T> {
    children: (item: T) => React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    expand?: boolean;
}

export class TableColumn<T> extends React.Component<TableColumnProps<T>> {
    render() {
        return null;
    }
}
