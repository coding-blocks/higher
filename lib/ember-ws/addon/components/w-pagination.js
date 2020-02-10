import Component from '@ember/component';
import layout from '../templates/components/w-pagination';
import { computed, action } from '@ember/object';
import { alias, equal } from '@ember/object/computed';

export default class WPaginationComponent extends Component {
  layout = layout
  limit = 4
  offset = 0
  presentationComponent = null

  @alias('count') totalCount

  @equal('offset', 0) prevDisabled

  @computed('offset') 
  get page() {
    return this.offset / this.limit + 1
  }

  @computed('nextOffset', 'totalCount')
  get nextDisabled() {
    let nextOffset = +this.nextOffset
    let totalCount = +this.totalCount
    return nextOffset && nextOffset >= totalCount
  }

  @computed('offset', 'totalCount') 
  get range() {
    return {
      start: this.offset + 1,
      end: this.offset + this.limit
    }
  }

  @action
  onNext() {
    if(this.nextDisabled) {
      return
    }

    this.set('offset', this.nextOffset)
    this.onChange();
  }

  @action
  onPrev() {
    if (this.prevDisabled) {
      return
    }

    this.set('offset', this.prevOffset)
    this.onChange()
  }
}
