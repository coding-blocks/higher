import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),

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
