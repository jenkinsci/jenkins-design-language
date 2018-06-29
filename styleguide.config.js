const path = require('path');

const webpack = require('webpack');
const beautify = require('js-beautify');
const { RawSource } = require('webpack-sources');
const pkg = require('./package.json');
const crypto = require('crypto');

class BeautifyPlugin {
    constructor(config = {}) {
        this.webpack4 =
            webpack.version && /.*4(\.\d+){0,2}/gi.test(webpack.version);
        this.options = {
            config: Object.assign(
                {
                    indent_size: 1,
                    indent_with_tabs: false,
                },
                config
            ),
        };
    }

    beautify(compilation) {
        const hash = s =>
            crypto
                .createHash('sha1')
                .update(s)
                .digest('base64');
        const hashes = {};
        Object.keys(compilation.assets).forEach(k => {
            const asset = compilation.assets[k];
            if (/.*\.js/.test(k) && asset.source) {
                const source = asset.source();
                hashes[k] = hash(source).substring(0, 9);
                // console.log('generated hash:', hashes[k], 'for:', k);
                compilation.assets[k] = new RawSource(
                    beautify(source, this.options)
                );
            } else if (/.*\.html/.test(k) && asset.source) {
                const suffix = '.js?t=' + new Date().getTime();
                // for html, cache bust with a query string
                let source = asset.source();
                source = source.replace(/"([^"]+?\.js)"/g, (_, match) => {
                    // console.log(
                    //     'replacing:',
                    //     match,
                    //     'with hash:',
                    //     hashes[match]
                    // );
                    return '"' + match + '?v=' + hashes[match] + '"';
                });
                compilation.assets[k] = new RawSource(
                    beautify.html(source, this.options)
                );
            } else if (/.*\.css/.test(k) && asset.source) {
                compilation.assets[k] = new RawSource(
                    beautify.css(asset.source(), this.options)
                );
            }
        });
    }

    apply(compiler) {
        if (this.webpack4) {
            compiler.hooks.emit.tap('BeautifyPlugin', compilation => {
                this.beautify(compilation);
            });
        } else {
            compiler.plugin('emit', (compilation, callback) => {
                this.beautify(compilation);
                callback();
            });
        }
    }
}

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
    dangerouslyUpdateWebpackConfig: function(webpackConfig, env) {
        Object.assign(webpackConfig.output, {
            filename: 'build/[name].js',
            chunkFilename: 'build/[name]-[chunkhash].js',
        });
        webpackConfig.plugins = webpackConfig.plugins.concat([
            new BeautifyPlugin(),
            // Extract all 3rd party modules into a separate 'vendor' chunk
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: ({ resource }) => /node_modules/.test(resource),
            }),
            new webpack.HashedModuleIdsPlugin(),
        ]);
        webpackConfig.entry.vendor = Object.keys(pkg.dependencies);

        return webpackConfig;
    },
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
