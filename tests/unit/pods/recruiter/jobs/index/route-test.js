import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | recruiter/jobs/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:recruiter/jobs/index');
    assert.ok(route);
  });
});
