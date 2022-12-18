const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html", // to import index.html file inside index.js
        }),
    ],
    devServer: {
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: "url-loader",
                options: { limit: false },
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".tsx"],
    },
}
