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
  showSkillSelectorModal = false
  skillTestErrorMsg = ''
  
  didReceiveAttrs() {
    this._super(...arguments) 
    this.fetchSkillsTask.perform()
  }

  @action
  preventDefault(e) {
    e.preventDefault()
  }

  @action 
  removeSkill(skill) {
    this.profile.skills.removeObject(skill);
  }

  @computed('profile.applicantProfileSkills')
  get verifiedApplicantProfileSkills() {
    return this.profile.applicantProfileSkills.filter(aps => aps.verified && aps.skill.get('isVerifiable'))
  }

  @computed('profile.applicantProfileSkills')
  get unverifiedApplicantProfileSkills() {
    return this.profile.applicantProfileSkills.filter(aps => !aps.verified || !aps.skill.get('isVerifiable'))
  }

  @dropTask fetchSkillsTask = function *() {
    return yield this.store.query('skill', { filter: { "status =": 'published' } })
  }

  @dropTask saveSkillsTask = function *() {
    try {
      yield this.saveApplicantProfileTask.perform(2)
      let newApplicantProfileSkills = yield this.store.query('applicant-profile-skill', {
        custom: {
          ext: 'url',
          url: `${this.profile.id}/applicant-profile`
        }
      })
      
      this.set('profile.applicantProfileSkills', newApplicantProfileSkills)

    } catch(err) {
      console.log(err)
    }
    this.set('showSkillSelectorModal', false)
  }

  @dropTask takeTestTask = function *(applicantProfileSkill) {
    try {
      this.set('showSkillTestError', false)
      this.set('skillTestErrorMsg', '')
      let newApplicantProfileSkill = yield this.store.queryRecord('applicant-profile-skill', {
        custom: {
          ext: 'url',
          url: `${applicantProfileSkill.get('id')}/take-test`
        }
      })

      window.location = ENV.HACKER_BLOCKS_PUBLIC_URL + '/app/contests/' + newApplicantProfileSkill.hackerBlocksContestId
    } catch(err) {
      if (err.errors[0].status == '400') {
        this.set('showSkillTestError', true)
        this.set('skillTestErrorMsg', `You have given all tests for ${applicantProfileSkill.skill.get('name')} skill.`)
      }
    }
  }
}
