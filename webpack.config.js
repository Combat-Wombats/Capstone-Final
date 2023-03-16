module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react']
        }
      }
    ],
    resolve: {
      fallback: {
        fs: false,
        'stream': require.resolve('stream-browserify'),
        'buffer': require.resolve('buffer/'),
        'util': require.resolve('util/'),
        'assert': require.resolve('assert/'),
        'http': require.resolve('stream-http/'),
        'url': require.resolve('url/'),
        'https': require.resolve('https-browserify/'),
        'os': require.resolve('os-browserify/'),
      },
     }
    
  }
};
