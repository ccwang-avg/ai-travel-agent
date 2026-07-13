import { useState } from 'react'
import Icon from './Icon'
import { CheckCircle2, ChevronDown } from 'lucide-react'
import { BUDGET_BREAKDOWN } from '../data/mockData'

// 页面 3 右侧模块：预算拆解（可展开每个大类的明细）
export default function BudgetBreakdown() {
  const { items, total, note, travelers, days } = BUDGET_BREAKDOWN
  const sum = items.reduce((acc, i) => acc + i.amount, 0)
  // 默认展开第一个大类，其余可点击展开
  const [openKey, setOpenKey] = useState(items[0]?.label ?? null)

  const perPerson = Math.round(total / (travelers || 1))
  const perDay = Math.round(total / (days || 1))
  const usage = Math.round((sum / total) * 100)

  return (
    <section className="rounded-card border border-sand-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ocean-800">预算拆解</h3>
        <span className="rounded-full bg-sand-100 px-2 py-0.5 text-[10.5px] font-medium text-ocean-500">
          点击展开明细
        </span>
      </div>

      <div className="space-y-2.5">
        {items.map((item) => {
          const pct = Math.round((item.amount / sum) * 100)
          const open = openKey === item.label
          return (
            <div
              key={item.label}
              className="rounded-card border border-sand-100 bg-sand-50/40"
            >
              <button
                onClick={() => setOpenKey(open ? null : item.label)}
                className="w-full px-3 pt-2.5 text-left"
              >
                <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                  <span className="flex items-center gap-1.5 font-medium text-ocean-700">
                    <Icon name={item.icon} className="h-3.5 w-3.5 text-ocean-400" />
                    {item.label}
                    <span className="text-[11px] font-normal text-ocean-400">
                      {pct}%
                    </span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-ocean-800">
                    {item.amount.toLocaleString()} 元
                    <ChevronDown
                      className={
                        'h-3.5 w-3.5 text-ocean-400 transition-transform ' +
                        (open ? 'rotate-180' : '')
                      }
                    />
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-sand-100">
                  <div
                    className="h-full rounded-full bg-ocean-400"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </button>

              <DetailList open={open} item={item} />
            </div>
          )
        })}
      </div>

      <BudgetFooter
        total={total}
        note={note}
        perPerson={perPerson}
        perDay={perDay}
        usage={usage}
      />
    </section>
  )
}

// 大类展开后的子项明细
function DetailList({ open, item }) {
  if (!open || !item.details?.length) return null
  return (
    <div className="px-3 pb-2.5 pt-2">
      {item.note && (
        <p className="mb-2 text-[11px] text-ocean-400">{item.note}</p>
      )}
      <ul className="space-y-1 border-l border-sand-200 pl-2.5">
        {item.details.map((d) => (
          <li
            key={d.label}
            className="flex items-center justify-between text-[11.5px] text-ocean-500"
          >
            <span>{d.label}</span>
            <span className="font-medium text-ocean-700">
              {d.amount.toLocaleString()} 元
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// 汇总页脚：总计 + 人均/日均 + 使用率
function BudgetFooter({ total, note, perPerson, perDay, usage }) {
  return (
    <div className="mt-4 border-t border-sand-200 pt-3">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-ocean-800">总计</span>
        <span className="text-[15px] font-bold text-ocean-800">
          {total.toLocaleString()} 元
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-card border border-sand-100 bg-sand-50/60 px-3 py-2">
          <p className="text-[14px] font-bold text-ocean-800">
            {perPerson.toLocaleString()} 元
          </p>
          <p className="text-[11px] text-ocean-400">人均</p>
        </div>
        <div className="rounded-card border border-sand-100 bg-sand-50/60 px-3 py-2">
          <p className="text-[14px] font-bold text-ocean-800">
            {perDay.toLocaleString()} 元
          </p>
          <p className="text-[11px] text-ocean-400">日均</p>
        </div>
      </div>

      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-[11.5px] text-ocean-500">
          <span>预算使用率</span>
          <span className="font-medium text-ocean-700">{usage}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-sand-100">
          <div
            className="h-full rounded-full bg-pine-400"
            style={{ width: `${usage}%` }}
          />
        </div>
      </div>

      <p className="mt-3 flex items-center gap-1.5 rounded-card bg-pine-50/70 px-3 py-2 text-[12px] text-pine-600">
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
        {note}
      </p>
    </div>
  )
}
