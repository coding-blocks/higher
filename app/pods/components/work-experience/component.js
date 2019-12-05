import Component from '@ember/component';
import { action } from '@ember/object';

export default class RecordComponent extends Component {
  @action 
  getNewWorkExperience() {
    if(!this.newRecord) {
      const newRecord = this.get('getNewRecord')('work-experience', { type:"intern" })
      this.set('newRecord', newRecord)
    }
    this.set('editingRecord', this.newRecord)
    this.set('showEditModal', true)
  }

  @action 
  setEditingRecord(workExperience) {
    this.set('editingRecord', workExperience)
    this.set('showEditModal', true)
  }

  @action
  saveRecord() {
    this.set('error', null)
    this.get('editingRecord').save()
    .then(r => {
      this.set('showEditModal', false)
      this.set('newRecord', null)
    })
    .catch(err => {
      this.set('error', err)
    })
  }

  @action
  deleteRecord() {
    this.get('editingRecord').destroyRecord()
      .then(r => {
        this.set('showEditModal', false)
      })
  }
}
