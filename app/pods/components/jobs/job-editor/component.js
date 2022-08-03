import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default class JobsEditorComponent extends Component {
  @service store
  @service toast
  @service api

  ctcStart = 0
  ctcEnd = 40
  today = new Date()
  maxEndYear = +moment().format('YYYY') + 6
  selectedFresherBranches = []

  @alias('fetchCompaniesTask.lastSuccessful.value') companies
  @alias('fetchLocationsTask.lastSuccessful.value') locations
  @alias('fetchJobRolesTask.lastSuccessful.value') jobRoles
  @alias('fetchBranchesTask.lastSuccessful.value') branches
  @alias('fetchSkillsTask.lastSuccessful.value') skills

  jobTypes = ['fulltime', 'internship', 'parttime']

  didReceiveAttrs() {
    this._super(...arguments)
    this.fetchCompaniesTask.perform()
    this.fetchLocationsTask.perform()
    this.fetchJobRolesTask.perform()
    this.fetchBranchesTask.perform()
    this.fetchSkillsTask.perform()
  }

  @dropTask fetchBranchesTask = function* () {
    const branches = yield this.api.request('/branches/oneauth-branches')
    this.setSelectedFresherBranches()
    return branches
  }

  @dropTask fetchCompaniesTask = function* () {
    return yield this.store.findAll('company')
  }

  @dropTask fetchLocationsTask = function* () {
    return yield this.store.findAll('location')
  }

  @dropTask fetchJobRolesTask = function* () {
    return yield this.store.findAll('job-role')
  }

  @dropTask fetchSkillsTask = function* () {
    return yield this.store.findAll('skill')
  }

  @dropTask saveJobTask = function* () {
    try {
      yield this.setFresherBranches()

      if (this.job.validations.isInvalid) {
        this.toast.error(this.job.validations.message)
        return
      }

      const formJSON = this.job.formJSON
      for (var key in formJSON) {
        delete formJSON[key].editingMode
      }
      this.job.set('form', JSON.stringify(formJSON))

      yield this.job.save()

      this.toast.success('Job saved successfully')
    } catch (err) {
      console.error(err)
      this.toast.error('Error saving job')
    }

  }

  branchIncludedChecker([searchArray, toSearch]) {
    return !isEmpty(searchArray.findBy('oneauthId', toSearch.id))
  }

  async setFresherBranches() {
    const existingFresherBranches = await this.job.get('fresherBranches')
    const updatedFresherBranches = this.selectedFresherBranches.map(async (branch) => {
      const existingFresherBranch = existingFresherBranches.findBy('oneauthId', branch.id)
      if (isEmpty(existingFresherBranch)) {
        const newBranch = await this.store.createRecord('branch', {
          name: branch.name,
          oneauthId: branch.id
        })

        return newBranch
      }
      return existingFresherBranch
    })
    this.job.set('fresherBranches', await Promise.all(updatedFresherBranches))
  }

  async setSelectedFresherBranches() {
    const existingFresherBranches = await this.job.get('fresherBranches')
    const oneauthBranches = this.get('branches')
    this.set('selectedFresherBranches', existingFresherBranches.map(branch => {
      return oneauthBranches.findBy('id', branch.oneauthId)
    }))
  }

  @action
  showCreateLocationWhen(term) {
    let existingOption = this.locations.find(({ name }) => name.toLowerCase() === term.toLowerCase());
    return !existingOption;
  }

  @action
  async onCreateLocation(location) {
    const newLocation = await this.store.createRecord('location', {
      name: location
    }).save()
    this.job.locations.pushObject(newLocation)
  }
  
  @action
  showCreateJobRoleWhen(term) {
    let existingOption = this.jobRoles.find(({ name }) => name.toLowerCase() === term.toLowerCase());
    return !existingOption;
  }

  @action
  async onCreateJobRole(jobRole) {
    const newJobRole = await this.store.createRecord('jobRole', {
      name: jobRole
    }).save()
    this.job.jobRoles.pushObject(newJobRole)
  }

  @action
  showCreateSkillWhen(term) {
    let existingOption = this.skills.find(({ name }) => name.toLowerCase() === term.toLowerCase());
    return !existingOption;
  }

  @action
  async onCreateSkill(skill) {
    const newSkill = await this.store.createRecord('skill', {
      name: skill
    }).save()
    this.job.skills.pushObject(newSkill)
  }

  @action
  preventDefault(e) {
    e.preventDefault()
  }

  @action
  removeFresherBranch(branch) {
    this.selectedFresherBranches.removeObject(branch)
  }

  @action
  removeJobRole(jobRole) {
    this.job.jobRoles.removeObject(jobRole)
  }

  @action
  removeLocation(location) {
    this.job.locations.removeObject(location)
  }

  @action
  removeSkill(skill) {
    this.job.skills.removeObject(skill)
  }
}
