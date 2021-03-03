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
    return !isEmpty(applicantProfile.get('resumeUpload.url'))
  }

  @dropTask fetchLocationsTask = function* () {
    return yield this.store.query('location', {
      filter: {
        "is_listed =": true
      }
    })
  }

  @dropTask fetchJobRolesTask = function* () {
    return yield this.store.query('job-role', {
      filter: {
        "is_listed =": true
      }
    })
  }

  @action
  async onResumeUpload({ url }) {
    let resumeUpload = await this.applicantProfile.get('resumeUpload')

    if (isEmpty(resumeUpload)) {
      resumeUpload = this.store.createRecord('upload', {
        type: 'resume',
        isVerified: true,
        url: url
      })

      this.applicantProfile.set('resumeUpload', resumeUpload)
    }
    else {
      resumeUpload.set('url', url)
      await resumeUpload.save()
    }
    this.applicantProfile.set('resumeLink', null)
  }

  @action
  preventDefault(e) {
    e.preventDefault()
  }

  @action
  removeLocation(location) {
    this.applicantProfile.locations.removeObject(location)
  }
}
