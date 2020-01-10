import Component from '@ember/component';
import { action } from '@ember/object';
import { dropTask } from 'ember-concurrency-decorators';

export default class ProjectListComponent extends Component {
  showValidationMessages = false

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

  @dropTask saveRecordTask = function* () {
    if (this.editingRecord.validations.isInvalid) {
      this.set('showValidationMessages', true)
      return
    }

    yield this.get('editingRecord').save()

    this.set('showEditModal', false)
    this.set('newRecord', null)
  }

  @action
  deleteRecord() {
    this.get('editingRecord').destroyRecord()
      .then(r => {
        this.set('showEditModal', false)
      })
  }

  willDestroyElement() {
    this._super(...arguments)
    if (this.newRecord) {
      this.newRecord.destroyRecord()
    }
  }
}
