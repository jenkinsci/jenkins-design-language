import * as React from 'react';
const cx = require('classnames').default;
const Styled = require('rsg-components/Styled').default;

const styles = ({ color, fontFamily, fontSize, space, mq }: any) => {
    const linkPad = [[space[1], 0, space[1], space[3]]];
    return {
        list: {
            margin: 0,
            paddingLeft: 0, // space[2],
        },
        item: {
            color: color.base,
            display: 'block',
            margin: 0, // [[space[1], 0, space[1], 0]],
            fontFamily: fontFamily.base,
            fontSize: fontSize.base,
            listStyle: 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        itemLink: {
            '&, &:visited, &:active': {
                display: 'block',
                color: '#fff',
                fontWeight: 'normal',
                margin: 0,
                padding: linkPad,
                paddingLeft: space[4],
                cursor: 'pointer',
                position: 'relative',
            },
            '&:focus, &:hover': {
                display: 'block',
                color: '#fff',
                fontWeight: 'normal',
                margin: 0,
                padding: linkPad,
                paddingLeft: space[4],
                cursor: 'pointer',
                position: 'relative',
                '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: 4,
                    background: '#fff',
                },
            },
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
        },
        isChild: {
            [mq.small]: {
                display: 'inline-block',
                margin: [[0, space[1], 0, 0]],
            },
        },
        heading: {
            marginTop: space[2],
            padding: linkPad,
            fontFamily: fontFamily.base,
            fontWeight: 'bold',
            color: '#fff',
            position: 'relative',

            '&:before': {
                content: '""',
                position: 'absolute',
                right: linkPad[0][0],
                bottom: 0,
                left: linkPad[0][0],
                height: 1,
                background: 'rgba(255, 255, 255, 0.2)',
            },
        },
    };
};

export function ComponentsListRenderer({ classes, items }: any) {
    items = items.filter((item: any) => item.name);

    if (!items.length) {
        return null;
    }

    return (
        <ul className={classes.list}>
            {items.map(({ heading, name, href, content }: any) => (
                <li
                    className={cx(
                        classes.item,
                        (!content || !content.props.items.length) &&
                            classes.isChild
                    )}
                    key={href}
                >
                    {heading && (
                        <div className={cx(classes.heading)}>{name}</div>
                    )}
                    {!heading && (
                        <a
                            className={cx(
                                classes.itemLink,
                                heading && classes.heading
                            )}
                            href={href}
                        >
                            {name}
                        </a>
                    )}
                    {content}
                </li>
            ))}
        </ul>
    );
}

export default Styled(styles)(ComponentsListRenderer);
