const path = require('path');

module.exports = {
  entry: {
    index: './src/manoeuvre.js',
  },
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
