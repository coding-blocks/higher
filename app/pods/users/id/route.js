import Ember from 'ember';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class UsersIdRoute extends Route {
  @service currentUser
  @service api

  async model(params) {
    const hbPerformanceStats = this.api.request(`/student-profiles/user/${params.user_id}/hacker-blocks-performance`)
    let studentProfile = await this.store.queryRecord("student-profile", {
       custom: {
          ext: 'url', url: `user/${params.user_id}`
        }
      })
    if (!+studentProfile.get('id') && !Ember.isEmpty(this.get('currentUser.user'))){
      studentProfile = this.store.createRecord("student-profile", {
        isReviewed: false,
        isStudent: true,
        profileCompletion: 0,
        links: JSON.stringify({ github: ""}),
        user: this.get('currentUser.user')
      })
    }

    return RSVP.hash({
      studentProfile,
      hbPerformanceStats
    })
  } 

  setupController(controller, model) {
    controller.set('studentProfile', model.studentProfile)
    const profileCompletion = model.studentProfile.get('profileCompletion')
    controller.set('editMode', profileCompletion !== 100)
    controller.set('currentPage', profileCompletion === 100 ? 0 : profileCompletion / 25)
    controller.set('hbPerformanceStats', model.hbPerformanceStats)
  }
}
