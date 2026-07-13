import { ScanText, FileBarChart, Sparkles } from 'lucide-react'

export default function RequirementInput({
  value,
  onChange,
  onParse,
  onGenerate,
  parsed,
}) {
  return (
    <div className="rounded-card border border-sand-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-amber2-500" />
        <h2 className="text-sm font-semibold text-ocean-800">
          用自然语言描述你的纠结
        </h2>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={9}
        placeholder="例如：我在纠结两个目的地……"
        className="w-full resize-none rounded-card border border-sand-200 bg-sand-50/50 p-3.5 text-[13.5px] leading-relaxed text-ocean-800 outline-none transition-colors placeholder:text-ocean-300 focus:border-ocean-400 focus:bg-white"
      />

      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <button
          onClick={onParse}
          className="flex flex-1 items-center justify-center gap-2 rounded-card border border-ocean-700 bg-white px-4 py-2.5 text-sm font-medium text-ocean-800 transition-colors hover:bg-ocean-50"
        >
          <ScanText className="h-4 w-4" />
          解析需求
        </button>
        <button
          onClick={onGenerate}
          className="flex flex-1 items-center justify-center gap-2 rounded-card bg-ocean-800 px-4 py-2.5 text-sm font-medium text-sand-50 transition-colors hover:bg-ocean-900"
        >
          <FileBarChart className="h-4 w-4" />
          生成对比报告
        </button>
      </div>

      <p className="mt-3 text-[11.5px] leading-relaxed text-ocean-400">
        {parsed
          ? 'AI 已完成解析，可直接生成对比报告。'
          : '提示：直接点击「生成对比报告」时，AI 会自动先完成需求解析再进入报告。'}
      </p>
    </div>
  )
}
