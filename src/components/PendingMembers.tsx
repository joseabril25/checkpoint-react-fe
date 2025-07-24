import { Avatar } from './ui/Avatar';
import { getInitials } from '../utils/strings';

interface PendingMembersProps {
  pendingMembers: Array<{
    id: string;
    name: string;
    email: string;
    profileImage?: string;
  }>;
}

export const PendingMembers = ({ pendingMembers }: PendingMembersProps) => {
  return (
    <div className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-200">
      <div className="p-4 pb-3">
        <h3 className="text-lg font-semibold flex items-center">
          <svg className="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Pending ({pendingMembers.length})
        </h3>
      </div>
      <div className="px-4 pb-4">
        {pendingMembers.length > 0 ? (
          <div className="space-y-3">
            {pendingMembers.map((member) => (
              <div key={member.id} className="flex items-center space-x-3 p-2">
                <Avatar
                  src={member.profileImage}
                  alt={member.name}
                  initials={getInitials(member.name)}
                  size="sm"
                  className="bg-orange-100 text-orange-600"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <svg className="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-gray-600">Everyone's submitted!</p>
          </div>
        )}
      </div>
    </div>
  );
}