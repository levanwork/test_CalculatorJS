const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  return {
    mode: argv.mode || 'development',
    target: 'web',
    entry: './src/js/app.js',
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'docs'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            argv.mode === 'development'
              ? 'style-loader'
              : MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css', // Extract CSS into a separate file
      }),
    ],
    devtool: argv.mode === 'development' ? 'source-map' : false,
  };
};
