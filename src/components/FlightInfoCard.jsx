import { useState } from 'react'
import {
  Plane,
  Search,
  ShieldCheck,
  X,
  Ticket,
  Info,
  Clock,
} from 'lucide-react'
import { FLIGHT_RESULTS, BOOKING_FIELDS } from '../data/mockData'

// 出发城市等低敏字段（查机票不需要证件）
const FIELDS = [
  { key: 'from', label: '出发城市', type: 'text', placeholder: '如：上海', defaultValue: '上海' },
  { key: 'depart', label: '出发日期', type: 'date' },
  { key: 'return', label: '返程日期 / 天数', type: 'text', placeholder: '如：15 天后' },
  { key: 'pax', label: '出行人数', type: 'number', placeholder: '1', defaultValue: '1' },
  { key: 'cabin', label: '舱位偏好', type: 'select', options: ['经济舱', '商务舱'] },
  { key: 'transfer', label: '是否接受中转', type: 'select', options: ['是', '否'] },
]

// 报告页 · 出行信息补充卡片 + 机票模拟查询 + 预订信息收集弹窗
export default function FlightInfoCard() {
  const [queried, setQueried] = useState(false)
  const [showBooking, setShowBooking] = useState(false)

  return (
    <section className="rounded-card border border-sand-200/80 bg-white/85 p-6 shadow-sm sm:p-7">
      <div className="mb-1 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-card bg-lake-400/15 text-lake-500">
          <Plane className="h-4 w-4" />
        </div>
        <h2 className="font-display text-[16px] font-semibold text-pine-800">
          补充出行信息，估算机票成本
        </h2>
      </div>
      <p className="mb-5 pl-10 text-[13px] leading-relaxed text-pine-700/70">
        为了估算两地交通成本，请补充出发城市和出行时间。
        <span className="text-pine-600/60">
          查询机票价格不需要身份证等个人证件信息。
        </span>
      </p>

      {/* 字段 */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FIELDS.map((f) => (
          <label key={f.key} className="block">
            <span className="mb-1 block text-[12px] font-medium text-pine-700/80">
              {f.label}
            </span>
            {f.type === 'select' ? (
              <select
                defaultValue={f.options[0]}
                className="w-full rounded-card border border-sand-200 bg-sand-50/50 px-3 py-2 text-[13px] text-pine-800 outline-none focus:border-lake-400 focus:bg-white"
              >
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                type={f.type}
                defaultValue={f.defaultValue}
                placeholder={f.placeholder}
                className="w-full rounded-card border border-sand-200 bg-sand-50/50 px-3 py-2 text-[13px] text-pine-800 outline-none placeholder:text-pine-600/30 focus:border-lake-400 focus:bg-white"
              />
            )}
          </label>
        ))}
      </div>

      <button
        onClick={() => setQueried(true)}
        className="mt-5 inline-flex items-center gap-2 rounded-card bg-pine-700 px-5 py-2.5 text-[14px] font-medium text-sand-50 transition-colors hover:bg-sunset-500"
      >
        <Search className="h-4 w-4" />
        查询机票价格
      </button>

      {/* 模拟查询结果 */}
      {queried && (
        <div className="mt-6 border-t border-sand-200/70 pt-5">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-sand-100 px-2.5 py-1 text-[11px] font-medium text-pine-600/70">
            <Info className="h-3 w-3" />
            模拟查询结果 · 非实时价格
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {FLIGHT_RESULTS.map((r) => (
              <div
                key={r.route}
                className="rounded-card border border-sand-200/70 bg-sand-50/40 p-4"
              >
                <div className="mb-2 flex items-center gap-1.5 font-display text-[14px] font-semibold text-pine-800">
                  <Plane className="h-3.5 w-3.5 text-lake-500" />
                  {r.route}
                </div>
                <p className="text-[13px] font-medium text-sunset-600">
                  {r.price}
                </p>
                <p className="mt-1 flex items-center gap-1 text-[12.5px] text-pine-700/70">
                  <Clock className="h-3.5 w-3.5" />
                  {r.duration}
                </p>
                <ul className="mt-2 space-y-1">
                  {r.notes.map((n) => (
                    <li
                      key={n}
                      className="flex gap-1.5 text-[12px] text-pine-700/70"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-lake-400" />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowBooking(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-card border border-pine-700 px-4 py-2 text-[13.5px] font-medium text-pine-700 transition-colors hover:bg-sunset-300/10 hover:border-sunset-400 hover:text-sunset-600"
          >
            <Ticket className="h-4 w-4" />
            需要我帮你预订机票
          </button>
        </div>
      )}

      {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
    </section>
  )
}

// 预订信息收集弹窗（仅展示流程，不真实下单）
function BookingModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-pine-900/30 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-card border border-sand-200 bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-card bg-sunset-300/15 text-sunset-600">
              <Ticket className="h-4 w-4" />
            </div>
            <h3 className="font-display text-[16px] font-semibold text-pine-800">
              预订机票需要乘机人信息
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-pine-600/50 transition-colors hover:bg-sand-100 hover:text-pine-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mb-4 text-[13px] leading-relaxed text-pine-700/75">
          当前 MVP 仅展示预订信息收集流程，不会真实下单。真实支付和出票前需要用户二次确认。
        </p>

        <div className="mb-4 space-y-2">
          {BOOKING_FIELDS.map((field) => (
            <div
              key={field}
              className="rounded-card border border-sand-200 bg-sand-50/50 px-3 py-2 text-[13px] text-pine-700/80"
            >
              {field}
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2 rounded-card border border-lake-300/40 bg-lake-300/[0.08] p-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-lake-500" />
          <p className="text-[12.5px] leading-relaxed text-pine-700/80">
            AI 可以帮你比较航班和整理预订信息，但涉及支付、出票和退改签时必须由用户确认。
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full rounded-card bg-pine-700 py-2.5 text-[14px] font-medium text-sand-50 transition-colors hover:bg-sunset-500"
        >
          我知道了
        </button>
      </div>
    </div>
  )
}
