import { describe, it, expect } from 'vitest'
import { getPaginationItems } from '../pagination'

describe('getPaginationItems', () => {
  it('returns all pages when totalPages <= 7', () => {
    expect(getPaginationItems(1, 1)).toEqual([1])
    expect(getPaginationItems(1, 5)).toEqual([1, 2, 3, 4, 5])
    expect(getPaginationItems(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('returns empty array when totalPages is 0', () => {
    expect(getPaginationItems(1, 0)).toEqual([])
  })

  it('includes ellipsis after page 1 when currentPage > 4 and totalPages > 7', () => {
    const result = getPaginationItems(6, 10)
    expect(result[0]).toBe(1)
    expect(result[1]).toBe('...')
  })

  it('does not include leading ellipsis when currentPage <= 4', () => {
    const result = getPaginationItems(3, 10)
    // No ellipsis between page 1 and the middle range
    expect(result[0]).toBe(1)
    expect(result[1]).toBe(2)
  })

  it('includes trailing ellipsis when currentPage < totalPages - 3', () => {
    const result = getPaginationItems(3, 10)
    const lastNum = result[result.length - 1]
    expect(lastNum).toBe(10)
    expect(result[result.length - 2]).toBe('...')
  })

  it('does not include trailing ellipsis when currentPage >= totalPages - 3', () => {
    const result = getPaginationItems(8, 10)
    // Last element is always the final page
    expect(result[result.length - 1]).toBe(10)
    // No ellipsis right before the last page
    expect(result[result.length - 2]).not.toBe('...')
  })

  it('always includes first and last page for large sets', () => {
    for (let page = 1; page <= 20; page++) {
      const result = getPaginationItems(page, 20)
      expect(result[0]).toBe(1)
      expect(result[result.length - 1]).toBe(20)
    }
  })

  it('includes pages around currentPage (currentPage-1, currentPage, currentPage+1)', () => {
    const result = getPaginationItems(5, 10)
    expect(result).toContain(4)
    expect(result).toContain(5)
    expect(result).toContain(6)
  })

  it('handles currentPage at the start', () => {
    const result = getPaginationItems(1, 10)
    expect(result[0]).toBe(1)
    expect(result).toContain(2)
    expect(result[result.length - 1]).toBe(10)
  })

  it('handles currentPage at the end', () => {
    const result = getPaginationItems(10, 10)
    expect(result[0]).toBe(1)
    expect(result).toContain(9)
    expect(result).toContain(10)
  })
})
