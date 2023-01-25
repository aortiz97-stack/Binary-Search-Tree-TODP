const path = require('path');

module.exports = {
  entry: './src/binary-search-tree.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
