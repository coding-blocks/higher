import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { later } from '@ember/runloop';

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
  async onProfilePicUpload({url}) {
    this.applicantProfile.set('photo', url)

    let photoUpload = await this.applicantProfile.get('photoUpload')

    if (isEmpty(photoUpload)) {
      photoUpload = this.store.createRecord('upload', {
        type: 'profile_photo',
        isVerified: true,
        url: this.applicantProfile.photo
      })
      await photoUpload.save()
      this.applicantProfile.set('photoUpload', photoUpload)
      await this.applicantProfile.save()
    }
    else {
      photoUpload.set('url', this.applicantProfile.photo)
      await photoUpload.save()
    }
  }

  @dropTask saveApplicantProfileTask = function* (currentPage) {
    try {
      if (this.applicantProfile.validations.isInvalid) {
        this.set('currentPage', 0)
        this.set('showValidationMessages', true)
        this.scrollTo(".form-error")
        return Promise.reject(new Error('Form Validations not passed'))
      }

      yield this.handleResumeUpload()
      if (this.resumeUpload && this.resumeUpload.hasDirtyAttributes) {
        yield this.resumeUpload.save()
        this.applicantProfile.set('resumeUpload', this.resumeUpload)
        // this.applicantProfile.set('resumeLink', null)
      }

      this.set('applicantProfile.stepNumber', currentPage + 2)
      this.set('applicantProfile.profileCompletion', (currentPage + 1) * 25)
      yield this.applicantProfile.save()

      if (this.applicantProfile.stepNumber === 5) {
        this.set('step', null)
      }

      if (currentPage === 3 && !!this.job_id) {// if user was redirected form apply to job page
        this.router.transitionTo('jobs.id', this.job_id)
        this.set('step', null) //singleton & computed editMode :(
        this.set('job_id', null) //singleton & computed editMode :(
      }

      this.scrollTo("#timeline-top")
    } catch (err) {
      console.error('yoyo', err)
    }
  }


  setCurrentPage() {
    const step = +this.step
    const totalSteps = 4
    const profileStep = this.applicantProfile.stepNumber || 1;
    
    if (step >= 1 && step <= totalSteps) {
      return this.set('currentPage', Math.min(step - 1, profileStep - 1))
    }

    this.set('currentPage', profileStep - 1)
  }

  async handleResumeUpload() {
    if (!isEmpty(this.applicantProfile.resumeLink)) { //ie. resume has never been uploaded for this company
      return
    }

    let resumeUpload = await this.applicantProfile.get('resumeUpload')

    this.set('resumeUpload', resumeUpload)
  }

  scrollTo(selector) {
    const element = document.querySelector(selector)
    if(element) {
      element.scrollIntoView()
    }
  }
}
