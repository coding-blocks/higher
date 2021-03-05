import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),

  async model() {
    // await this.currentUser.setUserType('recruiter')
    return this.currentUser.getRecruiterProfile()
  },

  setupController(controller, model) {
    controller.set('filter', {
      "recruiter_profile_id =": model.id
    })
  }
});
