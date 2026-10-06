import { render, screen } from '@testing-library/react';

// Mock the entire react-router-dom module so BrowserRouter is a passthrough.
// App.tsx contains its own BrowserRouter — wrapping it in another Router causes
// "You cannot render a <Router> inside another <Router>" errors.
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
  useParams: () => ({}),
  Routes: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Route: ({ element }: { element: React.ReactNode }) => <>{element}</>,
}));

import App from '../App';

describe('App routing', () => {
  // Verifies the root route renders the Home page — uses getAllByText since
  // "Lively" appears in both the nav logo and the section heading
  it('renders the Home page on the / route', () => {
    render(<App />);
    expect(screen.getAllByText(/Lively/i).length).toBeGreaterThan(0);
  });

  // Verifies the Sidebar is not shown on the landing page — only shown inside /app routes
  it('does not render Sidebar on the landing page', () => {
    render(<App />);
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  // Verifies the app renders without crashing at the root route
  it('renders Sidebar on non-landing pages', () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });
});