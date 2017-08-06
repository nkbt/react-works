import test from 'tape';
import {TextFilter} from '../src/Component';


test(`TextFilter`, t => {
  t.ok(TextFilter instanceof Function, `should be function`);
  t.end();
});
