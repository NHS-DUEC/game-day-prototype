const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].js",
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "../bundle-report.html",
      openAnalyzer: false,
    }),
    new WebpackManifestPlugin({
      publicPath: "/",
      filter: (file) =>
        !file.name.endsWith(".map") && !file.name.includes("css/webchat"),
      fileName: path.resolve("../NHS111.Web.Proxy/manifest.json"),
    }),
  ],
});
