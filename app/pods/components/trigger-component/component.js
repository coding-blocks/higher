import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import { get } from '@ember/object';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import layout from './template';
import { isBlank } from '@ember/utils';
import { htmlSafe } from '@ember/string';


export default class Trigger extends Component {
  layout = layout

  get triggerMultipleInputStyle() {
    scheduleOnce('actions', null, this.select.actions.reposition);
    return htmlSafe('width: 100%;');
  }

  @action
  handleInput(e) {
    if (this.onInput && this.onInput(e) === false) {
      return;
    }
    this.select.actions.open(e);
  }

  @action
  handleKeydown(e){
    if (e.target === null) return;
    if (this.onKeydown && this.onKeydown(e) === false) {
      e.stopPropagation();
      return false;
    }
    if (e.keyCode === 8) {
      e.stopPropagation();
      if (isBlank((e.target).value)) {
        let lastSelection = this.select.selected[this.select.selected.length - 1];
        if (lastSelection) {
          this.select.actions.select(this.buildSelection(lastSelection, this.select), e);
          if (typeof lastSelection === 'string') {
            this.select.actions.search(lastSelection);
          } else {
            assert('`<PowerSelectMultiple>` requires a `@searchField` when the options are not strings to remove options using backspace', this.searchField);
            this.select.actions.search(get(lastSelection, this.searchField));
          }
          this.select.actions.open(e);
        }
      }
    } else if (e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode === 32) { // Keys 0-9, a-z or SPACE
      e.stopPropagation();
    }
  }

  @action
  openChanged(_el, [isOpen]) {
    if (isOpen === false && this._lastIsOpen === true) {
      scheduleOnce('actions', null, this.select.actions.search, '');
    }
    this._lastIsOpen = isOpen;
  }

  @action
  chooseOption(e) {
    if (e.target === null) return;
    let selectedIndex = e.target.getAttribute('data-selected-index');
    if (selectedIndex) {
      let numericIndex = parseInt(selectedIndex, 10);
      e.stopPropagation();
      e.preventDefault();
      let object = this.selectedObject(this.select.selected, numericIndex);
      this.select.actions.choose(object);
    }
  }

  @action
  storeInputStyles(input) {
    let { fontStyle, fontVariant, fontWeight, fontSize, lineHeight, fontFamily } = window.getComputedStyle(input);
    this.inputFont = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
  }
}
