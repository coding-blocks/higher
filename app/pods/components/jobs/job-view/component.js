import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';

export default class JobViewComponent extends Component {
  @service currentUser
  @service router
  @service store

  showTakeTestModal = false
  showApplyToJobModal = false
  messageToRecruiter = ''

  @computed('myApplication', 'jobApplication')
  get allreadyApplied() {
    return !isEmpty(this.myApplication) || !isEmpty(this.jobApplication)
  }

  @computed('job') 
  get completeProfileRedirectionPath (){
    return `/applicants/profile/me?step=3&job_id=${this.job.id}`
  }

  @computed('applicantProfile.profileCompletion')
  get isProfileCompleted() {
    return this.applicantProfile && this.applicantProfile.profileCompletion === 100
  }

  @dropTask applyToJobTask = function* () {
    let jobApplication = this.store.createRecord('job-application', {
      applicantProfile: this.applicantProfile,
      message: this.messageToRecruiter,
      job: this.job
    })

    yield jobApplication.save()
    this.set('jobApplication', jobApplication)
    this.set('showApplyToJobModal', false)
  }

  @action
  takeToProfileEditor(step = 3) {
    console.log('tracking')
    window.dataLayer.push({ 
      'event': 'job_viewed',
      'userOneauth': `${this.currentUser.get('user.oneauthId')}`
    })
    this.router.transitionTo('applicants.profile.me', { queryParams: { job_id: this.job.id, step } })
  }

  @action
  toggleModals() {
    this.set('showTakeTestModal', false)
    this.set('showApplyToJobModal', true)
  }
}
