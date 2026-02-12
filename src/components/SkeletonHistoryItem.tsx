const SkeletonHistoryItem = () => (
  <div className="bg-gray-700/50 rounded-xl p-4 flex animate-pulse h-24 w-full">
    <div className="flex-1 space-y-3">
      <div className="h-5 bg-gray-600 rounded w-1/4"></div>
      <div className="h-4 bg-gray-600 rounded w-1/2"></div>
      <div className="h-3 bg-gray-600 rounded w-1/3"></div>
    </div>
    <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
  </div>
)

export default SkeletonHistoryItem
