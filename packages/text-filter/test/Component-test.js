const babel = require('@babel/register');

babel({
  babelrc: false,
  plugins: [
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
    require.resolve('@babel/plugin-proposal-class-properties')
  ],
  presets: [
    require.resolve('@babel/preset-react'),
    [require.resolve('@babel/preset-env'), {
      targets: {
        node: '10'
      },
      modules: 'commonjs',
      loose: true
    }]
  ],
  retainLines: true,
  comments: false
});

const test = require('tape');
const {TextFilter} = require('../src/Component');

test(`${require('../package.json').name}`, t => {
  t.ok(TextFilter instanceof Function, 'should be function');
  t.end();
});
