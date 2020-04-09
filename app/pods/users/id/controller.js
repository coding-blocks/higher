import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, action } from '@ember/object';
import { dropTask } from 'ember-concurrency-decorators';

export default class UserIdController extends Controller {
  @service currentUser
  @service store
  @service api

  queryParams = ['job_id']
  job_id = null
  showValidationMessages = false

  @computed('applicantProfile', 'currentUser')
  get userHimself() {
    return this.currentUser.get('user.id') === this.applicantProfile.get('user.id')
  }

  @dropTask saveApplicantProfileTask = function* (currentPage) {
    try {
      if(this.applicantProfile.validations.isInvalid){
        this.set('showValidationMessages', true)
        return Promise.reject(new Error('Form Validations not passed'))
      }
      
      this.set('applicantProfile.profileCompletion', (currentPage + 1) * 25)
      if (this.applicantProfile.get('profileCompletion') === 100) {
        this.set('editMode', false)
      }
      yield this.applicantProfile.save()
    } catch(err) {
      
    }
  }

  @dropTask syncOnlineCoursesTask = function *() {
    let applicantCourses = yield this.store.query('applicant-course', {
      custom: {
        ext: 'url',
        url: `applicant-profile/${this.applicantProfile.id}/get-onlinecb-courses`
      }
    })

    applicantCourses.map(ac => ac.set('applicantProfile', this.applicantProfile))
  }

  @action
  getNewRecord(modelName, options) {
    return this.store.createRecord(modelName, {
      applicantProfile: this.applicantProfile,
      ...options
    }) 
  }
}
