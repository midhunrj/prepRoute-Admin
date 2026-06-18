import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PreviewFooter from '../previewFooter'

describe('PreviewFooter', () => {
  it('renders Cancel and Confirm buttons', () => {
    render(<PreviewFooter onCancel={vi.fn()} onConfirm={vi.fn()} publishing={false} />)
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('shows Publishing... when publishing is true', () => {
    render(<PreviewFooter onCancel={vi.fn()} onConfirm={vi.fn()} publishing={true} />)
    expect(screen.getByText('Publishing...')).toBeInTheDocument()
    expect(screen.queryByText('Confirm')).not.toBeInTheDocument()
  })

  it('disables Confirm button when publishing', () => {
    render(<PreviewFooter onCancel={vi.fn()} onConfirm={vi.fn()} publishing={true} />)
    expect(screen.getByText('Publishing...')).toBeDisabled()
  })

  it('calls onCancel when Cancel is clicked', async () => {
    const user = userEvent.setup()
    const onCancel = vi.fn()
    render(<PreviewFooter onCancel={onCancel} onConfirm={vi.fn()} publishing={false} />)

    await user.click(screen.getByText('Cancel'))
    expect(onCancel).toHaveBeenCalledOnce()
  })

  it('calls onConfirm when Confirm is clicked', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    render(<PreviewFooter onCancel={vi.fn()} onConfirm={onConfirm} publishing={false} />)

    await user.click(screen.getByText('Confirm'))
    expect(onConfirm).toHaveBeenCalledOnce()
  })
})
