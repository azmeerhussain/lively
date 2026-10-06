import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { AuthContext } from '../../context/AuthContext';
import type { User } from '../../types/app';

// Mock react-router-dom so Dashboard can call useParams() without a real router.
// userId is set to 'test-user-123' to simulate a logged-in user route.
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ userId: 'test-user-123' }),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/app/test-user-123/dashboard' }),
}));

// A minimal mock user object matching the User type used by the AuthContext
const mockUser: User = {
  userId: 'test-user-123',
  name: 'Hero',
  xp: 0,
  level: 1,
  avatar: { skin: '#ffd76b' },
};

// Mock the fetch call that Dashboard makes to /api/users/:userId.
// Returns a resolved response with the mock user data so the component
// exits the loading state and renders the dashboard UI.
const mockFetch = () =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      userId: 'test-user-123',
      name: 'Hero',
      xp: 0,
      level: 1,
      avatar: { skin: '#ffd76b' },
    }),
  } as Response);

// Wraps Dashboard in the AuthContext provider so useAuth() receives
// a valid user and loading=false, preventing the Loading... state
const renderDashboard = () =>
  render(
    <AuthContext.Provider value={{ user: mockUser, loading: false }}>
      <Dashboard />
    </AuthContext.Provider>
  );

describe('Dashboard', () => {
  beforeEach(() => {
    // Reset fetch mock before each test to ensure a clean state
    global.fetch = jest.fn(mockFetch);
  });

  // Verifies the welcome heading appears after the fetch resolves
  it('renders the welcome heading', async () => {
    renderDashboard();
    expect(await screen.findByText(/Welcome Back/i)).toBeInTheDocument();
  });

  // Verifies the level label is rendered in the header after data loads
  it('renders the level badge', async () => {
    renderDashboard();
    expect(await screen.findByText(/Level/i)).toBeInTheDocument();
  });

  // Verifies the Today's Quest card heading is rendered
  it("renders Today's Quest card", async () => {
    renderDashboard();
    expect(await screen.findByText("Today's Quest")).toBeInTheDocument();
  });

  // Verifies the Biometric Profile card section is rendered
  it('renders Biometric Profile card', async () => {
    renderDashboard();
    expect(await screen.findByText('Biometric Profile')).toBeInTheDocument();
  });

  // Verifies the Weekly Schedule card section is rendered
  it('renders Weekly Schedule card', async () => {
    renderDashboard();
    expect(await screen.findByText('Weekly Schedule')).toBeInTheDocument();
  });

  // Verifies the Milestones card section is rendered
  it('renders Milestones card', async () => {
    renderDashboard();
    expect(await screen.findByText('Milestones')).toBeInTheDocument();
  });

  // Verifies all 4 card headings are present after data loads
  it('renders all 4 cards', async () => {
    renderDashboard();
    const headings = await screen.findAllByRole('heading', { level: 3 });
    expect(headings.length).toBe(4);
  });
});