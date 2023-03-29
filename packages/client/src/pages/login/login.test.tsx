import Login from './login';
import { render, screen } from '@testing-library/react';

const appContent = 'Войдите в аккаунт';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

test('Test of rendering of page Login', async () => {
    render(<Login />);
    expect(screen.getByText(appContent)).toBeDefined();
});
