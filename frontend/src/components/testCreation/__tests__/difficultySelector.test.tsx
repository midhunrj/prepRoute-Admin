import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DifficultySelector from '../difficultySelector'

describe('DifficultySelector', () => {
  it('renders all difficulty levels', () => {
    render(<DifficultySelector value="easy" onChange={vi.fn()} />)
    expect(screen.getByText('easy')).toBeInTheDocument()
    expect(screen.getByText('medium')).toBeInTheDocument()
    expect(screen.getByText('hard')).toBeInTheDocument()
  })

  it('checks the radio for the current value', () => {
    render(<DifficultySelector value="medium" onChange={vi.fn()} />)
    const radios = screen.getAllByRole('radio')
    expect(radios[0]).not.toBeChecked() // easy
    expect(radios[1]).toBeChecked() // medium
    expect(radios[2]).not.toBeChecked() // hard
  })

  it('calls onChange with the clicked difficulty level', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DifficultySelector value="easy" onChange={onChange} />)

    await user.click(screen.getByText('hard'))
    expect(onChange).toHaveBeenCalledWith('hard')
  })

  it('renders the Difficulty label', () => {
    render(<DifficultySelector value="easy" onChange={vi.fn()} />)
    expect(screen.getByText('Difficulty')).toBeInTheDocument()
  })
})
