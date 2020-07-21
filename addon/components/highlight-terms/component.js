import Component from '@ember/component';
import layout from './template';
import { run } from '@ember/runloop';

const HighlightTerm = Component.extend({
  layout,
  classNames: ['highlight-terms'],

  didReceiveAttrs() {
    this._super(...arguments);
    var term = this.get('term');
    var options = this.getProperties('caseSensitive', 'wordsOnly');

    run.scheduleOnce('afterRender', this, function () {
      this.unhighlight();
      this.highlight(term, options);
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    this.unhighlight();
  },

  highlight(term, options) {
    if (term) {
      if (Array.isArray(term)) {
        term = term.reduce((all, item) => {
          if (item !== undefined) {
            if (Array.isArray(item)) {
              all = all.concat(...item);
            } else {
              all.push(item);
            }
          }

          return all;
        }, []);
      }

      if (window.$(this.element)) {
        window.$(this.element).highlight(term, options);
      }
    }
  },

  unhighlight() {
    let $el = window.$(this.element);
    
    if ($el && typeof $el.unhighlight === 'function') {
      $el.unhighlight();
    }
  }
});

HighlightTerm.reopenClass({
  positionalParams: 'term'
});

export default HighlightTerm;
