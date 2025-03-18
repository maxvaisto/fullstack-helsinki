import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm.jsx';


describe('<BlogForm />', () => {
  let container

  const mockCreateBlog = vi.fn()
  const mockRemovalHandler = vi.fn()

  beforeEach(
    () => {
      container = render(<BlogForm createBlog={mockCreateBlog} />)
    }
  )

  test('create blog is called with the correct details', async () => {

    // Get input fields by name

    const title = container.getByTestId('title')
    const author = container.getByTestId('author')
    const url = container.getByTestId('url')

    screen.debug(title)


    const button = screen.getByText('create')

    const user = userEvent.setup()

    await user.type(title, 'Test Title')
    await user.type(author, 'Test Author')
    await user.type(url, 'www.test.com')


    await user.click(button)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0]).toEqual({
      title: 'Test Title',
      author: 'Test Author',
      url: 'www.test.com'
    })
  })

})
