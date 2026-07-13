import { Trophy, CheckCircle2, Settings2, ArrowRight } from 'lucide-react'
import {
  FINAL_COMPARISON,
  FINAL_RECOMMENDATION,
  XINJIANG_ADJUSTMENTS,
} from '../data/mockData'

// 推荐判断小徽章
function WinnerBadge({ winner }) {
  const isYunnan = winner === 'yunnan'
  return (
    <span
      className={
        'inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ' +
        (isYunnan
          ? 'bg-pine-100 text-pine-600'
          : 'bg-sunset-300/15 text-sunset-600')
      }
    >
      <Trophy className="h-3 w-3" />
      {isYunnan ? '云南更优' : '新疆更优'}
    </span>
  )
}

// 报告页 · 最终对比与推荐
export default function FinalComparison() {
  return (
    <section>
      <h2 className="mb-4 font-display text-[20px] font-bold text-pine-800">
        最终对比与推荐
      </h2>

      {/* 对比表 */}
      <div className="overflow-hidden rounded-card border border-sand-200/80 bg-white/85 shadow-sm">
        {/* 表头 */}
        <div className="hidden grid-cols-12 gap-3 border-b border-sand-200 bg-sand-50/60 px-5 py-3 text-[12px] font-semibold text-pine-700 md:grid">
          <div className="col-span-3">维度</div>
          <div className="col-span-3">新疆 15 天自驾</div>
          <div className="col-span-4">云南 15 天游学</div>
          <div className="col-span-2">推荐判断</div>
        </div>

        <div className="divide-y divide-sand-100">
          {FINAL_COMPARISON.map((row) => (
            <div
              key={row.dimension}
              className="grid grid-cols-1 gap-2 px-5 py-3.5 md:grid-cols-12 md:items-center md:gap-3"
            >
              <div className="col-span-3 text-[13px] font-semibold text-pine-800">
                {row.dimension}
              </div>
              <div className="col-span-3 text-[12.5px] leading-relaxed text-pine-700/80">
                <span className="mr-1 text-[11px] text-pine-600/50 md:hidden">
                  新疆：
                </span>
                {row.xinjiang}
              </div>
              <div className="col-span-4 text-[12.5px] leading-relaxed text-pine-700/80">
                <span className="mr-1 text-[11px] text-pine-600/50 md:hidden">
                  云南：
                </span>
                {row.yunnan}
              </div>
              <div className="col-span-2">
                <WinnerBadge winner={row.winner} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 最终推荐 + 调整建议 */}
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {/* 推荐卡片 */}
        <div className="rounded-card border border-pine-300 bg-pine-50/60 p-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-card bg-pine-600 text-sand-50">
              <Trophy className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[12px] text-pine-600/70">最终推荐</p>
              <p className="font-display text-[16px] font-bold text-pine-800">
                {FINAL_RECOMMENDATION.plan}
              </p>
            </div>
          </div>
          <ul className="space-y-2">
            {FINAL_RECOMMENDATION.reasons.map((r) => (
              <li
                key={r}
                className="flex gap-2 text-[13px] leading-relaxed text-pine-700"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-pine-500" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* 调整建议 */}
        <div className="rounded-card border border-sand-200/80 bg-white/85 p-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-card bg-sunset-300/15 text-sunset-600">
              <Settings2 className="h-4 w-4" />
            </div>
            <p className="text-[14px] font-semibold text-pine-800">
              如果你仍想选择新疆，建议这样调整
            </p>
          </div>
          <ul className="space-y-2">
            {XINJIANG_ADJUSTMENTS.map((a) => (
              <li
                key={a}
                className="flex gap-2 text-[13px] leading-relaxed text-pine-700/85"
              >
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-sunset-500" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
