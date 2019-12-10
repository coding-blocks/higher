import Component from '@ember/component';
import { action } from '@ember/object';
import moment from 'moment';
import { restartableTask } from 'ember-concurrency-decorators';

export default class EducationalQualificationListComponent extends Component {
  currentYear = +moment().format('YYYY')

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
  setEditingRecord(Record) {
    this.set('editingRecord', Record)
    this.set('showEditModal', true)
  }

  @restartableTask saveRecordTask = function* () {
    this.set('error', null)

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
