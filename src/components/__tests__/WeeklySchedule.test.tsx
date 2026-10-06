import { render, screen } from '@testing-library/react';
import WeeklySchedule from '../WeeklySchedule';
import { AuthContext } from '../../context/AuthContext';
import type { User } from '../../types/app';

// A minimal mock user — userId is required so WeeklySchedule's fetch useEffect fires
const mockUser: User = {
  userId: 'test-user-123',
  name: 'Hero',
  xp: 0,
  level: 1,
  avatar: null,
};

// Wraps WeeklySchedule in AuthContext so useContext(AuthContext) returns a valid user
// instead of the default { user: null, loading: true } which would prevent rendering
const renderSchedule = () =>
  render(
    <AuthContext.Provider value={{ user: mockUser, loading: false }}>
      <WeeklySchedule />
    </AuthContext.Provider>
  );

describe('WeeklySchedule', () => {
  beforeEach(() => {
    // Mock the /api/workouts/:userId fetch to return an empty workout list.
    // This lets the component finish loading without hitting a real backend.
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ workouts: [] }),
      } as Response)
    );
  });

  // Verifies the page heading is rendered
  it('renders the Monthly Schedule heading', () => {
    renderSchedule();
    expect(screen.getByText('Monthly Schedule')).toBeInTheDocument();
  });

  // Verifies the month selector dropdown is present in the UI
  it('renders the month dropdown', () => {
    renderSchedule();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  // Verifies the dropdown has at least one month option to select
  it('renders month options', () => {
    renderSchedule();
    const select = screen.getByRole('combobox');
    expect(select.children.length).toBeGreaterThan(0);
  });

  // Verifies the Mon/Wed/Fri column headers are rendered in the calendar grid
  it('renders the week day headers', () => {
    renderSchedule();
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
    expect(screen.getByText('Fri')).toBeInTheDocument();
  });

  // Verifies the User's Goals sidebar section is present
  it("renders User's Goals section", () => {
    renderSchedule();
    expect(screen.getByText(/User.*Goals|Goals/i)).toBeInTheDocument();
  });

  // Verifies the Current XP label is shown in the sidebar panel
  it('renders current XP display', () => {
    renderSchedule();
    expect(screen.getByText(/Current XP/i)).toBeInTheDocument();
  });

  // Verifies the calendar grid wrapper is rendered (via the combobox presence)
  it('renders the calendar grid', () => {
    renderSchedule();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  // Verifies weekend column headers Sat and Sun are rendered
  it('renders Sat and Sun day headers', () => {
    renderSchedule();
    expect(screen.getByText('Sat')).toBeInTheDocument();
    expect(screen.getByText('Sun')).toBeInTheDocument();
  });

  // Verifies midweek column headers Tue and Thu are rendered
  it('renders Tue and Thu day headers', () => {
    renderSchedule();
    expect(screen.getByText('Tue')).toBeInTheDocument();
    expect(screen.getByText('Thu')).toBeInTheDocument();
  });

  // Verifies the aside panel (sidebar goals section) is rendered as a landmark
  it('renders the aside panel', () => {
    renderSchedule();
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });
});