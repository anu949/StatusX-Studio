function Analytics() {
  const stats = [
    { title: 'Total Views', value: '12.5K' },
    { title: 'Stories Posted', value: '24' },
    { title: 'Reactions', value: '892' },
    { title: 'Replies', value: '156' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-3xl font-bold text-green-400 mb-8">
        Story Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
          >
            <p className="text-slate-400 text-sm mb-2">{stat.title}</p>
            <h2 className="text-3xl font-bold text-white">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Performance Summary</h2>
        <p className="text-slate-300">
          Your stories received 12.5K views this week, with a 15% increase in
          engagement compared to last week.
        </p>
      </div>
    </div>
  )
}

export default Analytics