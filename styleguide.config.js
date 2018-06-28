const path = require('path');
module.exports = {
    title: 'Jenkins Design Language',
    // See this: https://github.com/styleguidist/react-styleguidist/blob/master/examples/sections/styleguide.config.js
    pagePerSection: false,
    sections: [
        {
            name: 'Components',
            components: 'components/**/[A-Z]*.tsx',
        },
        {
            name: 'Utilities',
            components: 'components/**/[a-z]*.tsx',
        },
    ],
    // components: 'components/**/*.tsx',
    ignore: ['**/*.stories.tsx', '**/*.tests.tsx', '**/*.test.tsx'],
    webpackConfig: Object.assign(
        {},
        {
            module: {
                rules: [
                    {
                        test: /\.(ts|tsx)$/,
                        loader: 'ts-loader',
                    },
                    {
                        test: /\.scss$/,
                        loaders: ['style-loader', 'css-loader', 'sass-loader'],
                        // include: path.resolve(__dirname, '../'),
                    },
                    {
                        test: /\.css$/,
                        loader: 'style-loader!css-loader',
                        include: __dirname,
                    },
                    {
                        test: /\.(woff|woff2)$/,
                        use: {
                            loader: 'url-loader',
                            options: {
                                name: 'fonts/[hash].[ext]',
                                limit: 5000,
                                mimetype: 'application/font-woff',
                            },
                        },
                    },
                    {
                        test: /\.(ttf|eot|png)$/,
                        use: {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[hash].[ext]',
                            },
                        },
                    },
                    {
                        test: /\.svg$/,
                        loader: 'svg-inline-loader',
                    },
                ],
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.jsx', '.js'],
                // alias: {
                //     'rsg-components/Section': path.join(__dirname, '.styleguide/Section'),
                // }
            },
        }
    ),
    getExampleFilename(componentPath) {
        return componentPath.replace(/\.tsx?$/, '.md');
    },
    require: [
        path.join(__dirname, 'css/index.scss'),
        path.join(__dirname, 'docs/assets/css/project.css'),
        path.join(__dirname, 'docs/assets/css/local.css'),
    ],
    styleguideDir: './docs/docs',
    propsParser: require('react-docgen-typescript').withDefaultConfig([]).parse,

    // STYLES:
    showSidebar: true,
    theme: {
        baseBackground: '#fdfdfc',
        link: '#274e75',
        linkHover: '#90a7bf',
        border: '#e0d2de',
        fontFamily: {
            base: [
                'HelveticaNeue-Light',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                '"Roboto"',
                '"Oxygen"',
                '"Ubuntu"',
                '"Cantarell"',
                '"Fira Sans"',
                '"Droid Sans"',
                '"Helvetica Neue"',
                'sans-serif',
            ],
            monospace: ['Consolas', '"Liberation Mono"', 'Menlo', 'monospace'],
        },
        sidebarWidth: 300,
        headerHeight: 50,
    },
    ribbon: {
        url: 'https://github.com/jenkinsci/jenkins-design-language',
    },
    styles: {
        Playground: {
            preview: {
                paddingLeft: 0,
                paddingRight: 0,
                borderWidth: [[0, 0, 1, 0]],
                borderRadius: 0,
            },
        },
        Markdown: {
            pre: {
                border: 0,
                background: 'none',
            },
            code: {
                fontSize: 14,
            },
        },
    },
    // Override Styleguidist components
    styleguideComponents: {
        ComponentsListRenderer: path.join(
            __dirname,
            '.styleguide/ComponentsList'
        ),
        LogoRenderer: path.join(__dirname, '.styleguide/Logo'),
        StyleGuideRenderer: path.join(__dirname, '.styleguide/StyleGuide'),
    },
};
