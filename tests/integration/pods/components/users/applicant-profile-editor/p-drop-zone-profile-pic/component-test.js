import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | users/applicant-profile-editor/p-drop-zone-profile-pic', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Users::ApplicantProfileEditor::PDropZoneProfilePic />`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <Users::ApplicantProfileEditor::PDropZoneProfilePic>
        template block text
      </Users::ApplicantProfileEditor::PDropZoneProfilePic>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
