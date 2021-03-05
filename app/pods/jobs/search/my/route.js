import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class JobsSearchMyRoute extends Route {
  @service currentUser

  beforeModel(transition) {
    if(this.currentUser.user.userType !== 'recruiter') {
      this.transitionTo('jobs')
    }
  }

  async model() {
    // await this.currentUser.setUserType('recruiter')
    return this.currentUser.getRecruiterProfile()
  }

  setupController(controller, model) {
    controller.set('recruiterProfile', model)
    controller.set('filter', {
      "jobs.recruiter_profile_id =": model.id
    })
  }
}
