import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import Blog from './Blog'

test('renders content (title and author), but does not render url or likes by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti Luukkainen',
    url: 'https://fullstackopen.com/',
    likes: 5,
    user: {
      username: 'carloss',
      name: 'Carlos'
    }
  }

  const user = {
    username: 'carloss'
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library Matti Luukkainen'
  )

  const toggledContent = container.querySelector('.blog > div:nth-child(2)')
  expect(toggledContent).toHaveStyle('display: none')
})

test('blogs url, likes and user are shown when the button controlling visibility has been clicked', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti Luukkainen',
    url: 'https://fullstackopen.com/',
    likes: 5,
    user: {
      username: 'carloss',
      name: 'Carlos'
    }
  }

  const user = {
    username: 'carloss'
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const userSession = userEvent.setup()
  const button = screen.getByText('ver')
  await userSession.click(button)

  const toggledContent = container.querySelector('.blog > div:nth-child(2)')
  expect(toggledContent).not.toHaveStyle('display: none')

  expect(screen.getByText('https://fullstackopen.com/')).toBeDefined()
  expect(screen.getByText('likes 5')).toBeDefined()
})

test('if the like button is clicked twice, the event handler received as props is called twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti Luukkainen',
    url: 'https://fullstackopen.com/',
    likes: 5,
    user: {
      username: 'carloss',
      name: 'Carlos'
    }
  }

  const user = {
    username: 'carloss'
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} user={user} handleLike={mockHandler} />)

  const userSession = userEvent.setup()
  const viewButton = screen.getByText('ver')
  await userSession.click(viewButton)

  const likeButton = screen.getByText('like')
  await userSession.click(likeButton)
  await userSession.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})