import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class EducationalQualificationListComponent extends Component {
  @service store

  showValidationMessages = false

  @action
  getNewEducationalQualification() {
    if (!this.newRecord) {
      const newRecord = this.get('getNewRecord')('educational-qualification')
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
  onSaveRecord() {
    this.set('newRecord', null)
    this.set('showEditModal', false)
  }

  @action
  onDeleteRecord() {
    this.set('newRecord, null')
    this.set('showEditModal', false)
  }

  @action
  setEditingRecord(Record) {
    this.set('editingRecord', Record)
    this.set('showEditModal', true)
  }
}
