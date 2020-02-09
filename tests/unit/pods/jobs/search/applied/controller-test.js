import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | jobs/search/applied', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:jobs/search/applied');
    assert.ok(controller);
  });
});
