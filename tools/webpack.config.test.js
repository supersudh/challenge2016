/**
  * Created by Zhengfeng Yao on 16/8/24.
  */
import path from 'path';

const config = {
  devtool: 'eval',

  resolve: {
    root: path.join(__dirname, '..'),
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
  },

  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'isparta-instrumenter-loader',
        include: [
          path.join(__dirname, '../src')
        ]
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../test'),
        ],
        exclude: /\.es5\.js$/,
        loader: 'babel-loader',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.json5$/,
        loader: 'json5-loader',
      }, {
        test: /\.(woff\d?|ttf|eot|svg|jpe?g|png|gif|txt)(\?.*)?$/,
        loader: 'null-loader',
      }, {
        test: /\.est$/,
        loader: 'babel-loader!template-string-loader'
      }
    ],
  },
};

export default config;
