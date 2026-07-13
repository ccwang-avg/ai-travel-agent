import {
  MapPin,
  Route,
  GraduationCap,
  ShieldAlert,
  Wallet,
  CalendarDays,
} from 'lucide-react'
import { ITINERARY } from '../data/mockData'

// 风险等级 -> 配色
const RISK_STYLE = {
  低: 'bg-pine-100 text-pine-600',
  中低: 'bg-sand-200 text-sand-700',
  中: 'bg-amber2-400/20 text-amber2-600',
}

// 中文星期
const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

// 根据出发日期 + 第几天，算出具体日期。
// 手动解析避免时区偏移（'2026-08-10' 在部分环境会被当成 UTC）。
function dateForDay(startDate, dayIndex) {
  const [y, m, d] = startDate.split('-').map(Number)
  const dt = new Date(y, m - 1, d + (dayIndex - 1))
  return {
    md: `${dt.getMonth() + 1}月${dt.getDate()}日`,
    weekday: WEEKDAYS[dt.getDay()],
    date: dt,
  }
}

function RiskTag({ risk }) {
  return (
    <span
      className={
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-medium ' +
        (RISK_STYLE[risk] || 'bg-sand-100 text-ocean-500')
      }
    >
      <ShieldAlert className="h-3 w-3" />
      风险 {risk}
    </span>
  )
}

// 把 days 按 region 连续分组，保持顺序
function groupByRegion(days) {
  const groups = []
  days.forEach((d) => {
    const last = groups[groups.length - 1]
    if (last && last.region === d.region) {
      last.days.push(d)
    } else {
      groups.push({ region: d.region, days: [d] })
    }
  })
  return groups
}

// 页面 3 左侧：15 天时间轴
// 按地区分组，每天带具体日期；前 5 天详细，后 10 天精简但样式统一。
export default function ItineraryTimeline() {
  const { days, startDate } = ITINERARY
  const groups = groupByRegion(days)

  const start = dateForDay(startDate, 1)
  const end = dateForDay(startDate, days.length)
  const totalBudget = days.reduce((sum, d) => sum + d.budget, 0)

  return (
    <div className="rounded-card border border-sand-200 bg-white p-5 shadow-sm sm:p-6">
      {/* 头部：标题 + 日期区间 + 合计 */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-sand-200 pb-4">
        <div>
          <h3 className="text-sm font-semibold text-ocean-800">15 天行程时间轴</h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-ocean-500">
            <CalendarDays className="h-3.5 w-3.5 text-ocean-400" />
            {start.md}（{start.weekday}） - {end.md}（{end.weekday}）
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-ocean-400">行程合计</p>
          <p className="text-[15px] font-bold text-ocean-800">
            {totalBudget.toLocaleString()} 元
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {groups.map((g) => (
          <RegionGroup key={g.region} group={g} startDate={startDate} />
        ))}
      </div>
    </div>
  )
}

// 一个地区分组
function RegionGroup({ group, startDate }) {
  const first = group.days[0].day
  const last = group.days[group.days.length - 1].day
  return (
    <div>
      {/* 地区标签 */}
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ocean-100 px-3 py-1 text-[12px] font-semibold text-ocean-700">
          <MapPin className="h-3.5 w-3.5" />
          {group.region}
        </span>
        <span className="text-[11.5px] text-ocean-400">
          Day {first}
          {last !== first ? ` - ${last}` : ''}
        </span>
        <div className="h-px flex-1 bg-sand-200" />
      </div>

      {/* 该地区的每一天 */}
      <div className="relative">
        <div className="absolute bottom-3 left-[13px] top-3 w-px bg-sand-200" />
        <div className="space-y-3">
          {group.days.map((d) => (
            <DayRow key={d.day} day={d} startDate={startDate} />
          ))}
        </div>
      </div>
    </div>
  )
}

// 单日行：详细日展开更多信息，精简日紧凑但结构一致
function DayRow({ day, startDate }) {
  const { md, weekday } = dateForDay(startDate, day.day)
  return (
    <div className="relative pl-9">
      {/* 时间轴节点 */}
      <div className="absolute left-0 top-1 flex h-[27px] w-[27px] items-center justify-center rounded-full bg-ocean-800 text-[11px] font-semibold text-sand-50 ring-4 ring-white">
        {day.day}
      </div>

      <div
        className={
          'rounded-card border p-3.5 ' +
          (day.detail
            ? 'border-sand-100 bg-sand-50/60'
            : 'border-sand-100 bg-white')
        }
      >
        {/* 顶部：日期 + 城市 + 风险 */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="rounded bg-ocean-100/70 px-1.5 py-0.5 text-[11px] font-medium text-ocean-600">
            {md} · {weekday}
          </span>
          <span className="text-[13.5px] font-semibold text-ocean-800">
            Day {day.day} · {day.city}
          </span>
          <div className="ml-auto">
            <RiskTag risk={day.risk} />
          </div>
        </div>

        {/* 内容行：活动 / 交通 / 主题 / 预算 */}
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-ocean-600">
          <span className="flex items-center gap-1.5">
            <span className="text-ocean-400">活动</span>
            <span className="text-ocean-800">{day.activity}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Route className="h-3.5 w-3.5 shrink-0 text-ocean-400" />
            {day.transport}
          </span>
          {day.theme && (
            <span className="flex items-center gap-1.5 text-pine-600">
              <GraduationCap className="h-3.5 w-3.5 shrink-0 text-pine-500" />
              {day.theme}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Wallet className="h-3.5 w-3.5 shrink-0 text-amber2-500" />
            <span className="font-medium text-ocean-800">{day.budget} 元</span>
          </span>
        </div>
      </div>
    </div>
  )
}
