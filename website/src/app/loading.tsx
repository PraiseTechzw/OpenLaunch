export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 animate-pulse">
          <div className="w-full h-full rounded-full border-4 border-white border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
        <p className="text-gray-600">Please wait while we load the content.</p>
      </div>
    </div>
  )
}