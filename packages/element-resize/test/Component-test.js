import test from '../../../lib/test/tape';
import {ReactElementResize} from '../src/Component';


test(`ReactElementResize`, t => {
  t.ok(ReactElementResize instanceof Function, `should be function`);
  t.end();
});
