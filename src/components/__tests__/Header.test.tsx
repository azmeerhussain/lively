import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('renders the Learn More button', () => {
    render(<Header onLearnMoreClick={jest.fn()} />);
    expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument();
  });

  it('calls onLearnMoreClick when button is clicked', () => {
    const mockClick = jest.fn();
    render(<Header onLearnMoreClick={mockClick} />);
    fireEvent.click(screen.getByRole('button', { name: /learn more/i }));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});