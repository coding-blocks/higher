import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed,action } from '@ember/object';

export default class SkillSelectorComponent extends Component {
  @service store
  
  async didReceiveAttrs() {
    const skills = await this.store.query('skill', { filter : { status: 'published'}})
    this.set('skills', skills)
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
    this.store.query('applicant-profile-skill', {
      custom: {
        ext: 'url',
        url: `${applicantProfileSkill.get('id')}/take-test`
      }
    }).then(result => {
      console.log('result form take test',result)
    }).catch(err => {
      console.log('error from take test', err)
    })
  }
}
