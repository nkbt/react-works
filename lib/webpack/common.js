const webpack = require(`webpack`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const HtmlWebpackIncludeAssetsPlugin = require(`html-webpack-include-assets-plugin`);
const path = require(`path`);
const {
  NODE_ENV = `development`,
  npm_package_config_component: COMPONENT_NAME,
  npm_package_config_externals: COMPONENT_EXTERNALS = {
    [`react`]: `React`,
    [`react-dom`]: `ReactDOM`
  }
} = process.env;
exports.COMPONENT_NAME = COMPONENT_NAME;


if (!COMPONENT_NAME) {
  throw Error(`<package.json>.config.component name is required`);
}


const pathTo = p => path.join(process.cwd(), p);
exports.pathTo = pathTo;


const {name: PACKAGE_NAME} = require(pathTo(`package.json`));
exports.PACKAGE_NAME = PACKAGE_NAME;


exports.loaders = {
  json: {test: /\.json$/, loader: `json`},
  babel: {
    test: /\.js$/,
    loader: `babel`,
    include: [pathTo(`src`), pathTo(`example`)]
  }
};


exports.plugins = {
  define: new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  }),
  html: new HtmlWebpackPlugin(),
  uglify: new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  }),
  include: assets => new HtmlWebpackIncludeAssetsPlugin({
    assets,
    append: false
  })
};


exports.resolve = {extensions: [``, `.js`]};


exports.stats = {colors: true};


exports.externals = COMPONENT_EXTERNALS;
