// I'm using Node's CommonJS syntax (e.g. require, exports) since Node doesn't support ES modules yet.
// Alternatively, you could also use babel-node to transpile your code for Node.
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
    mode: "development",
    target: "web",
    devtool: "cheap-module-source-map", // Source map let us see our original code when debugging in the browser
    entry: "./src/index", // this is default for webpack so you don't have to put it in.
    output: {
        path: path.resolve(__dirname, "build"), //Webpack doesn't output code in development mode. it serves our app from memory
        publicPath: "/",
        filename: "bundle.js"
    },
    devServer: {
        stats: "minimal",
        overlay: true,
        historyApiFallback: true,
        disableHostCheck: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        https: false
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.API_URL": JSON.stringify("http://localhost:3001")
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html",
            favicon: "src/favicon.ico"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            },
            {
                test: /(\.css)$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};
