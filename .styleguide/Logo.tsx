import * as React from 'react';
const Styled = require('rsg-components/Styled').default;
const logo = require('../docs/assets/img/blueocean-swoosh.svg');

const styles = ({ fontFamily, color }: any) => ({
    logo: {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        fontFamily: fontFamily.base,
        fontSize: 18,
        fontWeight: 'normal',
        color: color.baseBackground,
    },
    image: {
        width: '2.5em',
        // marginLeft: '-0.5em',
        marginRight: '0.5em',
        height: '36px',
        '& svg': {
            height: '36px',
            '& path': {
                fill: '#fff',
            },
        },
    },
});

export function LogoRenderer({ classes, children }: any) {
    return (
        <h1 className={classes.logo}>
            <div className={classes.image} dangerouslySetInnerHTML={{ __html: logo }} />
            {children}
        </h1>
    );
}

export default Styled(styles)(LogoRenderer);
