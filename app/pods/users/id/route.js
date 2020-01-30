import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class UsersIdRoute extends Route {
  @service currentUser
  @service session

  queryParams = {
    job_id: {
      refreshModel: false
    }
  }

  afterModel(model) {
    if(!this.userHimself && !model.applicantProfile.id || model.applicantProfile.id == 0) {
      this.transitionTo('index')
    }
  }

  async model(params) {
    this.set('userHimself', params.user_id == this.currentUser.get('user.id'))
    
    let applicantProfile = await this.store.queryRecord("applicant-profile", {
      custom: {
        ext: 'url', url: `user/${params.user_id}`
      }
    })
    if (this.userHimself && !+applicantProfile.get('id')) {
      applicantProfile = this.store.createRecord("applicant-profile", {
        isReviewed: false,
        isStudent: true,
        profileCompletion: 0,
        links: JSON.stringify({ github: "" }),
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
    controller.set('editMode', this.userHimself && profileCompletion !== 100)
    controller.set('currentPage', profileCompletion === 100 ? 0 : profileCompletion / 25)
  }
}
