import * as React from 'react';

export interface DataTableColumnProps<T> {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    cell: (item: T) => React.ReactNode;
    expand?: boolean;
}

export class DataTableColumn<T> extends React.Component<DataTableColumnProps<T>> {
    render() {
        return null;
    }
}
