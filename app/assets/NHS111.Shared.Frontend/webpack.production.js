const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      // eslint-disable-next-line no-unused-vars
      filename: (pathData, assetInfo) => {
        if (pathData.chunk.name.includes("css/webchat")) {
          // Omit the contenthash from webchat css files, so that they could be referenced directly from the CDN if
          // necessary, without knowledge of the contenthash.
          return "[name].css";
        }

        return "[name].[contenthash].css";
      },
    }),
    new WebpackManifestPlugin({
      publicPath: "/",
      filter: (file) =>
        !file.name.endsWith(".map") && !file.name.includes("css/webchat"),
      fileName: path.resolve("../NHS111.Web.Proxy/manifest.json"),
    }),
  ],
});
