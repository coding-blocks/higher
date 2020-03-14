import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { dropTask } from 'ember-concurrency-decorators';

export default class EducationalQualificationEditorComponent extends Component{
  @service store;

  @alias('fetchCollegesTask.lastSuccessful.value') colleges
  @alias('fetchBranchesTask.lastSuccessful.value') branches

  maxEndYear = +moment().format('YYYY') + 6
  seniorSecondaryStreams = ['Commerce', 'Science', 'Arts']

  @computed('educationalQualification.type') 
  get showSchoolInput() {
    return this.educationalQualification.type === 'x_secondary' || this.educationalQualification.type === 'xii_senior_secondary'
  }

  didReceiveAttrs() {
    this._super(...arguments)
    this.fetchCollegesTask.perform()
    this.fetchBranchesTask.perform()
  }

  @dropTask fetchBranchesTask = function* () {
    let branches = yield this.store.findAll('branch')
    return branches.map(c => c.name)
  }

  @dropTask fetchCollegesTask = function* () {
    let colleges = yield this.store.findAll('college')
    return colleges.map(c => c.name)
  }

  @dropTask saveRecordTask = function* () {
    if (this.educationalQualification.validations.isInvalid) {
      this.set('showValidationMessages', true)
      return
    }

    yield this.get('educationalQualification').save()

    this.onSaveRecord()
  }

  @action
  deleteRecord() {
    this.get('educationalQualification').destroyRecord()
      .then(r => {
        this.onDeleteRecord()
      })
  }

  willDestroyElement() {
    this._super(...arguments)
    if (this.newRecord) {
      this.newRecord.destroyRecord()
    }
  }
}

