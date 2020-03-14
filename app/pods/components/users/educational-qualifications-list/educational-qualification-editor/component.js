import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { dropTask } from 'ember-concurrency-decorators';

export default class EducationalQualificationEditorComponent extends Component{
  @service store;
  @service api;

  @alias('fetchCollegesTask.lastSuccessful.value') colleges
  @alias('fetchBranchesTask.lastSuccessful.value') branches

  maxEndYear = +moment().format('YYYY') + 6
  seniorSecondaryStreams = [{name: 'Commerce'}, {name: 'Science'}, {name: 'Arts'}]
  selectedCollege = null
  selectedBranch = null

  didReceiveAttrs() {
    this._super(...arguments)

    this.fetchCollegesTask.perform()
    this.fetchBranchesTask.perform()

    if(!this.educationalQualification.isNew) {
      this.setSelectedCollege()
      this.setSelectedBranch()
    }
  }

  @dropTask fetchBranchesTask = function* () {
    return yield this.api.request('/branches/oneauth-branches')
  }

  @dropTask fetchCollegesTask = function* () {
    return yield this.api.request('/colleges/oneauth-colleges')
  }

  @dropTask saveRecordTask = function* () {
    const educationalQualification = this.educationalQualification
    if (educationalQualification.validations.isInvalid) {
      this.set('showValidationMessages', true)
      return
    }
    
    if(!educationalQualification.isForSchool) {
      this.setCollege() 
    }
    this.setBranchOrSubtitle() 

    yield this.get('educationalQualification').save()

    if (this.onSaveRecord) {
      this.onSaveRecord()
    }
  }

  setBranchOrSubtitle() {
    const educationalQualification = this.educationalQualification
    const selectedBranch = this.selectedBranch
  
    if (educationalQualification.get('isForSchool') ) {
      educationalQualification.set('subtitle', selectedBranch.name)
    } else {
      let newBranch = this.store.createRecord('branch', {
        name: selectedBranch.name,
        oneauthId: selectedBranch.id
      })
      educationalQualification.set('branch', newBranch)
      educationalQualification.set('subtitle', newBranch.name)
    }
  } 

  setCollege() {
    const educationalQualification = this.educationalQualification
    const selectedCollege = this.selectedCollege
    
    let newCollege = this.store.createRecord('college', {
      name: educationalQualification.isOtherCollege ? educationalQualification.title : selectedCollege.name,
      oneauthId: educationalQualification.isOtherCollege ? null : selectedCollege.id,
    })

    educationalQualification.set('college', newCollege)
    educationalQualification.set('title', newCollege.name)
  } 

  setSelectedBranch() {
    const educationalQualification = this.educationalQualification

    if(educationalQualification.isForSchool) {
      this.set('selectedBranch', { name: educationalQualification.subtitle })
    } else {
      this.set('selectedBranch', { 
        id: educationalQualification.get('branch.oneauthId'),
        name: educationalQualification.get('branch.name') 
      })
    }
  }

  setSelectedCollege() {
    const educationalQualification = this.educationalQualification

    if(!educationalQualification.isForSchool) {
      this.set('selectedCollege', { 
        id: educationalQualification.get('college.oneauthId'),
        name: educationalQualification.get('college.name') 
      })
    }
  }

  @action
  deleteRecord() {
    this.get('educationalQualification').destroyRecord()
      .then(r => {
        if (this.onDeleteRecord) {
          this.onDeleteRecord()
        }
      })
  }

  willDestroyElement() {
    this._super(...arguments)
    if (this.newRecord) {
      this.newRecord.destroyRecord()
    }
  }
}

