const path = require('path');
const nodeExternals = require('webpack-node-externals');
const {resolve} = require('path');

module.exports = {
    context: resolve(__dirname, '../src'),
    entry: ['./adapters/primary/rest/server.ts'],
    devtool: 'inline-source-map',
    target: 'node',
    externals: [
        nodeExternals({
            allowlist: ['webpack/hot/poll?100'],
        }),
    ],
    module: {
        rules: [
            {
                test: /.ts?$/,
                use: 'awesome-typescript-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'production',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'server.js',
    },
};