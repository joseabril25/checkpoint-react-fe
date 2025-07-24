import type { Standup } from '../types/apiTypes';
import { getInitials } from '../utils/strings';
import { formatDate } from '../utils/date';
import { Avatar } from './ui/Avatar';
import { Badge } from './ui/Badge';

export const StandupCard = ({ standup }: { standup: Standup }) => {
  
  return (
    <div className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-200">
      <div className="p-6 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar
              src={standup.user?.profileImage}
              alt={standup.user?.name}
              initials={getInitials(standup.user?.name as string)}
              size="md"
              className="bg-purple-100 text-purple-600"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{standup.user?.name}</h3>
              <p className="text-sm text-gray-500">Updated at {formatDate(standup.createdAt)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {standup.blockers && (
              <Badge className="border-orange-200 text-orange-600 bg-orange-50">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Blocker
              </Badge>
            )}
            <Badge className="bg-green-100 text-green-600 border-0">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Done
            </Badge>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-3">
        <div className="p-3 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-1">✅ Yesterday</h4>
          <p className="text-sm text-gray-600">{standup.yesterday}</p>
        </div>

        <div className="p-3  rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-1">🎯 Today</h4>
          <p className="text-sm text-gray-600">{standup.today}</p>
        </div>

        {standup.blockers && (
          <div className="p-3  rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-1">🚧 Blockers</h4>
            <p className="text-sm text-gray-600">{standup.blockers}</p>
          </div>
        )}
      </div>
    </div>
  );
}