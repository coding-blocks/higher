import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class UsersIdRoute extends Route {
  @service currentUser
  @service session

  queryParams = {
    job_id: {
      refreshModel: false
    },
    step: {
      refreshModel: false
    }
  }

  afterModel(model) {
    if (!this.userHimself && !model.applicantProfile.id || model.applicantProfile.id == 0) {// if applicantProfile doesn't exist
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
        user: this.get('currentUser.user'),
        photo: this.get('currentUser.user.photo')
      })
    }

    this.set('currentUser.applicantProfile', applicantProfile)

    return RSVP.hash({
      applicantProfile
    })
  }

  setupController(controller, model) {
    controller.set('applicantProfile', model.applicantProfile)
  }
}
