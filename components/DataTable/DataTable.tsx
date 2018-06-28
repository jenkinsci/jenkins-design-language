import * as React from 'react';

interface ColumnProps<T> {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    cell: (item: T) => React.ReactNode;
    expand?: boolean;
}

class Column<T> extends React.Component<ColumnProps<T>> {
    render() {
        return null;
    }
}

interface TableProps<T> {
    items: T[];
    children: React.ReactNode[];
}

export class DataTable<T> extends React.Component<TableProps<T>> {
    static Column = Column;
    render() {
        let hasHeader = false;
        const header = (
            <thead>
                <tr>
                    {this.props.children.map((column: Column<T>, idx) => {
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
                    {this.props.children.map((column: Column<T>, idx) => {
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
                            {this.props.children.map(
                                (column: Column<T>, idx) => (
                                    <td
                                        key={idx}
                                        className={
                                            column.props.expand
                                                ? 'expand'
                                                : undefined
                                        }
                                    >
                                        {column.props.cell(item)}
                                    </td>
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
                {hasFooter && footer}
            </table>
        );
    }
}
