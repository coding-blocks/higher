import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | recruiter/jobs/id', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:recruiter/jobs/id');
    assert.ok(route);
  });
});
