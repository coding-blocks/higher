import Component from '@ember/component';
import { action } from '@ember/object';

export default class ProjectListComponent extends Component {
  @action
  getNewProject() {
    if (!this.newRecord) {
      const newRecord = this.get('getNewRecord')('project')
      this.set('newRecord', newRecord)
    }
    this.set('editingRecord', this.newRecord)
    this.set('showEditModal', true)
  }

  @action
  setEditingRecord(Record) {
    this.set('editingRecord', Record)
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
