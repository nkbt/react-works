import test from '../../../lib/test/tape';
import {NormalizedSelect} from '../src/Component';


test(`NormalizedSelect`, t => {
  t.ok(NormalizedSelect instanceof Function, `should be function`);
  t.end();
});
