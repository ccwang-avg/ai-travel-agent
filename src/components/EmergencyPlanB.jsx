import { useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Clock,
  RefreshCw,
  Zap,
  ChevronRight,
} from 'lucide-react'
import Icon from './Icon'
import {
  INCIDENT_ALERT,
  PLAN_B_OPTIONS,
  PLAN_B_ACTIONS,
} from '../data/mockData'

// 页面 3 独立模块：突发状况与 Plan B
// 完整链路：发现异常 → 分析影响 → 推荐 Plan B → 用户确认 → 执行动作 → 执行状态
export default function EmergencyPlanB() {
  // 用户选中的 Plan B id
  const [selectedPlan, setSelectedPlan] = useState(null)
  // 是否已点击「确认并执行」进入执行状态区
  const [executing, setExecuting] = useState(false)
  // 每个动作的执行结果：id -> 'done' | 'pending'
  const [actionStatus, setActionStatus] = useState({})

  const plan = PLAN_B_OPTIONS.find((p) => p.id === selectedPlan)
  const execConfig = selectedPlan ? PLAN_B_ACTIONS[selectedPlan] : null

  // 选择方案（重新选择时重置执行状态）
  function handleSelect(id) {
    setSelectedPlan(id)
    setExecuting(false)
    setActionStatus({})
  }

  // 确认并执行：自动项直接完成，需确认项标记为等待用户确认
  function handleExecute() {
    const next = {}
    execConfig.actions.forEach((a) => {
      next[a.id] = a.kind === 'auto' ? 'done' : 'pending'
    })
    setActionStatus(next)
    setExecuting(true)
  }

  // 用户二次确认某个动作
  function confirmAction(id) {
    setActionStatus((prev) => ({ ...prev, [id]: 'done' }))
  }

  return (
    <section className="rounded-card border border-sand-200 bg-white p-6 shadow-sm">
      {/* 模块标题 */}
      <div className="mb-5 border-b border-sand-200 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-card bg-sunset-400/15 text-sunset-500">
            <Zap className="h-4 w-4" />
          </div>
          <h2 className="text-base font-bold text-ocean-800">突发状况与 Plan B</h2>
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-ocean-500">
          当景点关闭、极端天气或航班取消时，AI 会分析影响范围，生成替代方案，并在你确认后协助完成后续操作。
        </p>
      </div>

      {/* Agent 处理链路指示 */}
      <ChainSteps selectedPlan={selectedPlan} executing={executing} />

      {/* 一、突发状况提醒 */}
      <IncidentAlert />

      {/* 二、AI 推荐 Plan B */}
      <div className="mt-6">
        <h3 className="mb-1 text-sm font-semibold text-ocean-800">AI 推荐 Plan B</h3>
        <p className="mb-4 text-[12.5px] text-ocean-400">
          结合当前偏好，AI 生成 3 个替代方案，选择其一后可查看执行动作。
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PLAN_B_OPTIONS.map((opt) => (
            <PlanBCard
              key={opt.id}
              option={opt}
              selected={selectedPlan === opt.id}
              onSelect={() => handleSelect(opt.id)}
            />
          ))}
        </div>
      </div>

      {/* 三、执行确认区域 */}
      {plan && !executing && (
        <ConfirmPanel
          plan={plan}
          config={execConfig}
          onExecute={handleExecute}
          onReset={() => setSelectedPlan(null)}
        />
      )}

      {/* 四、执行状态 */}
      {plan && executing && (
        <ExecutionStatus
          config={execConfig}
          status={actionStatus}
          onConfirm={confirmAction}
        />
      )}
    </section>
  )
}

