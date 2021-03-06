import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),

  beforeModel(transition) {
    if(this.currentUser.get('user.userType') == 'applicant') {
      transition.abort()
    }
  },

  async model() {
    const recruiterProfile = await this.currentUser.getRecruiterProfile()

    return this.store.createRecord('job', {
      isAccepting: true,
      type: 'fulltime',
      status: 'draft',
      experienceType: 'not_required',
      isForNonCb: false,
      form: JSON.stringify([]),
      recruiterProfile
    })
  }
});
