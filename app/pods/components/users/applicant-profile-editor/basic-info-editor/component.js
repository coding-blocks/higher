import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

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

  @dropTask fetchLocationsTask = function* () {
    return yield this.store.findAll('location')
  }

  @dropTask fetchJobRolesTask = function* () {
    return yield this.store.findAll('job-role')
  }

  @action
  onResumeUpload({ url }) {
    this.applicantProfile.set('resumeLink', url)
  }

  @action
  preventDefault(e) {
    e.preventDefault()
  }
}
