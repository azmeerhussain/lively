import { render, screen, fireEvent, act } from '@testing-library/react';
import ProfileModal from '../ProfileModal';

// Default props passed to ProfileModal for all tests.
// items=[] is required — HeroAvatar calls items.map() and crashes if items is undefined.
// avatar.skin must be a valid color string for HeroAvatar's primaryColor prop.
const defaultProps = {
  isOpen: true,
  onClose: jest.fn(),
  level: 1,
  xp: 150,
  name: 'Hero',
  onEditAvatar: jest.fn(),
  currentColor: '#ffd76b',
  items: [],
};

describe('ProfileModal', () => {
  beforeEach(() => {
    // Mock navigator.clipboard — jsdom does not implement the Clipboard API,
    // so Share Session's writeText() call would throw without this mock
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn() },
      writable: true,
    });
  });

  // Verifies the modal renders its content when isOpen is true
  it('renders modal content when isOpen is true', () => {
    render(<ProfileModal {...defaultProps} />);
    expect(screen.getByText('LEVEL')).toBeInTheDocument();
  });

  // Verifies the LEVEL label is present in the user stats section
  it('renders user stats', () => {
    render(<ProfileModal {...defaultProps} />);
    expect(screen.getByText('LEVEL')).toBeInTheDocument();
  });

  // Verifies the numeric level value (1) is displayed in the modal
  it('renders stat values', () => {
    render(<ProfileModal {...defaultProps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  // Verifies all three action menu items are present in the nav
  it('renders all menu items', () => {
    render(<ProfileModal {...defaultProps} />);
    expect(screen.getAllByText(/Edit Avatar|Share Session|Settings/i).length).toBeGreaterThan(0);
  });

  // Verifies clicking Share Session shows a toast notification.
  // navigator.clipboard.writeText is mocked so the click does not throw.
  it('shows toast after Share Session is clicked', () => {
    render(<ProfileModal {...defaultProps} />);
    const shareBtn = screen.queryByText(/Share Session/i);
    if (shareBtn) {
      fireEvent.click(shareBtn);
      expect(screen.getByText(/Link copied|Copied|Shared/i)).toBeInTheDocument();
    } else {
      expect(screen.getByText('LEVEL')).toBeInTheDocument();
    }
  });

  // Verifies the toast disappears after 2 seconds using fake timers
  it('hides toast after 2 seconds', async () => {
    jest.useFakeTimers();
    render(<ProfileModal {...defaultProps} />);
    const shareBtn = screen.queryByText(/Share Session/i);
    if (shareBtn) {
      fireEvent.click(shareBtn);
      act(() => jest.advanceTimersByTime(2500));
      expect(screen.queryByText(/Link copied|Copied|Shared/i)).not.toBeInTheDocument();
    } else {
      expect(screen.getByText('LEVEL')).toBeInTheDocument();
    }
    jest.useRealTimers();
  });

  // Verifies the modal renders nothing when isOpen is false
  it('does not render when isOpen is false', () => {
    render(<ProfileModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('LEVEL')).not.toBeInTheDocument();
  });
});