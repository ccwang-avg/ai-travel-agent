import { useState } from 'react'
import {
  Sparkles,
  ArrowRight,
  MessageSquareText,
  Compass,
  Map,
  MapPin,
  ScanText,
  CheckCircle2,
  Loader2,
  Pencil,
} from 'lucide-react'
import Icon from '../components/Icon'
import { SAMPLE_INPUT, PARSED_REQUIREMENTS } from '../data/mockData'

// 示例输入：像杂志里的路线关键词标签
const EXAMPLES = [
  { label: '新疆自驾 vs 云南游学', text: SAMPLE_INPUT },
  {
    label: '15 天假期不知道去哪',
    text: '我有 15 天假期，还不知道去哪。想要自然风光好、节奏别太累，预算 15000 左右，帮我推荐并说明理由。',
  },
  {
    label: '自然风光 + 文化学习路线',
    text: '想要一条自然风光加文化学习的路线，不太能吃辣，每天别太赶，帮我对比几个方案再给建议。',
  },
]

// 流程说明（不弱化，放在 Brief 卡片内、输入框上方）
const STEPS = [
  { n: 1, label: '说出你的疑惑', icon: MessageSquareText },
  { n: 2, label: 'AI 解析并确认', icon: ScanText },
  { n: 3, label: '生成对比报告', icon: Map },
]

