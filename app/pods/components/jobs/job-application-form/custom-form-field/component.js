import Component from '@ember/component';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments)

    if (this.question.type === 'radio-group') {
      this.set('radioOptions', this.question.options.split(','))
    }
  }
});
