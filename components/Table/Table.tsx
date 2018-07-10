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

        let rowKeyFn: (item: T) => string = item => JSON.stringify(item);
        React.Children.map(this.props.children, (col: any, idx) => {
            if (col.props.id === true) {
                rowKeyFn = (item: T) => getKeyFromColumn(item, col);
            } else if(col.props.id) {
                rowKeyFn = col.props.id;
            }
        });

        const rows = this.props.values.map((item, itemIdx) => {
            const cols = React.Children.map(this.props.children, (col: any, idx) => {
                return (
                    <td key={col.key || idx} className={col.props.expand ? 'expand' : undefined}>
                        {col.props.render(item)}
                    </td>
                );
            });
            return <tr key={rowKeyFn(item)}>{cols}</tr>;
        });

        return (
            <table className="Table">
                {hasHeader && header}
                <tbody>{rows}</tbody>
                {hasFooter && footer}
            </table>
        );
    }
}

function getKeyFromColumn(item: any, col: React.ReactElement<any>): string {
    if (col.key) {
        return col.key.toString();
    }
    const out = collectText(col.props.render(item));
    if (!out || out === '') {
        console.warn('column defined as id, but no text found');
        return JSON.stringify(item);
    }
    return out;
}

function collectText(col: any): string {
    let out = '';
    if (typeof col === 'string') {
        return col;
    }

    if (col.props && col.props.children) {
        React.Children.map(col.props.children, child => {
            out += collectText(child);
        });
    }

    return out;
}
