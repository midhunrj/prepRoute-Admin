import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StatusBar from '../statusBar'

describe('StatusBar', () => {
  it('renders "Test created" badge', () => {
    render(<StatusBar totalQuestions={50} />)
    expect(screen.getByText('Test created')).toBeInTheDocument()
  })

  it('displays the total questions count', () => {
    render(<StatusBar totalQuestions={25} />)
    expect(screen.getByText('All 25 Questions done')).toBeInTheDocument()
  })

  it('updates when totalQuestions changes', () => {
    const { rerender } = render(<StatusBar totalQuestions={10} />)
    expect(screen.getByText('All 10 Questions done')).toBeInTheDocument()

    rerender(<StatusBar totalQuestions={100} />)
    expect(screen.getByText('All 100 Questions done')).toBeInTheDocument()
  })
})
