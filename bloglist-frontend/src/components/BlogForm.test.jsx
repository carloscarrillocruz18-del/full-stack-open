import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('título del blog')
  const authorInput = screen.getByPlaceholderText('autor del blog')
  const urlInput = screen.getByPlaceholderText('url del blog')
  const sendButton = screen.getByText('crear')

  await user.type(titleInput, 'Testing forms with react-testing-library')
  await user.type(authorInput, 'Carlos Carrillo')
  await user.type(urlInput, 'https://fullstackopen.com/')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing forms with react-testing-library')
  expect(createBlog.mock.calls[0][0].author).toBe('Carlos Carrillo')
  expect(createBlog.mock.calls[0][0].url).toBe('https://fullstackopen.com/')
})