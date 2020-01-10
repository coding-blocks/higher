import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, action } from '@ember/object';
import { alias } from '@ember/object/computed';
import ENV from 'hiring-front/config/environment'
import { dropTask } from 'ember-concurrency-decorators';

export default class SkillSelectorComponent extends Component {
  @service store

  @alias ('fetchSkillsTask.lastSuccessful.value') skills

  showSkillTestError = false
  skillTestErrorMsg = ''
  
  didReceiveAttrs() {
    this._super(...arguments) 
    this.fetchSkillsTask.perform()
  }

  @dropTask fetchSkillsTask = function *() {
    return yield this.store.query('skill', { filter: { status: 'published' } })
  }

  @computed('profile')
  get verifiedApplicantProfileSkills() {
    return this.profile.applicantProfileSkills.filter(skill => skill.verified)
  }

  @computed('profile')
  get unverifiedApplicantProfileSkills() {
    return this.profile.applicantProfileSkills.filter(skill => !skill.verified)
  }

  @action
  takeTest(applicantProfileSkill) {
    this.set('showSkillTestError', false)
    this.set('skillTestErrorMsg', '')
    this.store.queryRecord('applicant-profile-skill', {
      custom: {
        ext: 'url',
        url: `${applicantProfileSkill.get('id')}/take-test`
      }
    }).then(result => {
      window.location = ENV.HACKER_BLOCKS_PUBLIC_URL + '/app/contests/' + result.hackerBlocksContestId
    }).catch(err => {
      if (err.errors[0].status == '400') {
        this.set('showSkillTestError', true)
        this.set('skillTestErrorMsg', `You have given all tests for ${applicantProfileSkill.skill.get('name')} skill.`)
      }
    })
  }
}
