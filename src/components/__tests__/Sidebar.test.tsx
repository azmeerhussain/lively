import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Sidebar from '../Sidebar';
import { AuthContext } from '../../context/AuthContext';
import type { User } from '../../types/app';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/app/test-user-123/dashboard' }),
  useParams: () => ({ userId: 'test-user-123' }),
}));

jest.mock('../HeroAvatar', () => ({
  __esModule: true,
  default: () => <svg data-testid="hero-avatar" />,
}));

const mockUser: User = {
  userId: 'test-user-123',
  name: 'John Doe',
  xp: 100,
  level: 1,
  avatar: { skin: '#ffd76b' },
};

const renderSidebar = () =>
  render(
    <AuthContext.Provider value={{ user: mockUser, loading: false }}>
      <Sidebar />
    </AuthContext.Provider>
  );

describe('Sidebar', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    // Mock /api/users/progress/:userId — Sidebar requires { xp, level }
    // to render. Returns synchronously-resolved promise so progress state
    // is set before assertions run.
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ xp: 0, level: 1 }),
      } as Response)
    );
  });

  // Verifies all three navigation items are rendered in the sidebar
  it('renders all nav items', async () => {
    renderSidebar();
    expect(await screen.findByText('Dashboard')).toBeInTheDocument();
    expect(await screen.findByText('Schedule')).toBeInTheDocument();
    expect(await screen.findByText('Achievements')).toBeInTheDocument();
  });

  // Verifies the user's full name and initials are shown in the profile section
  it('renders the user profile section', async () => {
    renderSidebar();
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(await screen.findByText('JD')).toBeInTheDocument();
  });

  // Verifies the emoji icons for each nav item are present
  it('renders nav icons', async () => {
    renderSidebar();
    expect(await screen.findByText('🏠')).toBeInTheDocument();
    expect(await screen.findByText('📅')).toBeInTheDocument();
    expect(await screen.findByText('🏆')).toBeInTheDocument();
  });

  // Verifies clicking Dashboard triggers navigation
  it('navigates to dashboard when Dashboard is clicked', async () => {
    renderSidebar();
    fireEvent.click(await screen.findByText('Dashboard'));
    expect(mockNavigate).toHaveBeenCalled();
  });

  // Verifies clicking Schedule triggers navigation
  it('navigates to schedule when Schedule is clicked', async () => {
    renderSidebar();
    fireEvent.click(await screen.findByText('Schedule'));
    expect(mockNavigate).toHaveBeenCalled();
  });

  // Verifies clicking Achievements opens the AchievementsModal
  it('opens AchievementsModal when Achievements is clicked', async () => {
    renderSidebar();
    fireEvent.click(await screen.findByText('Achievements'));
    expect(screen.getByText('Trophy Room')).toBeInTheDocument();
  });

  // Verifies clicking the user's name opens the ProfileModal
  it('opens ProfileModal when user profile is clicked', async () => {
    renderSidebar();
    fireEvent.click(await screen.findByText('John Doe'));
    await waitFor(() =>
      expect(screen.getByText('LEVEL')).toBeInTheDocument()
    );
  });
});