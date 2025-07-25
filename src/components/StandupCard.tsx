import type { Standup } from '../types/apiTypes';
import { getInitials } from '../utils/strings';
import { formatDate } from '../utils/date';
import { Avatar } from './ui/Avatar';
import { Chip } from './ui/Chip';
import Markdown from 'react-markdown';


interface StandupCardProps {
  standup: Standup;
  onEdit?: (standup: Standup) => void;
  canEdit?: boolean;
}

export const StandupCard = ({ standup, onEdit, canEdit }: StandupCardProps) => {
  
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
              <Chip
                variant="warning"
                size="sm"
                label='Blocker'
              />
            )}
            {
              canEdit && onEdit && (
                <Chip
                  variant="default"
                  size="sm"
                  label='Edit'
                  onClick={() => onEdit(standup)}
                  className="cursor-pointer hover:bg-gray-100"
                />
              )
            }
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-3">
        <div className="p-3 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-1">✅ Yesterday</h4>
          <Markdown>{standup.yesterday}</Markdown>
        </div>

        <div className="p-3  rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-1">🎯 Today</h4>
          <Markdown>{standup.today}</Markdown>
        </div>

        {standup.blockers && (
          <div className="p-3  rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-1">🚧 Blockers</h4>
            <Markdown>{standup.blockers}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}