import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PublishModal from '../publishModal'

const defaultProps = {
  test: { subject: 'Mathematics' },
  publishing: false,
  onClose: vi.fn(),
  onPublish: vi.fn(),
}

describe('PublishModal', () => {
  it('renders the modal with test subject', () => {
    render(<PublishModal {...defaultProps} />)
    expect(screen.getByText('Publish Test')).toBeInTheDocument()
    expect(screen.getByText('Mathematics')).toBeInTheDocument()
  })

  it('renders duration radio options', () => {
    render(<PublishModal {...defaultProps} />)
    expect(screen.getByText('Always Available')).toBeInTheDocument()
    expect(screen.getByText('1 Week')).toBeInTheDocument()
    expect(screen.getByText('2 Weeks')).toBeInTheDocument()
    expect(screen.getByText('1 Month')).toBeInTheDocument()
  })

  it('shows Confirm button when not publishing', () => {
    render(<PublishModal {...defaultProps} />)
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('shows Publishing... button when publishing', () => {
    render(<PublishModal {...defaultProps} publishing={true} />)
    expect(screen.getByText('Publishing...')).toBeInTheDocument()
  })

  it('calls onClose when Cancel is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<PublishModal {...defaultProps} onClose={onClose} />)

    await user.click(screen.getByText('Cancel'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onPublish when Confirm is clicked', async () => {
    const user = userEvent.setup()
    const onPublish = vi.fn()
    render(<PublishModal {...defaultProps} onPublish={onPublish} />)

    await user.click(screen.getByText('Confirm'))
    expect(onPublish).toHaveBeenCalledOnce()
  })

  it('calls onClose when close button (x) is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<PublishModal {...defaultProps} onClose={onClose} />)

    await user.click(screen.getByText('\u00d7'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when backdrop is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const { container } = render(<PublishModal {...defaultProps} onClose={onClose} />)

    const backdrop = container.firstElementChild as HTMLElement
    await user.click(backdrop)
    expect(onClose).toHaveBeenCalled()
  })

  it('does not call onClose when modal content is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<PublishModal {...defaultProps} onClose={onClose} />)

    await user.click(screen.getByText('Mathematics'))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('disables Confirm button when publishing', () => {
    render(<PublishModal {...defaultProps} publishing={true} />)
    expect(screen.getByText('Publishing...')).toBeDisabled()
  })
})
