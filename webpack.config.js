var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
let extractCSS = new ExtractTextPlugin('css/[name].css');
console.log(path.resolve(__dirname, './dist'))
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
    filename: 'js/build.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.scss$/,
        loader: /*["style-loader", "css-loader", "sass-loader"]*/extractCSS.extract("style-loader", 'css-loader','sass-loader')
      },
        {test: /\.css$/, loader: extractCSS.extract("css")},
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'img/[name].[ext]?[hash]'
        }
      },
      /*{
        test: /\.(png|jpg|gif|svg)$/,
        loader:'file',
        query: {
            name:'img/[name].[ext]?[hash]'
        }
      }*/
    ]
  },
  vue:{
      css: ExtractTextPlugin.extract("css"),
      sass: ExtractTextPlugin.extract("css!sass-loader")
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({//中文比较好的一篇文章http://www.cnblogs.com/wonyun/p/6030090.html
      filename: 'index.html',
      template: 'index.html',
      inject: 'body',
      title: 'webpack is good'
    }),
      extractCSS,
    new webpack.ProvidePlugin({
        $: "webpack-zepto"
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
