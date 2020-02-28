import Component from '@ember/component';
import { action } from '@ember/object';
import { dropTask } from 'ember-concurrency-decorators'; 
import { inject as service } from '@ember/service';

export default class ApplicantCoursesList extends Component {
  @service store
  @service currentUser
  
  editMode = false
  showAddNewCourseModal = false

  didReceiveAttrs() {
    const courses = this.get('courses')
    const onlineCBCourses = courses.filter(course => course.organizationType === 'codingblocks' && course.courseMode === 'online')
    const offlineCBCourses = courses.filter(course => course.organizationType === 'codingblocks' && course.courseMode === 'offline')
    const otherCourses = courses.filter(course => course.organizationType === 'other')

    this.set('onlineCBCourses', onlineCBCourses)
    this.set('offlineCBCourses', offlineCBCourses)
    this.set('otherCourses', otherCourses)
  }

  getNewApplicantCourse(organizationType) {
    return this.get('getNewRecord')('applicant-course', {
      isVerified: false,
      courseMode: 'offline',
      organizationName: organizationType === 'codingblocks' ? 'Coding Blocks' : null,
      organizationType
    })
  }

  @action 
  addNewCourse(organizationType) {
    const newApplicantCourse = this.getNewApplicantCourse(organizationType)
    this.set('editingRecord', newApplicantCourse)
    this.set('showAddNewCourseModal', true)
  }

  @action 
  onAfterSave() {
    this.set('showAddNewCourseModal', false)
  }

  @action 
  onCloseModal() {
    const editingRecord = this.editingRecord
    if(editingRecord.hasDirtyAttributes) {
      this.courses.removeObject(editingRecord)
      editingRecord.rollbackAttributes()
    }
    this.set('showAddNewCourseModal', false)
  }

  @dropTask syncOnlineCoursesTask = function* () {
    const applicantProfile = yield this.currentUser.getApplicantProfile()
    let applicantCourses = yield this.store.query('applicant-course', {
      custom: {
        ext: 'url',
        url: `applicant-profile/${applicantProfile.id}/get-onlinecb-courses`
      }
    })

    applicantCourses.map(ac => ac.set('applicantProfile', applicantProfile))
  }
}
