import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | applicants/profile/me', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:applicants/profile/me');
    assert.ok(route);
  });
});
