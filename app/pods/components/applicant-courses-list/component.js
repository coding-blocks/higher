import Component from '@ember/component';

export default class ApplicantCourseList extends Component {
  didReceiveAttrs() {
    const courses = this.get('courses')
    const onlineCBCourses = courses.filter(course => course.organizationType === 'codingblocks' && course.courseMode === 'online')
    const offlineCBCourses = courses.filter(course => course.organizationType === 'codingblocks' && course.courseMode === 'offline')
    const otherCourses = courses.filter(course => course.organizationType === 'other')

    this.set('onlineCBCourses', onlineCBCourses)
    this.set('offlineCBCourses', offlineCBCourses)
    this.set('otherCourses', otherCourses)

  }
}
