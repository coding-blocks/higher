import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | users/me', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:users/me');
    assert.ok(route);
  });
});
