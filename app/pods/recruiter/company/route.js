import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),
  async model(){
    const recruiterProfile = await this.currentUser.getRecruiterProfile()
    const existingCompany = await this.store.query('company', {
      filter: {
        "companies.recruiter_profile_id =": recruiterProfile.get('id')
      }
    })

    if(existingCompany.objectAt(0)) {
      return existingCompany.objectAt(0)
    }

    return this.store.createRecord('company', {
      recruiterProfile: this.currentUser.get('recruiterProfile'),
      isActive: true,
      contacts: JSON.stringify([])
    })
  },
  setupController(controller, model) {
    controller.set('company', model)
  }
});
