const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactrefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
    mode: isDevelopment ? "development" : "production",
    entry: path.resolve(__dirname, "src", "index.tsx"),
    devtool: isDevelopment ? "eval-source-map" : "source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        hot: true,
    },
    plugins: [
        isDevelopment && new ReactrefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
        }),
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.(j|t)sx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve("babel-loader"),
                        options: {
                            plugins: [
                                isDevelopment &&
                                require.resolve("react-refresh/babel"),
                            ].filter(Boolean),
                        },
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
};