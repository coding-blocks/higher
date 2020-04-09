import Component from '@ember/component';
import { action } from '@ember/action';

export default class ApplicantCourseList extends Component {
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

  @action addNewCourse(organizationType) {
    this.set('showAddNewCourseModel', true)
  }
}
