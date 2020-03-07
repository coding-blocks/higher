import Component from '@ember/component';
import { action } from '@ember/object';

export default class ProjectListComponent extends Component {
  @action
  getNewProject() {
    if (!this.newRecord) {
      const newRecord = this.get('getNewRecord')('project', {
        links: JSON.stringify({})
      })
      this.set('newRecord', newRecord)
    }
    this.set('editingRecord', this.newRecord)
    this.set('showEditModal', true)
  }

  @action
  onCloseModal() {
    this.editingRecord.rollbackAttributes()
    this.set('newRecord', null)
    this.set('showEditModal', false)
  }

  @action
  setEditingRecord(Record) {
    Record.hasMany('screenshotUploads').reload()//why ember is not doing this?
    this.set('editingRecord', Record)
    this.set('showEditModal', true)
  }

  willDestroyElement() {
    this._super(...arguments)
    if (this.newRecord) {
      this.newRecord.destroyRecord()
    }
  }
}
