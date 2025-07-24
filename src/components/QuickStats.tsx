export const QuickStats = ({ standups, pendingMembers }: { standups: number; pendingMembers: number }) => {
  return (
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 border-0 shadow-xl rounded-2xl p-4 hover:shadow-2xl transition-all duration-200">
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {Math.round((standups / (standups + pendingMembers)) * 100)}%
        </div>
        <p className="text-sm text-gray-600">Team Completion</p>
      </div>
    </div>
  )
}