// Agent 处理链路：发现异常 → 分析影响 → 推荐 Plan B → 用户确认 → 执行动作
function ChainSteps({ selectedPlan, executing }) {
  const steps = ['发现异常', '分析影响', '推荐 Plan B', '用户确认', '执行动作']
  // 当前进行到的阶段索引
  const activeIndex = executing ? 4 : selectedPlan ? 3 : 2
  return (
    <div className="mb-5 flex flex-wrap items-center gap-x-1 gap-y-2 rounded-card bg-sand-50 px-3 py-2.5">
      {steps.map((label, i) => {
        const reached = i <= activeIndex
        return (
          <div key={label} className="flex items-center gap-1">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11.5px] font-medium ${
                reached
                  ? 'bg-ocean-500 text-white'
                  : 'bg-white text-ocean-300 ring-1 ring-sand-200'
              }`}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <ChevronRight
                className={`h-3.5 w-3.5 ${reached ? 'text-ocean-400' : 'text-sand-300'}`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// 一、突发状况提醒卡片（温和的琥珀 / 日落橙警示色）
function IncidentAlert() {
  const { title, description, tags, impacts } = INCIDENT_ALERT
  return (
    <div className="rounded-card border border-amber2-400/40 bg-amber2-400/[0.08] p-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-card bg-amber2-400/20 text-amber2-600">
          <AlertTriangle className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-amber2-600">{title}</h4>
          <p className="mt-1 text-[13px] leading-relaxed text-ocean-700">
            {description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-amber2-400/15 px-2.5 py-0.5 text-[11.5px] font-medium text-amber2-600"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-4 rounded-card bg-white/60 p-3">
            <div className="mb-2 text-[12px] font-semibold text-ocean-600">
              影响分析
            </div>
            <ul className="space-y-1.5">
              {impacts.map((im) => (
                <li
                  key={im}
                  className="flex items-start gap-2 text-[12.5px] leading-relaxed text-ocean-600"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber2-500" />
                  {im}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// 二、Plan B 卡片
function PlanBCard({ option, selected, onSelect }) {
  const toneColor = {
    good: 'text-pine-600',
    warn: 'text-sunset-500',
  }
  return (
    <div
      className={`flex flex-col rounded-card border p-4 transition-all ${
        selected
          ? 'border-ocean-400 bg-ocean-50/60 shadow-sm ring-1 ring-ocean-300'
          : 'border-sand-200 bg-white hover:border-ocean-200'
      }`}
    >
      <div className="mb-2 flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 rounded-full bg-ocean-100 px-2 py-0.5 text-[11px] font-semibold text-ocean-600">
          <Icon name={option.tagIcon} className="h-3 w-3" />
          {option.tag}
        </span>
      </div>
      <h4 className="text-[13.5px] font-semibold leading-snug text-ocean-800">
        {option.title}
      </h4>

      <ul className="mt-3 space-y-1.5">
        {option.points.map((p) => (
          <li
            key={p}
            className="flex items-start gap-1.5 text-[12px] leading-relaxed text-ocean-600"
          >
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ocean-300" />
            {p}
          </li>
        ))}
      </ul>

      <div className="mt-3 rounded-card bg-sand-50 px-2.5 py-2 text-[11.5px] leading-relaxed text-ocean-500">
        <span className="font-medium text-ocean-600">适合：</span>
        {option.suitable}
      </div>

      <div className="mt-3 space-y-1 border-t border-sand-200 pt-3">
        {option.changes.map((c) => (
          <div key={c.label} className="flex items-center justify-between text-[12px]">
            <span className="text-ocean-400">{c.label}</span>
            <span className={`font-medium ${toneColor[c.tone] || 'text-ocean-600'}`}>
              {c.value}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onSelect}
        className={`mt-4 w-full rounded-card px-3 py-2 text-[12.5px] font-medium transition-colors ${
          selected
            ? 'bg-ocean-500 text-white'
            : 'bg-sand-100 text-ocean-600 hover:bg-ocean-100'
        }`}
      >
        {selected ? '已选择此方案' : '选择此方案'}
      </button>
    </div>
  )
}

// 三、执行确认区域
function ConfirmPanel({ plan, config, onExecute, onReset }) {
  const kindBadge = {
    auto: { label: '可自动更新', cls: 'bg-pine-50 text-pine-600' },
    confirm: { label: '待确认', cls: 'bg-amber2-400/15 text-amber2-600' },
  }
  return (
    <div className="mt-6 rounded-card border border-ocean-200 bg-ocean-50/40 p-5">
      <h3 className="text-sm font-semibold text-ocean-800">{config.title}</h3>
      <p className="mt-1 text-[12.5px] leading-relaxed text-ocean-500">
        AI 将根据你的确认，协助完成以下调整。涉及退款、改签、支付或预订的动作，需要你再次确认。
      </p>

      <ol className="mt-4 space-y-2.5">
        {config.actions.map((a, i) => {
          const badge = kindBadge[a.kind]
          // 待确认项特别标注（如需支付的动作）
          const isConfirm = a.kind === 'confirm'
          return (
            <li
              key={a.id}
              className="flex items-start gap-3 rounded-card border border-sand-200 bg-white p-3"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ocean-100 text-[11px] font-semibold text-ocean-600">
                {i + 1}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[13px] font-medium text-ocean-800">
                    {a.label}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ${badge.cls}`}
                  >
                    {isConfirm ? '待确认' : badge.label}
                  </span>
                </div>
                <p className="mt-0.5 text-[12px] text-ocean-400">{a.note}</p>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={onExecute}
          className="rounded-card bg-ocean-500 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-ocean-600"
        >
          确认并执行
        </button>
        <button
          onClick={onReset}
          className="rounded-card border border-sand-300 bg-white px-4 py-2 text-[13px] font-medium text-ocean-600 transition-colors hover:bg-sand-50"
        >
          重新选择方案
        </button>
      </div>
    </div>
  )
}

// 四、执行状态区域
function ExecutionStatus({ config, status, onConfirm }) {
  const allDone = config.actions.every((a) => status[a.id] === 'done')
  return (
    <div className="mt-6 rounded-card border border-pine-200 bg-pine-50/40 p-5">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 text-sm font-semibold text-ocean-800">
          <RefreshCw className="h-4 w-4 text-pine-600" />
          执行进度
        </h3>
        {allDone && (
          <span className="inline-flex items-center gap-1 rounded-full bg-pine-100 px-2.5 py-0.5 text-[11.5px] font-medium text-pine-600">
            <CheckCircle2 className="h-3.5 w-3.5" />
            全部完成
          </span>
        )}
      </div>

      <ul className="mt-4 space-y-2.5">
        {config.actions.map((a) => {
          const done = status[a.id] === 'done'
          return (
            <li
              key={a.id}
              className="flex items-center gap-3 rounded-card border border-sand-200 bg-white p-3"
            >
              {done ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-pine-500" />
              ) : (
                <Clock className="h-5 w-5 shrink-0 text-amber2-500" />
              )}
              <div className="flex-1">
                <span className="text-[13px] font-medium text-ocean-800">
                  {a.label}
                </span>
                <p className="mt-0.5 text-[12px] text-ocean-400">
                  {done ? '完成' : '等待用户确认'}
                </p>
              </div>
              {!done && a.kind === 'confirm' && (
                <button
                  onClick={() => onConfirm(a.id)}
                  className="shrink-0 rounded-card bg-amber2-500 px-3 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-amber2-600"
                >
                  {a.confirmLabel}
                </button>
              )}
            </li>
          )
        })}
      </ul>

      {!allDone && (
        <p className="mt-3 flex items-start gap-1.5 text-[12px] leading-relaxed text-ocean-500">
          <Loader2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ocean-400" />
          自动更新的项目已完成，涉及退款 / 改签 / 预订的动作需要你点击确认后由 AI 协助执行。
        </p>
      )}
    </div>
  )
}
