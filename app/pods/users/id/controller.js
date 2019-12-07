import { isEmpty } from '@ember/utils';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, action } from '@ember/object';
import { restartableTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';

export default class UserIdController extends Controller {
  @service currentUser
  @service store

  @computed('applicantProfile', 'currentUser')
  get userHimself() {
    return this.currentUser.get('user.id') === this.applicantProfile.get('user.id')
  }

  @restartableTask saveApplicantProfileTask = function* (currentPage) {
    
    const currentLocation = yield this.applicantProfile.get('currentLocation')
    if(isEmpty(currentLocation)) {
      return { error: 'Current Location cannot be empty' }
    } else {
      this.set('applicantProfile.profileCompletion', (currentPage + 1) * 25)
      if (this.applicantProfile.get('profileCompletion') === 100) {
        this.set('editMode', false)
      }
      yield this.applicantProfile.save()
    }
  }

  @action
  getNewRecord(modelName, options) {
    return this.store.createRecord(modelName, {
      applicantProfile: this.applicantProfile,
      ...options
    }) 
  }
}
