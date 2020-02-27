import Component from '@ember/component';
import { action } from '@ember/object';

export default class ApplicantCoursesList extends Component {
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
}
