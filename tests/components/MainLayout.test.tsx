import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../../src/layouts/MainLayout';

vi.mock('../../src/context/UserContext', () => ({
  useUser: () => ({
    avatarId: 'sprout',
  }),
}));

function renderLayout(initialEntry: string, pageContent = <div>Page content</div>) {
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="*" element={pageContent} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('MainLayout', () => {
  it('shows the profile shortcut on non-profile pages', () => {
    renderLayout('/');

    expect(screen.getByLabelText('Open profile')).toBeInTheDocument();
  });

  it('hides the profile shortcut on the profile page', () => {
    renderLayout('/profile', <button aria-label="Current avatar">🌱</button>);

    expect(screen.queryByLabelText('Open profile')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Current avatar')).toBeInTheDocument();
  });
});
