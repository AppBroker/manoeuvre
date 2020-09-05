const path = require('path');
// const bundleAnalyzer = require('webpack-bundle-analyzer');

module.exports = {
  entry: {
    index: './src/tracker.js',
  },
  plugins: [
    // new bundleAnalyzer.BundleAnalyzerPlugin(),
  ],
  mode: 'production',
  target: 'node',
  output: {
    filename: 'index.js',
    library: 'manoeuvre',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
    path: path.resolve(__dirname, './dist'),
  },
};
