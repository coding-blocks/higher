import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class ApplicantProfileEditor extends Component {
  @service store
  @service currentUser

  @alias('fetchLocationsTask.lastSuccessful.value') locations
  @alias('fetchJobRolesTask.lastSuccessful.value') jobRoles

  github = ''
  linkedin = ''
  stackoverflow = ''
  portfolio = ''

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
      Object.keys(links).map(siteName => this.set(siteName, links[siteName]))
    }
  }

  @dropTask fetchLocationsTask = function* () {
    return yield this.store.findAll('location')
  }

  @dropTask fetchJobRolesTask = function* () {
    return yield this.store.findAll('job-role')
  }

  @computed('github', 'linkedin', 'stackoverflow', 'portfolio')
  get links() {
    const github = this.github
    const linkedin = this.linkedin
    const stackoverflow = this.stackoverflow
    const portfolio = this.portfolio

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