// 页面 1：旅行决策助手 —— 轻旅行杂志风的 Brief 卡片
// 交互：输入 → 解析需求（拆成分类标签）→ 用户确认 → 生成 AI 对比报告
export default function WorkbenchPage({ input, setInput, onGenerate }) {
  const [phase, setPhase] = useState('input') // 'input' | 'parsing' | 'parsed'

  const handleInputChange = (v) => {
    setInput(v)
    if (phase !== 'input') setPhase('input') // 改动输入后需重新解析
  }

  const pickExample = (text) => {
    setInput(text)
    setPhase('input')
  }

  const handleParse = () => {
    if (!input.trim()) return
    setPhase('parsing')
    // 模拟 AI 解析耗时，让"识别"过程可感知
    setTimeout(() => setPhase('parsed'), 900)
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-6 pb-20 pt-16 sm:pt-24">
      {/* 标题区 */}
      <div className="mb-10 text-center">
        <h1 className="font-display text-4xl font-bold text-pine-800 sm:text-[42px]">
          出发之前，先聊聊
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-pine-700/70">
          告诉我你的旅行纠结或灵感，我会先读懂你的偏好、和你确认，
          再为你写一份可解释的旅行决策报告。
        </p>
      </div>

      {/* 旅行 Brief 卡片 —— 页面视觉中心 */}
      <div className="relative w-full">
        <div className="absolute inset-x-0 top-0 h-1 rounded-t-card bg-gradient-to-r from-pine-600 via-lake-400 to-sunset-400/80" />
        <div className="w-full rounded-card border border-sand-200/80 bg-white/85 p-6 shadow-[0_8px_30px_-12px_rgba(60,101,83,0.18)] backdrop-blur-sm sm:p-9">
          {/* Brief 抬头 */}
          <div className="mb-6 flex items-center gap-2 border-b border-sand-200/70 pb-4">
            <Compass className="h-4 w-4 text-pine-600" />
            <span className="font-display text-[15px] font-semibold text-pine-800">
              旅行决策报告
            </span>
          </div>

          {/* 流程说明（不弱化，随步骤高亮当前阶段） */}
          <div className="mb-7 flex items-center justify-center gap-2 sm:gap-4">
            {STEPS.map((s, i) => {
              const StepIcon = s.icon
              const activeStep =
                (phase === 'input' && i === 0) ||
                (phase !== 'input' && i === 1)
              return (
                <div key={s.n} className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={
                        'flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold transition-colors ' +
                        (activeStep
                          ? 'bg-pine-700 text-sand-50'
                          : 'bg-sand-200 text-pine-600/60')
                      }
                    >
                      {s.n}
                    </span>
                    <span
                      className={
                        'flex items-center gap-1.5 text-[13.5px] font-medium transition-colors ' +
                        (activeStep ? 'text-pine-800' : 'text-pine-600/50')
                      }
                    >
                      <StepIcon className="h-4 w-4 text-lake-500" />
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <ArrowRight className="h-4 w-4 shrink-0 text-sand-300" />
                  )}
                </div>
              )
            })}
          </div>

          {/* 输入区 */}
          <div className="mb-2.5 flex items-center gap-1.5 text-[13px] text-pine-600/70">
            <Sparkles className="h-4 w-4 text-sunset-500" />
            用一句话说出你的旅行纠结
          </div>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            rows={6}
            placeholder="例如：我在纠结两个 15 天的目的地，预算 15000，想要自然风光和文化学习，但不想太累……"
            className="w-full resize-none rounded-card border border-sand-200 bg-sand-50/50 p-4 text-[15px] leading-relaxed text-pine-800 outline-none transition-colors placeholder:text-pine-600/30 focus:border-lake-400 focus:bg-white"
          />

          {/* 解析结果区（解析后出现在输入框下方） */}
          <ParsedSection phase={phase} onReparse={() => setPhase('input')} />

          {/* 主行动按钮：随阶段切换 */}
          {phase !== 'parsed' ? (
            <button
              onClick={handleParse}
              disabled={phase === 'parsing' || !input.trim()}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-card bg-pine-700 px-4 py-3.5 text-[15px] font-medium text-sand-50 transition-colors hover:bg-sunset-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {phase === 'parsing' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  AI 正在识别你的需求…
                </>
              ) : (
                <>
                  <ScanText className="h-4 w-4" />
                  解析需求
                </>
              )}
            </button>
          ) : (
            <button
              onClick={onGenerate}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-card bg-pine-700 px-4 py-3.5 text-[15px] font-medium text-sand-50 transition-colors hover:bg-sunset-500"
            >
              需求没问题，生成对比报告
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* 示例输入 —— 像路线关键词标签（解析后隐藏，聚焦确认） */}
      {phase === 'input' && (
        <div className="mt-8 w-full">
          <p className="mb-3 text-center text-[12px] uppercase tracking-[0.16em] text-pine-600/50">
            试试这些灵感
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                onClick={() => pickExample(ex.text)}
                className="group inline-flex items-center gap-1.5 rounded-full border border-sand-300 bg-white/70 px-4 py-2 text-[13px] text-pine-700 transition-colors hover:border-sunset-400 hover:bg-sunset-300/10 hover:text-sunset-600"
              >
                <MapPin className="h-3.5 w-3.5 text-lake-400 group-hover:text-sunset-500" />
                {ex.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// 解析结果：分类标签卡片
function ParsedSection({ phase, onReparse }) {
  if (phase === 'input') return null

  if (phase === 'parsing') {
    return (
      <div className="mt-4 flex items-center justify-center gap-2 rounded-card border border-dashed border-sand-300 bg-sand-50/40 py-6 text-[13px] text-pine-600/70">
        <Loader2 className="h-4 w-4 animate-spin text-lake-500" />
        正在把你的自然语言拆解成结构化需求…
      </div>
    )
  }

  // phase === 'parsed'
  return (
    <div className="mt-5 rounded-card border border-lake-300/40 bg-lake-300/[0.06] p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[13px] font-semibold text-pine-800">
          <CheckCircle2 className="h-4 w-4 text-pine-600" />
          AI 已识别出以下需求，请确认
        </div>
        <button
          onClick={onReparse}
          className="inline-flex items-center gap-1 rounded-full border border-sand-300 bg-white px-3 py-1 text-[12px] font-medium text-pine-700 transition-colors hover:border-sunset-400 hover:text-sunset-600"
        >
          <Pencil className="h-3 w-3" />
          修改输入
        </button>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {PARSED_REQUIREMENTS.map((item) => (
          <div
            key={item.key}
            className="rounded-card border border-sand-200/70 bg-white/70 p-3"
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[12px] font-medium text-pine-600/80">
                <Icon name={item.icon} className="h-3.5 w-3.5 text-lake-500" />
                {item.label}
              </span>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-pine-100 px-1.5 py-0.5 text-[10px] font-medium text-pine-600">
                已识别
              </span>
            </div>
            <p className="text-[13px] font-medium leading-snug text-pine-800">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[11.5px] leading-relaxed text-pine-600/60">
        以上均由 AI 从你的输入中自动识别。确认无误后即可生成对比报告，也可点「修改输入」重新描述。
      </p>
    </div>
  )
}
