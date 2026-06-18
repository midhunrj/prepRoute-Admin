import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NumberStepper from '../numberStepper'

describe('NumberStepper', () => {
  it('renders label and value', () => {
    render(<NumberStepper label="Total Time" value={60} onChange={vi.fn()} />)
    expect(screen.getByText('Total Time')).toBeInTheDocument()
    expect(screen.getByDisplayValue('60')).toBeInTheDocument()
  })

  it('calls onChange with incremented value when up arrow clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberStepper label="Score" value={10} onChange={onChange} />)

    await user.click(screen.getByText('▲'))
    expect(onChange).toHaveBeenCalledWith(11)
  })

  it('calls onChange with decremented value when down arrow clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberStepper label="Score" value={10} onChange={onChange} />)

    await user.click(screen.getByText('▼'))
    expect(onChange).toHaveBeenCalledWith(9)
  })

  it('calls onChange when input value is typed', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberStepper label="Score" value={10} onChange={onChange} />)

    const input = screen.getByDisplayValue('10')
    await user.clear(input)
    await user.type(input, '25')
    expect(onChange).toHaveBeenCalled()
  })
})
