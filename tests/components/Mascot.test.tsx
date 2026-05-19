import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Mascot from '../../src/components/Mascot';

describe('Mascot Component', () => {
  it('displays the correct message', () => {
    const testMessage = 'Keep up the great work!';
    render(<Mascot message={testMessage} />);

    expect(screen.getByText(testMessage)).toBeInTheDocument();

    // Ensure the mascot role implies a note or similar info box
    expect(screen.getByRole('note')).toHaveTextContent(testMessage);
  });
});
