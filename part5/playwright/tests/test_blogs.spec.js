import {test, describe, expect, beforeEach, afterEach} from '@playwright/test';

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
  const usernameLabel = page.getByText('username', { exact: true })
  await expect(usernameLabel).toBeVisible()

  // You might want to assert the input field's visibility instead or as well
  const usernameInput = page.locator('input[name="Username"]')
  await expect(usernameInput).toBeVisible()

  await expect(page.locator('form[name="loginForm"]')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('niki')
      await page.locator('input[name="Password"]').fill('passpass')
      await page.locator('button[type="submit"]').click()
      await expect(page.getByText('Maximilliam logged in')).toBeVisible()

    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('niki')
      await page.locator('input[name="Password"]').fill('wrong password')
      await page.locator('button[type="submit"]').click()
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3003/api/testing/reset')
      await page.locator('input[name="Username"]').fill('niki')
      await page.locator('input[name="Password"]').fill('passpass')
      await page.locator('button[type="submit"]').click()
      await expect(page.getByText('Maximilliam logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByText('add blog').click()
      await page.getByTestId('title').fill('test blog 1')
      await page.getByTestId('author').fill('test author')
      await page.getByTestId('url').fill('test url')
      await page.getByTestId('submit').click()
      await expect(page.getByText('test blog 1 test author')).toBeVisible()

    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByText('add blog').click()
      await page.getByTestId('title').fill('test blog 2')
      await page.getByTestId('author').fill('test author')
      await page.getByTestId('url').fill('test url')
      await page.getByTestId('submit').click()
      // await expect(page.getByText('test blog')).toBeVisible()

      await page.getByText("view").click()
      await page.getByText('like').click()
      await expect(page.getByText('1')).toBeVisible()
    })

    test( 'a blog can be deleted', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept());
      await page.getByText('add blog').click()
      await page.getByTestId('title').fill('test blog 2')
      await page.getByTestId('author').fill('test author')
      await page.getByTestId('url').fill('test url')
      await page.getByTestId('submit').click()
      await expect(page.getByText('test blog 2 test author')).toBeVisible()
      await page.getByText("view").click()
      await page.getByText('remove').click()

      // Window confirm
      await expect(page.getByText('test blog 2 test author')).not.toBeVisible()
    })

    test('delete button is not shown for non-owner blogs', async ({ page }) => {
      await page.getByText('add blog').click()
      await page.getByTestId('title').fill('test blog 2')
      await page.getByTestId('author').fill('test author')
      await page.getByTestId('url').fill('test url')
      await page.getByTestId('submit').click()
      await expect(page.getByText('test blog 2 test author')).toBeVisible()
      await page.getByText('logout').click()
      await page.locator('input[name="Username"]').fill('second user')
      await page.locator('input[name="Password"]').fill('passpass')
      await page.locator('button[type="submit"]').click()
      await page.getByText("view").click()
      await page.getByText('remove').click()
      await expect(page.getByText('test blog 2 test author')).toBeVisible()
    })

    test('blogs are ordered by likes', async ({ page }) => {
      const createBlog = async (title, author, url) => {
        await page.getByTestId('title').fill(title);
        await page.getByTestId('author').fill(author);
        await page.getByTestId('url').fill(url);
        await page.getByTestId('submit').click();
        await expect(page.locator('.togglableContent', { hasText: `${title} ${author}` })).toBeVisible();
      };
      await page.getByRole('button', { name: 'add blog' }).click();
      await createBlog('Worst Blog', 'Test Author', 'url1');
      await createBlog('Best Blog', 'Test Author', 'url2');
      await createBlog('Mediocre Blog', 'Test Author', 'url3');

      const likeBlog = async (title, author, times) => {

        const blogLocator = page.locator('.togglableContent', { hasText: `${title} ${author}` });

        await expect(blogLocator).toBeVisible();

        const viewButton = blogLocator.getByText('view');

        await expect(viewButton).toBeVisible();

        await viewButton.click();



        // const content_locator = await page.getByText(`${title} ${author}`).locator('..')
        const content_locator = page.getByText(`${title} ${author}`).locator('..');

        await expect(content_locator).toBeVisible();

        for (let i = 0; i < times; i++) {
          // let new_element = content_locator.getByText('like' );
          let new_element = content_locator.getByText('like' );

          await expect(new_element).toBeVisible();

          await new_element.click();

          // Sleep for 0.5 seconds
          await page.waitForTimeout(500);
        }
      };
      await likeBlog('Best Blog', 'Test Author', 3);
      await likeBlog('Mediocre Blog', 'Test Author', 2);
      await likeBlog('Worst Blog', 'Test Author', 1);
      const blogLocators = page.locator('.togglableContent');
      const yy =  await blogLocators.evaluateAll(list =>
  list.map(element => {
    // Get the full text content from the div.
    const fullText = element.querySelector('div').textContent.trim();
    // Split the text into rows by newline.
    const firstRow = fullText.split('\n')[0].trim();
    // Remove the trailing " view" if it's present.
    return firstRow.replace(/\s*view$/, '').trim();
  })
);
      const blogTexts = await blogLocators.evaluateAll(list =>
        list.map(element => element.querySelector('div').textContent.trim().replace(/\s*view$/, '').trim()) // Get text, remove trailing ' view' button text
      );

      const expectedOrder = [
        'Best Blog Test Authorhide url2  3like   Maximilliam',
        'Mediocre Blog Test Authorhide url3  2like   Maximilliam',
        'Worst Blog Test Authorhide url1  1like   Maximilliam'
      ];

      await expect(blogTexts).toEqual(expectedOrder);
    });
  })



  afterEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
  })
})

