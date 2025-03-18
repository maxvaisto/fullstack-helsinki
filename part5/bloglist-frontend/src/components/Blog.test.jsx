import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog />', () => {
  let container

  const mockUpdateHandler = vi.fn()
  const mockRemovalHandler = vi.fn()

  beforeEach(() => {
    const blog = {
      author: 'Test Author',
      title: 'Test Title',
      url: 'www.test.com',
      likes: 0
    }


    render(<Blog blog={blog} update={mockUpdateHandler} remove={mockRemovalHandler}/>)
  })

  test('renders content', () => {


    let element = screen.getByText('Test Author', { exact: false })
    expect(element).toBeDefined()
    element = screen.getByText('Test Title', { exact: false })
    expect(element).toBeDefined()

    element = screen.queryByText('www.test.com', { exact: false })
    expect(element).toBeNull()

    element = screen.queryByText('0')
    expect(element).toBeNull()
  })

  test('renders content when view button is clicked', async () => {

    const button = screen.getByText('view')
    const user = userEvent.setup()
    await user.click(button)

    let element = screen.getByText('www.test.com', { exact: false })
    expect(element).toBeDefined()

    element = screen.getByText('0')
    expect(element).toBeDefined()

  })

  test('like button is clicked twice', async () => {

    const button = screen.getByText('view')
    const user = userEvent.setup()
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateHandler.mock.calls).toHaveLength(2)

  })

})
