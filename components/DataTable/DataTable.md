The data table is a basic table used to display columnar data using a simple declarative syntax.

Simply define as many `DataTable.Column` children with `header` and `cell` props to get a basic table:

```jsx static
<DataTable items={users}>
    <DataTable.Column header="Username" cell={user => user.username} expand />
    <DataTable.Column header="Country" cell={user => user.country} />
</DataTable>
```

```jsx
const users = [
    {
        username: 'Joe',
        country: 'USA',
    },
    {
        username: 'Vincent',
        country: 'France',
    },
];
<DataTable items={users}>
    <DataTable.Column header="Username" cell={user => user.username} expand />
    <DataTable.Column header="Country" cell={user => user.country} />
</DataTable>;
```
