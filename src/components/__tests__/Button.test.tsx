import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('renders the correct text', () => {
    render(<Button text="Click Me" />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('renders with primary variant by default', () => {
    render(<Button text="Primary" />);
    expect(screen.getByText('Primary')).toBeInTheDocument();
  });

  it('renders with secondary variant', () => {
    render(<Button text="Secondary" variant="secondary" />);
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });
});