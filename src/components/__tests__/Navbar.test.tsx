import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar', () => {
  it('renders without crashing', () => {
    render(<Navbar />);
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  it('renders the Logo', () => {
    render(<Navbar />);
    expect(document.querySelector('div')).toBeTruthy();
  });
});
