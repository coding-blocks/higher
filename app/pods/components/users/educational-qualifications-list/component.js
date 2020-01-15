import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import moment from 'moment';
import { dropTask } from 'ember-concurrency-decorators';

export default class EducationalQualificationListComponent extends Component {
  @service store

  @alias ('fetchCollegesTask.lastSuccessful.value') colleges
  @alias ('fetchBranchesTask.lastSuccessful.value') branches

  maxEndYear = +moment().format('YYYY') + 6
  showValidationMessages = false

  didReceiveAttrs() {
    this._super(...arguments)
    this.fetchCollegesTask.perform()
    this.fetchBranchesTask.perform()
  }

  @action
  deleteRecord() {
    this.get('editingRecord').destroyRecord()
      .then(r => {
        this.set('showEditModal', false)
      })
  }

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
  setEditingRecord(Record) {
    this.set('editingRecord', Record)
    this.set('showEditModal', true)
  }

  @dropTask fetchBranchesTask = function *() {
    let branches = yield this.store.findAll('branch')
    return branches.map(c => c.name)
  }

  @dropTask fetchCollegesTask = function *() {
    let colleges = yield this.store.findAll('college')
    return colleges.map(c => c.name)
  }

  @dropTask saveRecordTask = function *() {
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
