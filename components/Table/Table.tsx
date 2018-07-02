import * as React from 'react';
import { TableColumn } from './TableColumn';

export interface TableProps<T> {
    items: T[];
    children: React.ReactNode;
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

        return (
            <table className="Table">
                {hasHeader && header}
                <tbody key={this.props.items.length}>
                    {this.props.items.map((item, itemIdx) => (
                        <tr key={itemIdx}>
                            {React.Children.map(this.props.children, (column: any, idx) => (
                                <td
                                    key={idx}
                                    className={column.props.expand ? 'expand' : undefined}
                                >
                                    {column.props.children && column.props.children(item)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                {hasFooter && footer}
            </table>
        );
    }
}
