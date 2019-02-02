const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: "cheap-module-inline-source-map",
    entry: ["babel-polyfill", "./src/app.js"],

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },

    resolve: {
        alias: {
            API: path.resolve(__dirname, "src/api")
        }
    },

    module: {
        rules: [
            { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
            {
                test: /\.css$/,
                loader: "style-loader"
            },
            {
                test: /\.css$/,
                loader: "css-loader",
                query: {
                    modules: true,
                    localIdentName: "[name]__[local]___[hash:base64:5]"
                }
            },

            { test: /\.(png|jpg|svg)$/, loader: "url-loader?limit=8192" }
        ]
    },

    devServer: {
        historyApiFallback: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/public/index.html"
        })
    ]
};
