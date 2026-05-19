import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressBar from '../../src/components/ProgressBar';

describe('ProgressBar Component', () => {
  it('renders correct label and fractional text', () => {
    render(<ProgressBar current={5} total={10} label="Signs Mastered" />);

    expect(screen.getByLabelText('Signs Mastered')).toBeInTheDocument();
    expect(screen.getByText('Signs Mastered')).toBeInTheDocument();
    expect(screen.getByText('5/10')).toBeInTheDocument();
  });

  it('handles zero gracefully', () => {
    render(<ProgressBar current={0} total={10} label="Progress" />);

    expect(screen.getByText('0/10')).toBeInTheDocument();
  });

  it('caps progress at 100% when current exceeds total', () => {
    // Render it, although we can't easily assert the internal inline style width via RTL efficiently without querying the child.
    // We'll trust the 15/10 rendering logic or query the inline style if needed.
    const { container } = render(<ProgressBar current={15} total={10} label="Progress" />);

    expect(screen.getByText('15/10')).toBeInTheDocument();
    // The inner div with the style is the second child inside the progress bar container.
    // Selecting based on the style might be fragile, but it works to prove the Math.min logic.
    const progressBarIndicator = container.querySelector('.bg-success');
    expect(progressBarIndicator).toHaveStyle('width: 100%');
  });
});
