import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class JobRowComponent extends Component {
  @service currentUser

  showRecruiterOptions = false

  @computed.equal('currentUser.user.userType', 'recruiter') isCurrentUserRecruiter

  @computed('job.recruiterProfile.user.id', 'currentUser.user')
  get isRecruiterHimself() {
    return this.get('job.recruiterProfile.user.id') == this.get('currentUser.user.id')
  }
}
