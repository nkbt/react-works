

const {
  pathTo,
  plugins,
  loaders,
  resolve,
  stats,
  externals
} = require(`./common`);


module.exports = {
  devtool: null,
  entry: pathTo(`example`, `index.js`),
  output: {
    filename: `bundle.js`,
    path: pathTo(`pub`)
  },
  plugins: [
    plugins.define,
    plugins.html,
    plugins.include([
      `https://unpkg.com/react-dom/dist/react-dom.min.js`,
      `https://unpkg.com/react/dist/react.min.js`
    ])
  ],
  module: {
    loaders: [
      loaders.babel
    ]
  },
  resolve,
  stats,
  externals
};
