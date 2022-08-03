import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class JobViewComponent extends Component {
  @service currentUser

  @computed.equal('currentUser.user.userType', 'recruiter') isCurrentUserRecruiter

  @computed('company.recruiterProfile.user.id', 'currentUser.user')
  get isRecruiterHimself() {
    return this.get('company.recruiterProfile.user.id') == this.get('currentUser.user.id')
  }

  @action
  toggleShowDescription() {
    this.toggleProperty('showDescription')
  }
}
