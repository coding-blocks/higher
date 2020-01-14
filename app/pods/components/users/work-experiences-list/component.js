import Component from '@ember/component';
import { action } from '@ember/object';
import { dropTask } from 'ember-concurrency-decorators';

export default class RecordComponent extends Component {
  showValidationMessages = false

  @action
  deleteRecord() {
    this.get('editingRecord').destroyRecord()
      .then(r => {
        this.set('showEditModal', false)
      })
  }

  @action
  getNewWorkExperience() {
    if (!this.newRecord) {
      const newRecord = this.get('getNewRecord')('work-experience', { type: "intern" })
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
  setEditingRecord(workExperience) {
    this.set('editingRecord', workExperience)
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

  willDestroyElement() {
    this._super(...arguments)
    if (this.newRecord) {
      this.newRecord.destroyRecord()
    }
  }
}
