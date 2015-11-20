import test from 'tape';
import ReactSwap from '../src/ReactSwap';

test('ReactSwap', t => {
  t.ok(ReactSwap instanceof Function, 'should be function');
  t.end();
});
