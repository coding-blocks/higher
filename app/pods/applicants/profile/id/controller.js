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
  step = null

  showValidationMessages = false

  @computed('applicantProfile', 'currentUser')
  get userHimself() {
    return this.currentUser.get('user.id') === this.applicantProfile.get('user.id')
  }

  @computed('step', 'applicantProfile.profileCompletion', 'userHimself')
  get editMode() {
    let step = +this.step
    let profileCompletion = this.applicantProfile.profileCompletion
    const totalSteps = 4

    if (step >= 1 && step <= totalSteps) {//when step has precedence?
      return this.userHimself
    }

    return this.userHimself && profileCompletion !== 100
  }

  @dropTask saveApplicantProfileTask = function* (currentPage) {
    try {
      if (this.applicantProfile.validations.isInvalid) {
        this.set('showValidationMessages', true)
        return Promise.reject(new Error('Form Validations not passed'))
      }

      yield Promise.all([this.handleResumeUpload(), this.handlePhotoUpload()])
      if (this.resumeUpload && this.resumeUpload.hasDirtyAttributes) {
        yield this.resumeUpload.save()
        this.applicantProfile.set('resumeUpload', this.resumeUpload)
      }
      if (this.photoUpload && this.photoUpload.hasDirtyAttributes) {
        yield this.photoUpload.save()
        this.applicantProfile.set('photoUpload', this.photoUpload)
      }

      this.set('applicantProfile.profileCompletion', (currentPage + 1) * 25)
      
      yield this.applicantProfile.save()
      if (this.applicantProfile.profileCompletion === 100) {
        this.set('step', null)
      }

      if (currentPage === 3 && !!this.job_id) {// if user was redirected form apply to job page
        this.transitionToRoute('jobs.id', this.job_id)
        this.set('step', null) //singleton & computed editMode :(
        this.set('job_id', null) //singleton & computed editMode :(
      }
    } catch (err) {
      console.log(err)
    }
  }

  @dropTask syncOnlineCoursesTask = function* () {
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

  async handleResumeUpload() {
    if (isEmpty(this.applicantProfile.resumeLink)) { //ie. resume has never been uploaded for this company
      return
    }
    
    let resumeUpload = await this.applicantProfile.get('resumeUpload')

    if (isEmpty(resumeUpload)) {
      resumeUpload = this.store.createRecord('upload', {
        type: 'resume',
        isVerified: true,
        verifiedById: this.currentUser.user.id,
        url: this.applicantProfile.resumeLink
      })
    }
    else {
      resumeUpload.set('url', this.applicantProfile.resumeLink)
    }

    this.set('resumeUpload', resumeUpload)
  }

  async handlePhotoUpload() {
    if (isEmpty(this.applicantProfile.photo)) { //ie. photo has never been uploaded for this company
      return
    }
    
    let photoUpload = await this.applicantProfile.get('photoUpload')

    if (isEmpty(photoUpload)) {
      photoUpload = this.store.createRecord('upload', {
        type: 'profile_photo',
        isVerified: true,
        verifiedById: this.currentUser.user.id,
        url: this.applicantProfile.photo
      })
    }
    else {
      photoUpload.set('url', this.applicantProfile.photo)
    }

    this.set('photoUpload', photoUpload)
  }
}
