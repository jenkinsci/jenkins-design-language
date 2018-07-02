The data table is a basic table used to display columnar data using a simple declarative syntax.

Simply define as many `Table.Col` children with `header` and `cell` props to get a basic table:

```jsx static
<Table items={users}>
    <Table.Col header="Username" expand>{user => user.username}</Table.Col>
    <Table.Col header="Country">{user => user.country}</Table.Col>
</Table>
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
<Table items={users}>
    <Table.Col header="Username">{user => user.username} expand</Table.Col>
    <Table.Col header="Country">{user => user.country}</Table.Col>
</Table>;
```
