const path = require('path');
module.exports = {
    components: 'components/**/*.tsx',
    ignore: ['**/*.stories.tsx', '**/*.tests.tsx'],
    webpackConfig: Object.assign(
        {},
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
                        test: /\.(ttf|eot|svg|png)$/,
                        use: {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[hash].[ext]',
                            },
                        },
                    },
                ],
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.jsx', '.js'],
            },
        }
    ),
    getExampleFilename(componentPath) {
        return componentPath.replace(/\.tsx?$/, '.md');
    },
    require: [path.join(__dirname, 'css/index.scss')],
    propsParser: require('react-docgen-typescript').withDefaultConfig([]).parse,
};
