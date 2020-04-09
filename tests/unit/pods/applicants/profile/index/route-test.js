import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | applicants/profile/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:applicants/profile/index');
    assert.ok(route);
  });
});
