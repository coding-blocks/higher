import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';

export default class TalentCardComponent extends Component {
  @service currentUser

  editMode = false

  @computed('currentUser')
  get userHimself() {
    return this.profile.get('user.id') === this.currentUser.get('user.id')
  }

  @computed('profile.links')
  get links() {
    return JSON.parse(this.profile.get('links'))
  }
}
