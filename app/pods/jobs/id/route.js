import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default class JobsIdRoute extends Route {
  @service currentUser

  async model(params) {
    const job = await this.store.findRecord('job', params.job_id, { reload: true })
    const myApplication = job.get('myApplication')
    const applicantProfile = this.currentUser.getApplicantProfile()
  
    return RSVP.hash({
      job,
      myApplication,
      applicantProfile
    })
  }
}
