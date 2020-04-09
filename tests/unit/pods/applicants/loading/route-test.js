import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | applicants/loading', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:applicants/loading');
    assert.ok(route);
  });
});
