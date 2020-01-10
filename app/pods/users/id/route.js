import Ember from 'ember';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class UsersIdRoute extends Route {
  @service currentUser
  @service api

  async model(params) {
    let applicantProfile = await this.store.queryRecord("applicant-profile", {
       custom: {
          ext: 'url', url: `user/${params.user_id}`
        }
      })
    if (!+applicantProfile.get('id') && !Ember.isEmpty(this.get('currentUser.user'))){
      applicantProfile = this.store.createRecord("applicant-profile", {
        isReviewed: false,
        isStudent: true,
        profileCompletion: 0,
        links: JSON.stringify({ github: ""}),
        user: this.get('currentUser.user')
      })
    }

    return RSVP.hash({
      applicantProfile,
    })
  } 

  setupController(controller, model) {
    controller.set('applicantProfile', model.applicantProfile)
    const profileCompletion = model.applicantProfile.get('profileCompletion')
    controller.set('editMode', profileCompletion !== 100)
    controller.set('currentPage', profileCompletion === 100 ? 0 : profileCompletion / 25)
  }
}
