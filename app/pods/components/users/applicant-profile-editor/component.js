import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';

export default class ApplicantProfileEditor extends Component {
  @service store
  @service currentUser

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
    this.fetchLocationsTask.perform()
    this.fetchJobRolesTask.perform()

    if (this.applicantProfile.get('links')) {
      const links = JSON.parse(this.applicantProfile.get('links'))
      Object.keys(links).map(siteName => this.set(siteName, links[siteName]))
    }
  }

  @restartableTask fetchLocationsTask = function* () {
    const locations = yield this.store.findAll('location')
    this.set('locations', locations)
  }

  @restartableTask fetchJobRolesTask = function* () {
    const jobRoles = yield this.store.findAll('job-role')
    this.set('jobRoles', jobRoles)
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
