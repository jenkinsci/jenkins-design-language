A sidebar goes by many different names (Material UI refers to "Drawer")

#### Example

```jsx
    <div style={{position:'relative',height:'40px'}}>
        <Sidebar
            main={
                <>
                    <Sidebar.AppLogo
                        icon={'U'}
                        brand={'Jenkins'}
                        name={'Design Language'}
                    />
                    <Sidebar.Item icon={'B'}>Branches</Sidebar.Item>
                    <Sidebar.Item icon={'C'}>Commits</Sidebar.Item>
                </>
            }
            footer={<Sidebar.Item icon={'F'}>Footer</Sidebar.Item>}
        />
    </div>
```
