const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/pages/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '',
  },
  module: {
    rules: {
      
    }
  }
};