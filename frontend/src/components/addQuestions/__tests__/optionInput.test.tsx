import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import OptionInput from '../optionInput'

describe('OptionInput', () => {
  const defaultProps = {
    label: 'A',
    value: 'Option text',
    checked: false,
    onCheck: vi.fn(),
    onChange: vi.fn(),
  }

  it('renders label and value', () => {
    render(<OptionInput {...defaultProps} />)
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Option text')).toBeInTheDocument()
  })

  it('renders radio as unchecked when checked=false', () => {
    render(<OptionInput {...defaultProps} checked={false} />)
    expect(screen.getByRole('radio')).not.toBeChecked()
  })

  it('renders radio as checked when checked=true', () => {
    render(<OptionInput {...defaultProps} checked={true} />)
    expect(screen.getByRole('radio')).toBeChecked()
  })

  it('calls onCheck when radio is clicked', async () => {
    const user = userEvent.setup()
    const onCheck = vi.fn()
    render(<OptionInput {...defaultProps} onCheck={onCheck} />)

    await user.click(screen.getByRole('radio'))
    expect(onCheck).toHaveBeenCalledOnce()
  })

  it('calls onChange when text input value changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<OptionInput {...defaultProps} onChange={onChange} />)

    const input = screen.getByDisplayValue('Option text')
    await user.clear(input)
    await user.type(input, 'New text')
    expect(onChange).toHaveBeenCalled()
  })

  it('renders placeholder text', () => {
    render(<OptionInput {...defaultProps} value="" />)
    expect(screen.getByPlaceholderText('Enter option')).toBeInTheDocument()
  })
})
