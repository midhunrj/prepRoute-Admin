import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TestTypeTabs from '../testTypeTabs'

const tabs = ['Chapter Wise', 'PYQ', 'Mock Test']

describe('TestTypeTabs', () => {
  it('renders all tab labels', () => {
    render(<TestTypeTabs tabs={tabs} activeTab="PYQ" onChange={vi.fn()} />)
    tabs.forEach((tab) => {
      expect(screen.getByText(tab)).toBeInTheDocument()
    })
  })

  it('calls onChange when a tab is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TestTypeTabs tabs={tabs} activeTab="Chapter Wise" onChange={onChange} />)

    await user.click(screen.getByText('Mock Test'))
    expect(onChange).toHaveBeenCalledWith('Mock Test')
  })

  it('applies active styling to the active tab', () => {
    render(<TestTypeTabs tabs={tabs} activeTab="PYQ" onChange={vi.fn()} />)
    const activeButton = screen.getByText('PYQ')
    expect(activeButton.className).toContain('border-[#384EC7]')
    expect(activeButton.className).toContain('text-[#384EC7]')
  })

  it('applies inactive styling to non-active tabs', () => {
    render(<TestTypeTabs tabs={tabs} activeTab="PYQ" onChange={vi.fn()} />)
    const inactiveButton = screen.getByText('Chapter Wise')
    expect(inactiveButton.className).toContain('border-transparent')
    expect(inactiveButton.className).toContain('text-slate-500')
  })
})
