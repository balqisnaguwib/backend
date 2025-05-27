import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardPage from '../../pages/assistant/index';

// Mock the components used in the Dashboard page
jest.mock('@/components/Dashboard/Chat', () => {
  return function MockChat() {
    return <div data-testid="chat-component">Chat Component</div>;
  };
});

jest.mock('@/components/Dashboard/Explore', () => {
  return function MockExplore() {
    return <div data-testid="explore-component">Explore Component</div>;
  };
});

// Mock the Icon component
jest.mock('@iconify/react', () => ({
  Icon: ({ icon, className }: { icon: string; className?: string }) => (
    <span data-testid={`icon-${icon}`} className={className}>
      {icon}
    </span>
  ),
}));

describe('Dashboard Page', () => {
  it('renders all components and UI elements', () => {
    render(<DashboardPage />);

    // Check for buttons
    expect(screen.getByText('New Chat')).toBeInTheDocument();
    expect(screen.getByText('Invite')).toBeInTheDocument();
    expect(screen.getByText('Create Trip')).toBeInTheDocument();

    // Check for filter buttons
    expect(screen.getByText('Where')).toBeInTheDocument();
    expect(screen.getByText('When')).toBeInTheDocument();
    expect(screen.getByText('2 Travelers')).toBeInTheDocument();
    expect(screen.getByText('Budget')).toBeInTheDocument();

    // Check for icons
    expect(screen.getByTestId('icon-material-symbols:add')).toBeInTheDocument();
    expect(screen.getByTestId('icon-mdi:map-marker')).toBeInTheDocument();
    expect(screen.getByTestId('icon-mdi:calendar')).toBeInTheDocument();
    expect(screen.getByTestId('icon-mdi:account-group')).toBeInTheDocument();
    expect(screen.getByTestId('icon-mdi:currency-usd')).toBeInTheDocument();
    expect(screen.getByTestId('icon-mdi:account-plus')).toBeInTheDocument();
    expect(screen.getByTestId('icon-mdi:airplane')).toBeInTheDocument();

    // Check for child components
    expect(screen.getByTestId('chat-component')).toBeInTheDocument();
    expect(screen.getByTestId('explore-component')).toBeInTheDocument();
  });
});
