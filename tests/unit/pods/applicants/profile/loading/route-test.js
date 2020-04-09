import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | applicants/profile/loading', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:applicants/profile/loading');
    assert.ok(route);
  });
});
