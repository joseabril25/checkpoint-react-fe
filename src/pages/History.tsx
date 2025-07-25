import { useState } from 'react';
import { RootLayout } from '../layouts/RootLayout';
import { StandupCard } from '../components/StandupCard';
import { Dropdown } from '../components/ui/Dropdown';
import { Icons } from '../components/Icons';
import { useGetUserStandupQuery } from '../store/api/standups';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setEditingStandup } from '../store/slices/standupSlice';
import type { Standup } from '../types/apiTypes';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' }
];
export default function HistoryPage() {
  const dispatch = useAppDispatch();
  const [sortBy, setSortBy] = useState('newest');
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const { userStandups } = useAppSelector((state) => state.users);
  
  // Fetch user's standups
  const { isLoading, refetch } = useGetUserStandupQuery(
    { userId: currentUser?.id || currentUser?._id, 
      order: sortBy === 'newest' ? 'desc' : 'asc' },
  );

  const handleSortChange = (value: string) => {
    setSortBy(value);
    refetch();
  };

  // Handle edit standup
  const handleEditStandup = (standup: Standup) => {
    dispatch(setEditingStandup(standup));
  };

  // Check if user can edit a standup (only current day standups)
  const canEditStandup = (standup: Standup) => {
    const today = new Date().toISOString().split('T')[0];
    const standupDate = new Date(standup.createdAt).toISOString().split('T')[0];
    return today === standupDate;
  };

  // Calculate stats
  const entriesWithBlockers = userStandups.filter((e) => e.blockers && e.blockers.length > 0).length;
  const avgBlockers = userStandups.length > 0 ? (entriesWithBlockers / userStandups.length).toFixed(1) : 0;
  const completionRate = 94; // This could be calculated based on business logic

  if (isLoading) {
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your History</h1>
            <p className="text-gray-600">
              {userStandups.length} standup entries • {entriesWithBlockers} with blockers
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <div className="w-32">
              <Dropdown
                label=""
                options={sortOptions}
                value={sortBy}
                onChange={handleSortChange}
                placeholder="Sort by"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="border-0 shadow-sm bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Entries</p>
                <p className="text-2xl font-bold text-blue-600">{userStandups.length}</p>
              </div>
              <Icons name="trending-up" width={32} height={32} />
            </div>
          </div>

          <div className="border-0 shadow-sm bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-green-600">{completionRate}%</p>
              </div>
              <Icons name="calendar" width={32} height={32} />
            </div>
          </div>

          <div className="border-0 shadow-sm bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Blockers</p>
                <p className="text-2xl font-bold text-orange-600">{avgBlockers}</p>
              </div>
              <Icons name="filter" width={32} height={32} />
            </div>
          </div>
        </div>

        {/* History Entries */}
        <div className="space-y-4">
          {userStandups.length === 0 ? (
            <div className="border-0 shadow-sm bg-white rounded-lg p-12 text-center">
              <Icons name="calendar" width={48} height={48} />
              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">No standup entries found</h3>
              <p className="text-gray-600">Start submitting your daily standups to see your history here.</p>
            </div>
          ) : (
            userStandups.map((standup) => (
              <StandupCard 
                key={standup.id} 
                standup={standup} 
                onEdit={handleEditStandup}
                canEdit={canEditStandup(standup)}
              />
            ))
          )}
        </div>
      </div>
    </RootLayout>
  );
}