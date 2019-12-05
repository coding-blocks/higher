import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, action } from '@ember/object';
import { restartableTask } from 'ember-concurrency-decorators';

export default class UserIdController extends Controller {
  @service currentUser
  @service store

  @computed('studentProfile', 'currentUser')
  get userHimself() {
    return this.currentUser.get('user.id') === this.studentProfile.get('user.id')
  }

  @restartableTask saveStudentProfileTask = function* (currentPage) {
    this.set('studentProfile.profileCompletion', (currentPage + 1) * 25)
    if (this.studentProfile.get('profileCompletion') === 100) {
      this.set('editMode', false)
    }
    this.studentProfile.save()
  }

  @action
  getNewRecord(modelName, options) {
    return this.store.createRecord(modelName, {
      studentProfile: this.studentProfile,
      ...options
    }) 
  }
}
