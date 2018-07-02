// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const path = require('path');
module.exports = (baseConfig, env) => {
    const config = genDefaultConfig(baseConfig, env);
    // Extend it as you need.
    // For example, add typescript loader:
    config.module.rules.push(
        {
            test: /\.(ts|tsx)$/,
            loader: 'ts-loader',
        },
        {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../'),
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
        }
    );
    config.externals = Object.assign(config.externals || {}, {
        // jsdom: 'window',
        // cheerio: 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
        'react/addons': true,
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
};
