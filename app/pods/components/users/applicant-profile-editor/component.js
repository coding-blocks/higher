import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import moment from 'moment';

export default class ApplicantProfileEditor extends Component {
  @service store
  @service currentUser

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

}
