import numeral from 'numeral'

/**
 * Format number
 *
 * @param number val: value of the number
 * @param string teamplate: template to format the number
 */
const number = (val, template = '0,0') => {
  let predefined = {
    abbr: '0[.]0a',
    byte: '0[.]00b'
  }
  return numeral(val).format(predefined[template] ? predefined[template] : template)
}

export default number
