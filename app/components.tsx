// Glass Card Component with 3D Effect
export function GlassCard({ children, className = "", hover = true }: any) {
  return (
    <div className={`glass-card rounded-2xl p-6 ${hover ? 'card-3d' : ''} ${className}`}>
      {children}
    </div>
  );
}

// Feature Button with Full Width and Glass Effect
export function FeatureButton({ icon, title, description, onClick, color = "blue" }: any) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    red: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
    green: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    amber: "from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
    purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
  };

  return (
    <button
      onClick={onClick}
      className={`w-full bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer group`}
    >
      <div className="flex items-center gap-4">
        <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-all">
          {icon}
        </div>
        <div className="text-left flex-1">
          <h3 className="text-xl font-bold mb-1">{title}</h3>
          <p className="text-white/90 text-sm">{description}</p>
        </div>
        <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}

// Stat Card with Glass Effect
export function StatCard({ icon, label, value, color, trend }: any) {
  return (
    <div className="glass-card rounded-2xl p-6 card-3d">
      <div className="flex items-center justify-between mb-3">
        <div className={`${color} p-3 rounded-xl`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-bold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-600 font-medium">{label}</div>
    </div>
  );
}
