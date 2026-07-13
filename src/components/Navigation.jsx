import { Plane } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'workbench', label: '决策工作台' },
  { id: 'report', label: '对比报告' },
  { id: 'itinerary', label: '行程草案' },
]

export default function Navigation({ current, onNavigate }) {
  return (
    <header className="sticky top-0 z-30 border-b border-sand-200/70 bg-sand-50/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-card bg-pine-700 text-sand-50 shadow-sm">
            <Plane className="h-5 w-5" strokeWidth={2} />
          </div>
          <div className="font-display text-[22px] font-bold tracking-tight text-pine-800">
            旅策AI
          </div>
        </div>

        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = current === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={
                  'rounded-card px-3.5 py-2 text-sm font-medium transition-colors ' +
                  (active
                    ? 'bg-pine-700 text-sand-50'
                    : 'text-pine-700 hover:bg-sand-100/80 hover:text-sunset-600')
                }
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
