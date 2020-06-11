/**
 * Generate pagination.
 * @param {number} current Current page.
 * @param {number} last Last page.
 * @param {number} width width.
 * @returns {Array} Returns array of pages.
 */

const paginationGenerator = (current, last, width = 2) => {
  const left = current - width
  const right = current + width + 1
  const range = []
  const rangeWithDots = []
  let l

  for (let i = 1; i <= last; i += 1) {
    if (i === 1 || i === last || (i >= left && i <= right)) {
      range.push(i)
    } else if (i < left) {
      i = left - 1
    } else if (i > right) {
      range.push(last)
      break
    }
  }

  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  })

  return rangeWithDots
}

export default {
  methods: {
    paginationGenerator
  }
}
