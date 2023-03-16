import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class JobsSearchMyRoute extends Route {
  @service currentUser
  @service sidenav

  beforeModel(){
    this.sidenav.set('for', 'recruiter')
  }

  async model() {
    await this.currentUser.setUserType('recruiter')
    return this.currentUser.getRecruiterProfile()
  }

  setupController(controller, model) {
    controller.set('recruiterProfile', model)
    controller.set('filter', {
      "jobs.recruiter_profile_id =": model.id
    })
  }
}
