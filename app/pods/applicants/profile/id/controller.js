import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { dropTask } from 'ember-concurrency-decorators';

export default class ApplicantsProfileIdController extends Controller {
  @service currentUser
  @service store
  @service api

  queryParams = ['job_id', 'step']
  job_id = null

  /* variable `step` is used to set editor to selected step using query params
  */
  step = null

  @computed('applicantProfile', 'currentUser')
  get userHimself() {
    return this.currentUser.get('user.id') === this.applicantProfile.get('user.id')
  }

  @computed('step', 'applicantProfile.stepNumber', 'userHimself')
  get editMode() {
    let step = +this.step
    let profileStep = this.applicantProfile.stepNumber
    const totalSteps = 4

    if (step >= 1 && step <= totalSteps) {//when step has precedence?
      return this.userHimself //if user is visiting his/her own profile then let edit
    }

    return this.userHimself && profileStep <= 4
  }

  @action
  getNewRecord(modelName, options) {
    return this.store.createRecord(modelName, {
      applicantProfile: this.applicantProfile,
      ...options
    })
  }

}
