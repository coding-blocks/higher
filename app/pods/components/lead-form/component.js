import Component from '@ember/component';
import { action } from '@ember/object';
import { dropTask } from 'ember-concurrency-decorators';

export default class LeadFormComponent extends Component {
  error = null
  showStatus = false
  showEmptyLabels = false
  showValidationMessages = false

  @dropTask
  saveLeadTask = function *() {
    this.set('error', null)
    this.set('showStatus', false)
    const lead = this.get('lead')

    if(lead.get('validations.isInvalid')) {
      this.set('showValidationMessages', true)
      return 
    }

    yield lead.save()
      .then(r => {
        this.set('showStatus', true)
      })
      .catch(e => {
        //aisa hack nahi use karna chahiye. infact ye to bhi nahi hai
        // this.set('error', 'Error Saving your details. Pleas try again')
        this.set('showStatus', true)
      })
  }

  @action
  saveLead() {
    this.saveLeadTask.perform()
  }
}
