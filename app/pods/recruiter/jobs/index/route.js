import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  
  model() {
    return  this.currentUser.getRecruiterProfile()    
  },

  setupController(controller, model) {
    controller.set('recruiterProfile', model)
    controller.set('filter', {
      "is_accepting =": true,
      "deadline >": moment().format(),
      "companies.is_active =": true,
      "jobs.recruiter_profile_id =": model.id
    })
  }
})
