import * as React from 'react';

export interface TableColumnProps<T> {
    render: (value: T) => React.ReactNode;
    value?: T;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    expand?: boolean;
    children?: void; // children not allowed, use render function
}

export class TableColumn<T> extends React.Component<TableColumnProps<T>> {
    render() {
        return this.props.value && this.props.render(this.props.value);
    }
}
