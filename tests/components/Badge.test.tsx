import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from '../../src/components/Badge';
import type { BadgeConditionType } from '../../src/types';

const mockBadge = {
  id: 'test-badge',
  name: 'Test Achievement',
  description: 'A badge for testing',
  icon: '🏆',
  condition: {
    type: 'signs_learned' as BadgeConditionType,
    value: 10,
  },
};

describe('Badge Component', () => {
  it('renders earned badge correctly', () => {
    render(<Badge badge={mockBadge} earned={true} />);

    expect(screen.getByText('Test Achievement')).toBeInTheDocument();
    expect(screen.getByText('🏆')).toBeInTheDocument();
    expect(screen.queryByText('🔒')).not.toBeInTheDocument();
  });

  it('renders unearned badge correctly', () => {
    render(<Badge badge={mockBadge} earned={false} />);

    expect(screen.getByText('Test Achievement')).toBeInTheDocument();
    expect(screen.getByText('🔒')).toBeInTheDocument();
    expect(screen.queryByText('🏆')).not.toBeInTheDocument();
  });
});
