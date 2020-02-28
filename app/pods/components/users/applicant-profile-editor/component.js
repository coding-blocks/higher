import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default class ApplicantProfileEditor extends Component {
  @service store
  @service currentUser
  @service router

  showValidationMessages = false
  pages = [
    {
      title: 'Introduction',
    },
    {
      title: 'Experience',
    },
    {
      title: 'Skill Set',
    },
    {
      title: 'Others',
    },
  ]

  @computed('applicantProfile.githubLink', 'applicantProfile.linkedinLink', 'applicantProfile.stackoverflowLink', 'applicantProfile.portfolioLink', 'applicantProfile.leetcodeLink', 'applicantProfile.hackerrankHackerearthLink')
  get links() {
    const github = this.applicantProfile.githubLink
    const linkedin = this.applicantProfile.linkedinLink
    const stackoverflow = this.applicantProfile.stackoverflowLink
    const portfolio = this.applicantProfile.portfolioLink
    const leetcode = this.applicantProfile.leetcodeLink
    const hackerrankHackerearth = this.applicantProfile.hackerrankHackerearthLink

    const links = {
      github,
      linkedin,
      stackoverflow,
      portfolio,
      leetcode,
      hackerrankHackerearth
    }

    this.set('applicantProfile.links', JSON.stringify(links))
    return links
  }


  didReceiveAttrs() {
    this._super(...arguments)
    this.setCurrentPage()

    if (this.applicantProfile.get('links')) {
      const links = JSON.parse(this.applicantProfile.get('links'))
      Object.keys(links).map(siteName => this.applicantProfile.set(siteName + 'Link', links[siteName]))
    }
  }

  @action
  onProfilePicUpload({url}) {
    this.applicantProfile.set('photo', url)
  }
  
  @action 
  removeLocation (location) {
    this.applicantProfile.locations.removeObject(location)
  }

  @dropTask saveApplicantProfileTask = function* (currentPage) {
    try {
      if (this.applicantProfile.validations.isInvalid) {
        this.set('showValidationMessages', true)
        this.scrollTo(".form-error")
        return Promise.reject(new Error('Form Validations not passed'))
      }

      yield Promise.all([this.handleResumeUpload(), this.handlePhotoUpload()])
      if (this.resumeUpload && this.resumeUpload.hasDirtyAttributes) {
        yield this.resumeUpload.save()
        this.applicantProfile.set('resumeUpload', this.resumeUpload)
        // this.applicantProfile.set('resumeLink', null)
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
        this.router.transitionTo('jobs.id', this.job_id)
        this.set('step', null) //singleton & computed editMode :(
        this.set('job_id', null) //singleton & computed editMode :(
      }

      this.scrollTo("#timeline-top")
    } catch (err) {
      console.log('yoyo', err)
    }
  }


  setCurrentPage() {
    const step = +this.step
    const profileCompletion = this.applicantProfile.profileCompletion
    const totalSteps = 4
    const stepFromProfileCompletion = profileCompletion / 25
    
    if (step >= 1 && step <= totalSteps) {
      return this.set('currentPage', Math.min(step - 1, stepFromProfileCompletion))
    }

    this.set('currentPage', stepFromProfileCompletion % 4)
  }

  async handleResumeUpload() {
    if (!isEmpty(this.applicantProfile.resumeLink)) { //ie. resume has never been uploaded for this company
      return
    }

    let resumeUpload = await this.applicantProfile.get('resumeUpload')

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

  scrollTo(id) {
    const element = document.querySelector(id)
    element.scrollIntoView()
  }
}
