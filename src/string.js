import capitalize from 'lodash/capitalize'
import uppercase from 'lodash/toUpper'
import lowercase from 'lodash/toLower'
import kebabcase from 'lodash/kebabCase'
import deburr from 'lodash/deburr'

const slugify = (val) => {
  return kebabcase(deburr(val))
}

export default {
  capitalize,
  uppercase,
  lowercase,
  kebabcase,
  slugify,
  deburr,
}