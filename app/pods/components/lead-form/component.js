import Component from '@ember/component';
import { action } from '@ember/object';
import { restartableTask } from 'ember-concurrency-decorators';

export default class LeadFormComponent extends Component {
  error = null
  showStatus = false
  showEmptyLabels = false

  @restartableTask
  saveLeadTask = function *() {
    this.set('error', null)
    this.set('showStatus', false)
    const lead = this.get('lead')

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
