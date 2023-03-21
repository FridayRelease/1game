import Button from './button';
import { render, screen } from '@testing-library/react';

const appContent = 'button';

test('Example test', async () => {
  render(<Button>button</Button>);

  expect(screen.getByText(appContent)).toBeDefined();
});
