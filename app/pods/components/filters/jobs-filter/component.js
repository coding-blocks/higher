import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { dropTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class JobsFilter extends Component {
  @service store

  @alias('fetchLocationsTask.lastSuccessful.value') locations
  @alias('fetchJobRolesTask.lastSuccessful.value') jobRoles

  showModal = false
  jobTypes = ['fulltime', 'internship', 'parttime']
  selectedLocations = []
  selectedJobRoles = []
  selectedJobTypes = []

  didReceiveAttrs() {
    this._super(...arguments)

    this.fetchLocationsTask.perform()
    this.fetchJobRolesTask.perform()
  }

  @dropTask fetchLocationsTask = function* () {
    return yield this.store.findAll('location')
  }

  @dropTask fetchJobRolesTask = function* () {
    return yield this.store.findAll('job-role')
  }

  @action
  applyFilters() {
    this.onApplyFilter()
    this.set('showModal', false)
  }

  @action
  clearAllFilters() {
    this.set('selectedLocations', [])
    this.set('selectedJobRoles', [])
    this.set('selectedJobTypes', [])

    delete this.filter.locations
    delete this.filter.roles
    delete this.filter.types

    this.onApplyFilter()
    this.set('showModal', false)
  }

  @action
  preventDefault(e) {
    e.preventDefault()
  }

  @action
  removeJobRole(jobRole) {
    let jobRoles = this.filter.roles.split(',')
    jobRoles.splice(jobRoles.indexOf(jobRole.id), 1)
    if (jobRoles.length) {
      this.filter.roles = jobRoles.join(',')
    } else {
      delete this.filter.roles
    }
    this.selectedJobRoles.removeObject(jobRole)
  }

  @action
  removeLocation(location) {
    let locations = this.filter.locations.split(',')
    locations.splice(locations.indexOf(location.id), 1)
    if (locations.length) {
      this.filter.locations = locations.join(',')
    } else {
      delete this.filter.locations
    }
    this.selectedLocations.removeObject(location)
  }

  @action
  setJobRoles(jobRoles) {
    if (!jobRoles.length) {//coz power select passes all the selected elements
      delete this.filter.jobRoles
      return
    }
    this.set('selectedJobRoles', jobRoles)
    let jobRoleIds = jobRoles.map(_ => _.id)
    this.set('filter.roles', jobRoleIds.join(','))
  }

  @action
  setJobTypes(jobType) {
    const selectedJobTypes = this.selectedJobTypes
    if(selectedJobTypes.includes(jobType)) {
      selectedJobTypes.splice(selectedJobTypes.indexOf(jobType), 1)
    } else {
      selectedJobTypes.push(jobType)
    }

    if(selectedJobTypes.length) {
      this.filter.types = selectedJobTypes.join(',')  
    } else {
      delete this.filter.types
    }

    this.set('selectedJobTypes', selectedJobTypes)
  }

  @action
  setLocations(locations) {
    if (!locations.length) {//coz power select passes all the selected elements
      delete this.filter.locations
      return
    }
    this.set('selectedLocations', locations)
    let locationsIds = locations.map(_ => _.id)
    this.set('filter.locations', locationsIds.join(','))
  }
}
