import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class ApplicantProfileComponent extends Component {
  @service currentUser

  @computed('currentUser')
  get userHimself() {
    return this.profile.get('user.id') === this.currentUser.get('user.id')
  }

  @computed('profile.links')
  get links() {
    return JSON.parse(this.profile.get('links'))
  }

}
