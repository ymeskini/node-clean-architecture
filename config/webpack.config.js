const path = require('path');
const nodeExternals = require('webpack-node-externals');
const {resolve} = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = {
    context: resolve(__dirname, '../src'),
    entry: ['./adapters/primary/rest/server.ts'],
    devtool: 'inline-source-map',
    watch: true,
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
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new NodemonPlugin()
    ],
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'server.js',
    },
};