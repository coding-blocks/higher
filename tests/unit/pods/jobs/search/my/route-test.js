import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | jobs/search/my', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:jobs/search/my');
    assert.ok(route);
  });
});
