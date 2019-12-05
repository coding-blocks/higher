import Component from '@ember/component';
import { action } from '@ember/object';

export default class CheckboxSelectComponent extends Component {
  maxSelected = -1
  selected = []

  updateSelection(isChecked, value) {
    if (this.selected.length == this.maxSelected) {
      return
    }

    if (isChecked) {
      this.selected.push(value)
    } else {

    }
  }
}
