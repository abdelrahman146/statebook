const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: {
        'statebook': './src/index.ts',
        'statebook.min': './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist/bundles'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'Statebook',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    }
}