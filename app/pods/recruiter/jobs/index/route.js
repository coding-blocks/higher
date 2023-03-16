import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),
  
  model() {
    return this.currentUser.getRecruiterProfile()    
  },

  setupController(controller, model) {
    controller.set('recruiterProfile', model)
    controller.set('filter', {
      "jobs.recruiter_profile_id =": model.id
    })
  }
})
