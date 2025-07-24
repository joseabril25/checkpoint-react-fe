import type { Standup } from '../types/apiTypes';
import { Avatar } from './ui/Avatar';
import { getInitials } from '../utils/strings';

interface BlockersListProps {
  standups: Standup[];
}

export const BlockersList = ({ standups }: BlockersListProps) => {
  return (
    <div className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl">
      <div className="p-4 pb-3">
        <h3 className="text-lg font-semibold flex items-center">
          <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          Blockers ({standups.length})
        </h3>
      </div>
      <div className="px-4 pb-4">
        {standups.length > 0 ? (
          <div className="space-y-3">
            {standups.map((standup) => (
              <div key={standup.id} className="p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Avatar
                    src={standup.user?.profileImage}
                    alt={standup.user?.name}
                    initials={getInitials(standup.user?.name || '')}
                    size="sm"
                    className="bg-orange-500 text-white"
                  />
                  <p className="text-sm font-medium text-gray-900">{standup.user?.name}</p>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{standup.blockers}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <svg className="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-gray-600">No blockers today!</p>
          </div>
        )}
      </div>
    </div>
  );
}