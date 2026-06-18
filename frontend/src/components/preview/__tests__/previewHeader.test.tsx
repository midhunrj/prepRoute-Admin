import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PreviewHeader from '../previewHeader'

describe('PreviewHeader', () => {
  it('renders status badges', () => {
    render(<PreviewHeader onPublish={vi.fn()} />)
    expect(screen.getByText('Test Created')).toBeInTheDocument()
    expect(screen.getByText('All Questions Added')).toBeInTheDocument()
  })

  it('renders Publish button', () => {
    render(<PreviewHeader onPublish={vi.fn()} />)
    expect(screen.getByText('Publish')).toBeInTheDocument()
  })

  it('calls onPublish when Publish button is clicked', async () => {
    const user = userEvent.setup()
    const onPublish = vi.fn()
    render(<PreviewHeader onPublish={onPublish} />)

    await user.click(screen.getByText('Publish'))
    expect(onPublish).toHaveBeenCalledOnce()
  })
})
