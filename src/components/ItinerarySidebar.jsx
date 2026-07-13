import {
  CalendarRange,
  MapPin,
  PlaneTakeoff,
  Gauge,
  Lightbulb,
  Backpack,
} from 'lucide-react'
import Icon from './Icon'
import {
  ITINERARY,
  TRIP_OVERVIEW,
  LEARNING_HIGHLIGHTS,
  TRIP_TIPS,
  PACKING_SUGGESTIONS,
} from '../data/mockData'

// 页面 3 右侧补充模块：行程概览 + 游学主题 + 出行贴士
// 目的：填充预算拆解下方的空白，让右栏与左侧时间轴高度更均衡。

// 概览统计（多数由 ITINERARY 派生）
export function TripOverview() {
  const { days } = ITINERARY
  const regionCount = new Set(days.map((d) => d.region)).size
  const avg = Math.round(
    days.reduce((s, d) => s + d.budget, 0) / days.length,
  )

  const stats = [
    { label: '总天数', value: `${days.length} 天`, icon: CalendarRange },
    { label: '途经地区', value: `${regionCount} 个`, icon: MapPin },
    { label: '出发地', value: TRIP_OVERVIEW.origin, icon: PlaneTakeoff },
    { label: '日均预算', value: `${avg} 元`, icon: Gauge },
  ]

  return (
    <section className="rounded-card border border-sand-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-ocean-800">行程概览</h3>
      <div className="grid grid-cols-2 gap-2.5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-card border border-sand-100 bg-sand-50/60 p-3"
          >
            <s.icon className="h-4 w-4 text-ocean-400" />
            <p className="mt-2 text-[15px] font-bold text-ocean-800">
              {s.value}
            </p>
            <p className="text-[11.5px] text-ocean-400">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <Chip>{TRIP_OVERVIEW.intensity}</Chip>
        <Chip>每日驾驶 {TRIP_OVERVIEW.dailyDrive}</Chip>
        <Chip>
          {TRIP_OVERVIEW.travelers} 人 · {TRIP_OVERVIEW.cabin}
        </Chip>
      </div>
    </section>
  )
}

function Chip({ children }) {
  return (
    <span className="rounded-full bg-ocean-100/70 px-2.5 py-0.5 text-[11.5px] font-medium text-ocean-600">
      {children}
    </span>
  )
}

// 游学主题亮点
export function LearningHighlights() {
  return (
    <section className="rounded-card border border-sand-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-ocean-800">游学主题亮点</h3>
      <div className="space-y-2.5">
        {LEARNING_HIGHLIGHTS.map((h) => (
          <div key={h.region} className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-card bg-pine-50 text-pine-500">
              <Icon name={h.icon} className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[12.5px] font-semibold text-ocean-800">
                {h.region}
              </p>
              <p className="text-[12px] leading-snug text-ocean-500">
                {h.theme}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// 出行贴士
export function TripTips() {
  return (
    <section className="rounded-card border border-sand-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-ocean-800">
        <Lightbulb className="h-4 w-4 text-amber2-500" />
        出行贴士
      </h3>
      <ul className="space-y-2.5">
        {TRIP_TIPS.map((t) => (
          <li key={t.text} className="flex items-start gap-2.5">
            <Icon
              name={t.icon}
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ocean-400"
            />
            <span className="text-[12px] leading-relaxed text-ocean-600">
              {t.text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

// 建议携带物品（按场景分组）
export function PackingList() {
  return (
    <section className="rounded-card border border-sand-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-ocean-800">
        <Backpack className="h-4 w-4 text-lake-500" />
        建议携带物品
      </h3>
      <div className="space-y-3.5">
        {PACKING_SUGGESTIONS.map((g) => (
          <div key={g.group}>
            <div className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-ocean-600">
              <Icon name={g.icon} className="h-3.5 w-3.5 text-lake-500" />
              {g.group}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <span
                  key={it}
                  className="rounded-full border border-sand-200 bg-sand-50/60 px-2.5 py-0.5 text-[11.5px] text-ocean-600"
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
