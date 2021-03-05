import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Route.extend({
  currentUser: service(),

  isCurrentUserRecruiter: computed.equal('currentUser.user.userType', 'recruiter'),

  
  model() {
    return this.store.findRecord('job', this.paramsFor('jobs.id').job_id)
  },
  
  afterModel(model) {
    const isRecruiterHimself = model.get('recruiterProfile.user.id') == this.get('currentUser.user.id')
    if( !this.isCurrentUserRecruiter || !isRecruiterHimself) {
      this.transitionTo('jobs.id', model.id)
    }
  },

  setupController(controller, model) {
    controller.set('job', model)
  }
});
