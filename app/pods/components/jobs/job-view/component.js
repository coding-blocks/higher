import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';

export default class JobViewComponent extends Component {
  @service currentUser
  @service router
  @service store
  @service webengage

  showTakeTestModal = false
  showApplyToJobModal = false
  messageToRecruiter = ''
  notEligible = false
  jobApplicationForm = {}

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
    try {
      this.set('notEligible', false)

      const form = $('#job-application-form')
      if(!form[0].checkValidity()) {
        form.find(':submit').click()
        return
      }

      let jobApplication = this.store.createRecord('job-application', {
        applicantProfile: this.applicantProfile,
        message: this.messageToRecruiter,
        job: this.job,
        applicationForm: JSON.stringify(this.jobApplicationForm)
      })
  
      yield jobApplication.save()
      this.set('jobApplication', jobApplication)
      this.set('showApplyToJobModal', false)
      this.webengage.trackEvent("Hire: Apply To Job", {})
    } catch (err) {
      
      if (err.errors[0].title == 'Not eligible for this Job') {
        this.set('notEligible', true)
      }
      this.set('showApplyToJobModal', false)
    }
  }

  @action
  takeToProfileEditor(step = 3) {
    this.webengage.trackEvent("Complete Profile and Apply", {})
    this.router.transitionTo('applicants.profile.me', { queryParams: { job_id: this.job.id, step } })
  }

  @action
  toggleModals() {
    this.set('showTakeTestModal', false)
    this.set('showApplyToJobModal', true)
  }

  @action
  toggleShowDescription() {
    this.toggleProperty('showDescription')
  }
}
