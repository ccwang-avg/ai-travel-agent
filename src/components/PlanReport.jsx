import { CheckCircle2, Users, Star } from 'lucide-react'
import Icon from './Icon'

// 报告页 · 单个方案的独立分析报告（新疆 / 云南通用）
export default function PlanReport({ plan }) {
  const highlight = plan.recommended
  return (
    <section
      className={
        'overflow-hidden rounded-card border bg-white/85 shadow-sm ' +
        (highlight ? 'border-pine-300' : 'border-sand-200/80')
      }
    >
      {/* 抬头 */}
      <div
        className={
          'flex items-center justify-between px-6 py-4 ' +
          (highlight ? 'bg-pine-50/70' : 'bg-sand-50/50')
        }
      >
        <div className="flex items-center gap-3">
          <span
            className={
              'rounded-full px-2.5 py-0.5 text-[11px] font-semibold ' +
              (highlight
                ? 'bg-pine-600 text-sand-50'
                : 'bg-sand-200 text-pine-700')
            }
          >
            {plan.tag}
          </span>
          <h2 className="font-display text-[18px] font-bold text-pine-800">
            {plan.title}
          </h2>
        </div>
        {highlight && (
          <span className="inline-flex items-center gap-1 rounded-full bg-sunset-300/15 px-2.5 py-1 text-[11.5px] font-medium text-sunset-600">
            <Star className="h-3.5 w-3.5" />
            AI 更推荐
          </span>
        )}
      </div>

      <div className="p-6">
        {/* 适合人群 */}
        <div className="mb-5 flex items-start gap-2.5 rounded-card border border-sand-200/60 bg-sand-50/40 p-3.5">
          <Users className="mt-0.5 h-4 w-4 shrink-0 text-lake-500" />
          <div>
            <p className="text-[12px] font-medium text-pine-600/70">适合人群</p>
            <p className="mt-0.5 text-[13.5px] leading-relaxed text-pine-800">
              {plan.fit}
            </p>
          </div>
        </div>

        {/* 分析模块 */}
        <div className="grid gap-4 sm:grid-cols-2">
          {plan.sections.map((sec) => (
            <div key={sec.key}>
              <div className="mb-2 flex items-center gap-1.5 text-[13.5px] font-semibold text-pine-800">
                <Icon name={sec.icon} className="h-4 w-4 text-lake-500" />
                {sec.title}
              </div>
              <ul className="space-y-1.5">
                {sec.points.map((p) => (
                  <li
                    key={p}
                    className="flex gap-2 text-[12.5px] leading-relaxed text-pine-700/85"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-lake-400" />
                    {p}
                  </li>
                ))}
              </ul>

              {/* 具体推荐（景点 / 餐厅 / 住宿等） */}
              {sec.picks?.length > 0 && (
                <div className="mt-2.5 space-y-1.5 rounded-card border border-sand-200/70 bg-sand-50/50 p-2.5">
                  <p className="text-[11px] font-medium text-pine-600/70">
                    具体推荐
                  </p>
                  {sec.picks.map((pk) => (
                    <div key={pk.name} className="flex flex-col">
                      <span className="text-[12.5px] font-medium text-pine-800">
                        {pk.name}
                      </span>
                      <span className="text-[11.5px] leading-snug text-pine-700/70">
                        {pk.desc}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 小结 */}
        <div
          className={
            'mt-5 flex items-start gap-2 rounded-card p-4 ' +
            (highlight
              ? 'bg-pine-50/70 text-pine-800'
              : 'bg-sand-100/60 text-pine-800')
          }
        >
          <CheckCircle2
            className={
              'mt-0.5 h-4 w-4 shrink-0 ' +
              (highlight ? 'text-pine-600' : 'text-sand-500')
            }
          />
          <p className="text-[13px] leading-relaxed">
            <span className="font-semibold">小结 · </span>
            {plan.summary}
          </p>
        </div>
      </div>
    </section>
  )
}
