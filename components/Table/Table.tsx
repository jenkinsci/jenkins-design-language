import * as React from 'react';
import { TableColumn } from './TableColumn';

export interface TableProps<T> {
    values: T[];
    getKey?: (value: T) => string;
}

export class Table<T> extends React.Component<TableProps<T>> {
    static Col = TableColumn;

    render() {
        let hasHeader = false;
        const header = (
            <thead>
                <tr>
                    {React.Children.map(this.props.children, (column: any, idx) => {
                        if (column.props.header) {
                            hasHeader = true;
                        }
                        return <th key={idx}>{column.props.header}</th>;
                    })}
                </tr>
            </thead>
        );

        let hasFooter = false;
        const footer = (
            <tfoot>
                <tr>
                    {React.Children.map(this.props.children, (column: any, idx) => {
                        if (column.props.footer) {
                            hasFooter = true;
                        }
                        return <td key={idx}>{column.props.footer}</td>;
                    })}
                </tr>
            </tfoot>
        );

        const rows = this.props.values.map((item, itemIdx) => {
            let rowKey = this.props.getKey ? this.props.getKey(item) : itemIdx;
            const cols = React.Children.map(this.props.children, (column: any, idx) => {
                const col = React.cloneElement(column, {...column.props, value: item});
                if (idx === 0 && col.key) {
                    rowKey = col.key;
                }
                return (
                    <td
                        key={idx}
                        className={column.props.expand ? 'expand' : undefined}
                    >
                        {col}
                    </td>
                );
            });
            return (
                <tr key={rowKey}>
                    {cols}
                </tr>
            );
        });

        return (
            <table className="Table">
                {hasHeader && header}
                <tbody>
                    {rows}
                </tbody>
                {hasFooter && footer}
            </table>
        );
    }
}
