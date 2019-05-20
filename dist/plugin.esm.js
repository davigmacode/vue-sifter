import format from 'date-fns/format';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import numeral from 'numeral';
import capitalize from 'lodash/capitalize';
import uppercase from 'lodash/toUpper';
import lowercase from 'lodash/toLower';
import kebabcase from 'lodash/kebabCase';
import deburr from 'lodash/deburr';

/**
 * format date to string
 *
 * @param {val}
 * @param {template}
 * @return {string}
 */
var date = function (val, template) {
  template = template || 'MMM Do YYYY, h:mm a';
  return template === 'relative' ? distanceInWordsToNow(val) : format(val, template)
};

/**
 * Format number
 *
 * @param number val: value of the number
 * @param string teamplate: template to format the number
 */
var number = function (val, template) {
  if ( template === void 0 ) template = '0,0';

  var predefined = {
    abbr: '0[.]0a',
    byte: '0[.]00b'
  };
  return numeral(val).format(predefined[template] ? predefined[template] : template)
};

var slugify = function (val) {
  return kebabcase(deburr(val))
};

var string = {
  capitalize: capitalize,
  uppercase: uppercase,
  lowercase: lowercase,
  kebabcase: kebabcase,
  slugify: slugify,
  deburr: deburr,
};

var Filters = function Filters () {};

Filters.prototype.defaults = function defaults () {
  return {
    date: true,
    number: true,
    string: true
  }
};

Filters.prototype.install = function install (Vue, options) {
    if ( options === void 0 ) options = {};

  // merge defaults with options
  this.options = Object.assign(this.defaults(), options);

  // creates a instance method that can be used inside of a Vue component
  Vue.prototype.$filters = {};

  if (this.options.date) {
    Vue.prototype.$filters.date = date;
    Vue.filter('date', date);
  }

  if (this.options.number) {
    Vue.prototype.$filters.number = number;
    Vue.filter('number', number);
  }

  if (this.options.string) {
    Object.keys(string).forEach(function (key) {
      Vue.prototype.$filters[key] = string[key];
      Vue.filter(key, string[key]);
    });
  }
};

var index = new Filters();

export default index;
