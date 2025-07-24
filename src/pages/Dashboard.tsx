import { RootLayout } from '../layouts/RootLayout';
import { Button } from '../components/ui/Button';
import { StandupCard } from '../components/StandupCard';
import { PendingMembers } from '../components/PendingMembers';
import { BlockersList } from '../components/BlockersList';
import { useGetStandupsQuery } from '../store/api/standups';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import type { Standup, StandupStatus } from '../types/apiTypes';
import { Icons } from '../components/Icons';
import { openStandupModal } from '../store/slices/standupSlice';
import { getDateToday } from '../utils/date';
import { useState } from 'react';
import { useGetUsersQuery } from '../store/api/users';
import { QuickStats } from '../components/QuickStats';

// Mock data for now - will be replaced with real API data
const mockTeamData: Standup[] = [
  {
    id: "1",
    userId: "1",
    date: new Date("2024-01-15"),
    yesterday: "Completed user authentication flow and fixed login bugs. Reviewed Mike's PR for the payment system.",
    today: "Working on dashboard components and API integration. Planning to finish the user profile page design.",
    blockers: "Need design approval for the new user profile page from the design team",
    status: "submitted" as StandupStatus,
    createdAt: new Date("2024-01-15T09:15:00Z"),
    updatedAt: new Date("2024-01-15T09:15:00Z"),
    user: {
      id: "1",
      name: "Sarah Chen",
      email: "sarah.chen@example.com",
      profileImage: "",
    },
  },
  {
    id: "2",
    userId: "2",
    date: new Date("2024-01-15"),
    yesterday: "Reviewed PRs and deployed hotfix for payment processing. Fixed the database connection timeout issue.",
    today: "Database optimization and performance testing. Will work on the new API endpoints for notifications.",
    blockers: "",
    status: "submitted" as StandupStatus,
    createdAt: new Date("2024-01-15T08:45:00Z"),
    updatedAt: new Date("2024-01-15T08:45:00Z"),
    user: {
      id: "2",
      name: "Mike Rodriguez",
      email: "mike.rodriguez@example.com",
      profileImage: "",
    },
  },
  {
    id: "3",
    userId: "3",
    date: new Date("2024-01-15"),
    yesterday: "Finished mobile responsive design for checkout flow. Conducted user testing session with 5 participants.",
    today: "Starting work on notification system UI. Will create mockups for the new dashboard layout.",
    blockers: "Waiting for API documentation from backend team for the notification endpoints",
    status: "submitted" as StandupStatus,
    createdAt: new Date("2024-01-15T10:30:00Z"),
    updatedAt: new Date("2024-01-15T10:30:00Z"),
    user: {
      id: "3",
      name: "Alex Kim",
      email: "alex.kim@example.com",
      profileImage: "",
    },
  },
  {
    id: "4",
    userId: "4",
    date: new Date("2024-01-15"),
    yesterday: "Updated documentation and onboarding guides. Fixed several CSS issues on the landing page.",
    today: "Code review session and working on the component library updates.",
    blockers: "Need access to the staging environment for testing",
    status: "submitted" as StandupStatus,
    createdAt: new Date("2024-01-15T09:45:00Z"),
    updatedAt: new Date("2024-01-15T09:45:00Z"),
    user: {
      id: "4",
      name: "Lisa Wang",
      email: "lisa.wang@example.com",
      profileImage: "",
    },
  },
];

// Mock team members who haven't submitted (for pending list)
const mockPendingMembers = [
  {
    id: "5",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    profileImage: "",
  },
  {
    id: "6",
    name: "David Park",
    email: "david.park@example.com",
    profileImage: "",
  },
];

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const [dateQuery, setDateQuery] = useState(new Date().toISOString().split('T')[0]);
  const { isLoading } = useGetStandupsQuery({ date: dateQuery });
  const { isLoading: isUsersLoading } = useGetUsersQuery();
  const { standups, currentStandup } = useAppSelector((state) => state.standup);
  const { users } = useAppSelector((state) => state.users);

  // find users not in standups
  const pendingMembers = users.filter((user) => !standups.some((standup) => standup.userId === user._id));
  const membersWithBlockers = standups.filter((standup) => standup.blockers && standup.blockers.length > 0);
  
  const hasSubmittedToday = !!currentStandup;

  if (isLoading || isUsersLoading) {
    return (
      <RootLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Icons name="calendar" width={32} height={32} />
              <h1 className="text-2xl font-bold text-gray-900">{getDateToday()}</h1>
            </div>
            <p className="text-gray-600">
              {standups.length} of {standups.length + standups.length} team members have submitted their standup
            </p>
          </div>
        </div>

        {/* Call to Action for Current User */}
        {!hasSubmittedToday && (
          <div className="mb-6 border-2 border-green-200 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Ready to share your update?</h3>
                  <p className="text-gray-600">Let your team know what you're working on today</p>
                </div>
                <Button
                  onClick={() => dispatch(openStandupModal())}
                  variant="primary"
                  size="lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Start My Standup
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Team Standups (3/4 width) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Today's Standups</h2>
              {/* Add Filters Here */}
            </div>

            {standups.map((standup) => (
              <StandupCard key={standup.id} standup={standup} />
            ))}

            {standups.length === 0 && (
              <div className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl">
                <div className="p-12 text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No standups yet</h3>
                  <p className="text-gray-600">Be the first to submit your daily update!</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar (1/4 width) */}
          <div className="space-y-4">
            {/* Pending Members */}
            <PendingMembers pendingMembers={pendingMembers} />

            {/* Active Blockers */}
            <BlockersList standups={membersWithBlockers} />

            {/* Quick Stats */}
            <QuickStats standups={standups.length} pendingMembers={pendingMembers.length} />
          </div>
        </div>

    </RootLayout>
  );
}