import Icon from './Icon'

// 页面 2 · 第四部分：AI 推荐理由卡片
// 三种类型：recommend（推荐）/ risk（风险）/ confirm（待确认）
const STYLES = {
  recommend: {
    border: 'border-pine-200',
    bg: 'bg-pine-50/60',
    iconWrap: 'bg-pine-100 text-pine-600',
    dot: 'bg-pine-400',
  },
  risk: {
    border: 'border-amber2-400/40',
    bg: 'bg-amber2-400/10',
    iconWrap: 'bg-amber2-400/20 text-amber2-600',
    dot: 'bg-amber2-500',
  },
  confirm: {
    border: 'border-ocean-200',
    bg: 'bg-ocean-50/60',
    iconWrap: 'bg-ocean-100 text-ocean-600',
    dot: 'bg-ocean-400',
  },
}

export default function RecommendationCard({ card }) {
  const s = STYLES[card.type] || STYLES.confirm
  return (
    <div className={`rounded-card border ${s.border} ${s.bg} p-4`}>
      <div className="mb-3 flex items-center gap-2">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-card ${s.iconWrap}`}
        >
          <Icon name={card.icon} className="h-4 w-4" />
        </div>
        <h4 className="text-[13.5px] font-semibold text-ocean-800">
          {card.title}
        </h4>
      </div>
      <ul className="space-y-2">
        {card.points.map((p, i) => (
          <li
            key={i}
            className="flex gap-2 text-[12.5px] leading-relaxed text-ocean-700"
          >
            <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${s.dot}`} />
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}
