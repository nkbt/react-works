import test from 'tape';
import {ReactBulkhead} from '../src/Component';


test(`ReactBulkhead`, t => {
  t.ok(ReactBulkhead instanceof Function, `should be function`);
  t.end();
});
