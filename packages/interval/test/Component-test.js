import test from 'tape';
import {ReactInterval} from '../src/Component';


test(`ReactInterval`, t => {
  t.ok(ReactInterval instanceof Function, `should be function`);
  t.end();
});
