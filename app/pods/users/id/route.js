import Ember from 'ember';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UsersIdRoute extends Route {
  @service currentUser

  async model(params) {
    let studentProfile = await this.store.queryRecord("student-profile", {
       custom: {
          ext: 'url', url: `user/${params.user_id}`
        }
      })
    if (!+studentProfile.get('id') && !Ember.isEmpty(this.get('currentUser.user'))){
      studentProfile = this.store.createRecord("student-profile", {
        isReviewed: false,
        isStudent: true,
        user: this.get('currentUser.user')
      })
    }

    return studentProfile
  } 

  setupController(controller, model) {
    controller.set('studentProfile', model)
    controller.set('editMode', model.get('profileCompletion') !== 100)
    controller.set('currentPage', model.get('profileCompletion') / 25)
  }
}
