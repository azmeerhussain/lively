import { render, screen, fireEvent } from '@testing-library/react';
import AchievementsModal from '../AchievementsModal';
import { AuthContext } from '../../context/AuthContext';
import type { User } from '../../types/app';

// A minimal mock user — userId is required so the modal's fetch useEffect fires
const mockUser: User = {
  userId: 'test-user-123',
  name: 'Hero',
  xp: 0,
  level: 1,
  avatar: null,
};

// Wraps the modal in AuthContext so it can read user.userId for the achievements fetch
const renderModal = (isOpen = true) =>
  render(
    <AuthContext.Provider value={{ user: mockUser, loading: false }}>
      <AchievementsModal isOpen={isOpen} onClose={jest.fn()} />
    </AuthContext.Provider>
  );

describe('AchievementsModal', () => {
  beforeEach(() => {
    // Mock the /api/achievements/:userId fetch to return an empty unlocked set.
    // This lets the modal finish loading and render all badges in their locked state.
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ achievements: [] }),
      } as Response)
    );
  });

  // Verifies the modal title is rendered when isOpen is true
  it('renders the Trophy Room heading', () => {
    renderModal();
    expect(screen.getByText('Trophy Room')).toBeInTheDocument();
  });

  // Verifies all three achievement badge names are rendered after the fetch resolves.
  // Note: azmeer removed "Lively Regular" from the achievement list so only 3 badges exist.
  it('renders all badges', async () => {
    renderModal();
    expect(await screen.findByText('First Steps')).toBeInTheDocument();
    expect(await screen.findByText('Century Club')).toBeInTheDocument();
    expect(await screen.findByText('Double Digits')).toBeInTheDocument();
  });

  // Verifies the description text for the First Steps badge is shown
  it('renders badge descriptions', async () => {
    renderModal();
    expect(await screen.findByText(/Completed your first session/i)).toBeInTheDocument();
  });

  // Verifies the onClose callback fires when the close button is clicked
  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <AuthContext.Provider value={{ user: mockUser, loading: false }}>
        <AchievementsModal isOpen={true} onClose={onClose} />
      </AuthContext.Provider>
    );
    fireEvent.click(screen.getByText('×'));
    expect(onClose).toHaveBeenCalled();
  });

  // Verifies the emoji icons for the achievement badges are rendered
  it('renders badge icons', async () => {
    renderModal();
    expect(await screen.findByText('👟')).toBeInTheDocument();
    expect(await screen.findByText('💯')).toBeInTheDocument();
    expect(await screen.findByText('🔟')).toBeInTheDocument();
  });

  // Verifies nothing is rendered when isOpen is false
  it('does not render when isOpen is false', () => {
    renderModal(false);
    expect(screen.queryByText('Trophy Room')).not.toBeInTheDocument();
  });
});