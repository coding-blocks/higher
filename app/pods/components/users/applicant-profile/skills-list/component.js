import Component from '@ember/component';
import { computed } from '@ember/object';

export default class SkillsListComponent extends Component {
  @computed('skills')
  get verifiedApplicantProfileSkills() {
    return this.skills.filter(aps => aps.verified && aps.skill.get('isVerifiable'))
  }

  @computed('skills')
  get unverifiedApplicantProfileSkills() {
    return this.skills.filter(aps => !aps.verified || !aps.skill.get('isVerifiable'))
  }
}
