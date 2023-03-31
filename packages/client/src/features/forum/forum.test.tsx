import Login from './forum';
import { render, screen } from '@testing-library/react';

const appContent = 'ФОРУМ';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
);

test('Test of rendering of page Forum', async () => {
  render(<Login />);
  expect(screen.getByText(appContent)).toBeDefined();
});
