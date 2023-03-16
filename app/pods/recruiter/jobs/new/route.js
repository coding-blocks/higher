import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),
  model() {
    return this.store.createRecord('job', {
      isAccepting: true,
      type: 'fulltime',
      status: 'draft',
      experienceType: 'not_required',
      isForNonCb: false,
      form: JSON.stringify([]),
      recruiterProfile: this.currentUser.get('recruiterProfile')
    })
  }
});
