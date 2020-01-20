import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import moment from 'moment';

export default class ApplicantProfileEditor extends Component {
  @service store
  @service currentUser

  @alias('fetchLocationsTask.lastSuccessful.value') locations
  @alias('fetchJobRolesTask.lastSuccessful.value') jobRoles

  today = new Date()
  maxEndYear = +moment().format('YYYY') + 6

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

  didReceiveAttrs() {
    this._super(...arguments)
    
    this.fetchLocationsTask.perform()
    this.fetchJobRolesTask.perform()

    if (this.applicantProfile.get('links')) {
      const links = JSON.parse(this.applicantProfile.get('links'))
      Object.keys(links).map(siteName => this.applicantProfile.set(siteName + 'Link', links[siteName]))
    }
  }

  @action
  preventDefault(e) {
    e.preventDefault()
  }

  @action 
  removeLocation (location) {
    this.applicantProfile.locations.removeObject(location)
  }

  @dropTask fetchLocationsTask = function* () {
    return yield this.store.findAll('location')
  }

  @dropTask fetchJobRolesTask = function* () {
    return yield this.store.findAll('job-role')
  }

  @computed('applicantProfile.githubLink', 'applicantProfile.linkedinLink', 'applicantProfile.stackoverflowLink', 'applicantProfile.portfolioLink')
  get links() {
    const github = this.applicantProfile.githubLink
    const linkedin = this.applicantProfile.linkedinLink
    const stackoverflow = this.applicantProfile.stackoverflowLink
    const portfolio = this.applicantProfile.portfolioLink

    const links = {
      github,
      linkedin,
      stackoverflow,
      portfolio
    }

    this.set('applicantProfile.links', JSON.stringify(links))
    return links
  }
}
