import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';

const mockNavigate = jest.fn();
const mockScrollIntoView = jest.fn();

// Mock useNavigate so we can assert navigation calls without a real router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Wraps Home in MemoryRouter since Home uses Link/useNavigate internally
const renderHome = () => {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
};

describe('Home page', () => {
  beforeEach(() => {
    // Reset navigation and scroll mocks before each test to avoid call bleed-over
    mockNavigate.mockClear();
    mockScrollIntoView.mockClear();
    // Override scrollIntoView which is not implemented in jsdom
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;
  });

  // Verifies the main hero heading is rendered on the landing page
  it('renders the hero title', () => {
    renderHome();
    expect(screen.getByText(/Level Up Your/i)).toBeInTheDocument();
  });

  // Verifies the gamified fitness subtitle is present below the hero title
  it('renders the tagline', () => {
    renderHome();
    expect(screen.getByText('Gamified Fitness Planning')).toBeInTheDocument();
  });

  // Verifies the hero description paragraph is rendered
  it('renders the hero description', () => {
    renderHome();
    expect(screen.getByText(/Transform your workouts/i)).toBeInTheDocument();
  });

  // Verifies the primary CTA button is rendered and accessible by role
  it('renders the Start Your Journey button', () => {
    renderHome();
    expect(screen.getByRole('button', { name: /start your journey/i })).toBeInTheDocument();
  });

  // Verifies the secondary Learn More button is rendered and accessible by role
  it('renders the Learn More button', () => {
    renderHome();
    expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument();
  });

  // Verifies clicking "Start Your Journey" navigates to the questionnaire page
  it('navigates to questionnaire when Start Your Journey is clicked', () => {
    renderHome();
    fireEvent.click(screen.getByRole('button', { name: /start your journey/i }));
    expect(mockNavigate).toHaveBeenCalledWith('questionnaire');
  });

  // Verifies clicking "Learn More" smoothly scrolls to the features section
  it('calls scrollIntoView when Learn More is clicked', () => {
    renderHome();
    fireEvent.click(screen.getByRole('button', { name: /learn more/i }));
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  // Verifies all 4 feature cards are rendered in The Lively Experience section
  it('renders all 4 feature cards', () => {
    renderHome();
    expect(screen.getByText('Biometric Logic')).toBeInTheDocument();
    expect(screen.getByText('Gamified Progress')).toBeInTheDocument();
    expect(screen.getByText('Smart Scheduling')).toBeInTheDocument();
    expect(screen.getByText('Milestones & Rewards')).toBeInTheDocument();
  });

  // Verifies the section heading for the features grid is rendered
  it('renders The Lively Experience section title', () => {
    renderHome();
    expect(screen.getByText('The Lively Experience')).toBeInTheDocument();
  });

  // Verifies the emoji icons for all 4 feature cards are present
  it('renders feature icons', () => {
    renderHome();
    expect(screen.getByText('🎯')).toBeInTheDocument();
    expect(screen.getByText('⚔️')).toBeInTheDocument();
    expect(screen.getByText('📅')).toBeInTheDocument();
    expect(screen.getByText('🏆')).toBeInTheDocument();
  });
});