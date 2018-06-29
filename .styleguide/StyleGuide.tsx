import * as React from 'react';
const Logo = require('rsg-components/Logo').default;
const Markdown = require('rsg-components/Markdown').default;
const Styled = require('rsg-components/Styled').default;
const pkg = require('../package.json');
const logo = require('../docs/assets/img/blueocean-swoosh.svg');

const xsmall = '@media (max-width: 600px)';

const styles = ({
    color,
    font,
    base,
    light,
    link,
    baseBackground,
    mq,
    sidebarWidth,
    space,
    headerHeight,
    hasHeader,
}: any) => ({
    root: {
        color: base,
        backgroundColor: baseBackground,
        paddingTop: hasHeader ? headerHeight : 0,
        paddingLeft: sidebarWidth,
        [xsmall]: {
            paddingLeft: 0,
        },
    },
    header: {
        color: '#fff',
        backgroundColor: '#4a90e2',
        height: headerHeight,
        position: 'fixed',
        top: 0,
        right: 0,
        left: sidebarWidth,
    },
    bar: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '-15px',
        height: headerHeight,
        [xsmall]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    nav: {
        marginLeft: 'auto',
        marginRight: '-0.5em',
        [xsmall]: {
            margin: [[10, 0, 0]],
        },
    },
    headerLink: {
        '&, &:link, &:visited': {
            marginLeft: '0.5em',
            marginRight: '0.5em',
            fontFamily: font,
            color: '#efefef',
        },
        '&:hover, &:active': {
            color: '#fff',
            cursor: 'pointer',
        },
    },
    content: {
        maxWidth: 900,
        padding: [[15, 30]],
        margin: [[0, 'auto', 0, 0]],
        [mq.small]: {
            padding: 15,
        },
        display: 'block',
    },
    components: {
        overflow: 'auto', // To prevent the pane from growing out of the screen
    },
    footer: {
        display: 'block',
        color: light,
        fontFamily: font,
        fontSize: 12,
    },
    sidebar: {
        backgroundColor: '#4a90e2',
        border: [[color.border, 'solid']],
        borderWidth: [[0, 1, 0, 0]],
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: sidebarWidth,
        overflow: 'auto',
        '-webkit-overflow-scrolling': 'touch',
        [mq.small]: {
            position: 'static',
            width: 'auto',
            borderWidth: [[1, 0, 0, 0]],
            paddingBottom: space[0],
        },
    },
    logo: {
        padding: space[2],
        position: 'relative',
    },
    version: {
        position: 'absolute',
        bottom: 5,
        right: 8,
        fontSize: '0.70em',
    },
});

export function StyleGuideRenderer({
    classes,
    title,
    homepageUrl,
    children,
    toc,
    hasSidebar,
    hasHeader,
    hasFooter,
    useIsolatedLinks,
    sidebarWidth,
}: any) {
    return (
        <div className={classes.root} style={{ paddingLeft: hasSidebar ? sidebarWidth : 0 }}>
            {hasHeader && (
                <header className={classes.header}>
                    <div
                        className={classes.content}
                        style={{ maxWidth: hasSidebar ? 900 : 'auto' }}
                    >
                        <div className={classes.bar}>
                            <Logo>{title}</Logo>
                            <nav className={classes.nav}>
                                <a
                                    className={classes.headerLink}
                                    href="https://github.com/styleguidist/react-styleguidist/tree/master/docs"
                                >
                                    Docs
                                </a>
                                <a
                                    className={classes.headerLink}
                                    href="https://github.com/styleguidist/react-styleguidist"
                                >
                                    GitHub
                                </a>
                                <a
                                    className={classes.headerLink}
                                    href="https://gitter.im/styleguidist/styleguidist"
                                >
                                    Gitter
                                </a>
                            </nav>
                        </div>
                    </div>
                </header>
            )}
            <main className={classes.content}>
                {hasSidebar && (
                    <section id="intro">
                        <div className="intro-header" style={{ paddingTop: 0, marginTop: -40 }}>
                            <div className="container header-container">
                                <div className="row">
                                    <div
                                        className="intro-image col-md-4"
                                        style={{
                                            backgroundImage:
                                                'url("data:image/svg+xml;base64,' +
                                                btoa(logo) +
                                                '")',
                                        }}
                                    />
                                    <div className="intro-message col-md-6">
                                        <h1>Jenkins Design Language</h1>
                                        <h3>React library for Jenkins Blue Ocean</h3>
                                        <iframe
                                            className="github-btn"
                                            src="https://ghbtns.com/github-btn.html?user=jenkinsci&amp;repo=jenkins-design-language&amp;type=star&amp;count=true&amp;size=large"
                                            frameBorder="0"
                                            scrolling="0"
                                            width="160px"
                                            height="30px"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                <div style={{ clear: 'both' }} />

                {children}

                {hasSidebar && (
                    <div className="intro-header" style={{ paddingTop: 0, marginTop: -40 }}>
                        <div className="container header-container">
                            <div className="row">
                                <div
                                    className="intro-image"
                                    style={{
                                        backgroundImage:
                                            'url("data:image/svg+xml;base64,' + btoa(logo) + '")',
                                        backgroundSize: 180,
                                        opacity: 0.1,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {hasFooter && (
                    <footer className={classes.footer}>
                        <Markdown text={`Generated with [React Styleguidist](${homepageUrl}) ❤️`} />
                    </footer>
                )}
            </main>
            {hasSidebar && (
                <div className={classes.sidebar}>
                    <div className={classes.logo}>
                        <Logo>
                            {title} <div className={classes.version}>v {pkg.version}</div>
                        </Logo>
                    </div>
                    {toc}
                </div>
            )}
            <a
                href="https://github.com/jenkinsci/jenkins-design-language"
                style={{
                    zIndex: 9999,
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    border: 0,
                }}
            >
                <img
                    src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
                    alt="Fork me on GitHub"
                />
            </a>
        </div>
    );
}

export default Styled(styles)(StyleGuideRenderer);
