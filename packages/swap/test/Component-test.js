import test from 'tape';
import {ReactSwap} from '../src/Component';


test('ReactSwap', t => {
  t.ok(ReactSwap instanceof Function, 'should be function');
  t.end();
});
