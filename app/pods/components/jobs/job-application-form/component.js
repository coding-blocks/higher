import Component from '@ember/component';
import { isEmpty } from '@ember/utils';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments) 
    if(isEmpty(Object.keys(this.form)) && !isEmpty(this.questions)) {
      this.questions.forEach(question => {
        this.form[question.name] = ''
      })
    }
  }
});
