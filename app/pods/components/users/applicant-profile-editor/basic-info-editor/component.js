import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class BasicInfoEditoComponent extends Component {
  @service store

  @alias('fetchLocationsTask.lastSuccessful.value') locations
  @alias('fetchJobRolesTask.lastSuccessful.value') jobRoles

  today = new Date()
  maxEndYear = +moment().format('YYYY') + 6
  jobTypes = ['fulltime', 'internship', 'parttime']

  didReceiveAttrs() {
    this._super(...arguments)

    this.fetchLocationsTask.perform()
    this.fetchJobRolesTask.perform()
  }

  @computed('applicantProfile.resumeLink', 'applicantProfile.resumeUpload')
  get showResumeDownloadButton() {
    const applicantProfile = this.applicantProfile
    return isEmpty(this.applicantProfile.resumeLink) && !isEmpty(applicantProfile.get('resumeUpload.id'))
  }

  @dropTask fetchLocationsTask = function* () {
    return yield this.store.findAll('location')
  }

  @dropTask fetchJobRolesTask = function* () {
    return yield this.store.findAll('job-role')
  }

  @action
  async onResumeUpload({ url }) {
    let resumeUpload = await this.applicantProfile.get('resumeUpload')

    if (isEmpty(resumeUpload)) {
      resumeUpload = this.store.createRecord('upload', {
        type: 'resume',
        isVerified: true,
        verifiedById: this.currentUser.user.id,
        url: url
      })

      this.applicantProfile.set('resumeUpload', resumeUpload)
    }
    else {
      resumeUpload.set('url', url)
    }
    this.applicantProfile.set('resumeLink', null)
  }

  @action
  preventDefault(e) {
    e.preventDefault()
  }
}
