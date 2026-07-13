// ============================================================================
// AI Travel Agent · MVP Mock Data
// ----------------------------------------------------------------------------
// 所有数据集中管理，便于后续替换为真实的 Agent 解析结果 / 工具调用 / 知识库检索。
// 结构按能力域拆分，方便迭代时按模块接入真实接口。
// ============================================================================

// 预填的示例用户输入
export const SAMPLE_INPUT =
  '我在纠结新疆 15 天自驾和云南 15 天游学。预算大概 15000，希望自然风光好，' +
  '也想有一些文化学习体验，但不想太累。对了，我不太能吃辣，也不想每天开车超过 4 小时，' +
  '最好能告诉我为什么推荐，而不是只给一个结论。'

// ---------------------------------------------------------------------------
// 1. AI 从自然语言中识别出的结构化需求（本次输入）
//    注意：source 字段用于在 UI 上表达"这是从输入中识别的"，而非系统预设。
// ---------------------------------------------------------------------------
export const PARSED_REQUIREMENTS = [
  {
    key: 'compare',
    label: '对比对象',
    value: '新疆 15 天自驾 vs 云南 15 天游学',
    icon: 'GitCompareArrows',
  },
  {
    key: 'budget',
    label: '预算',
    value: '15000 元左右',
    icon: 'Wallet',
  },
  {
    key: 'goal',
    label: '旅行目标',
    value: '自然风光 + 文化学习',
    icon: 'Compass',
  },
  {
    key: 'pace',
    label: '出行节奏',
    value: '中低强度，不想太累',
    icon: 'Gauge',
  },
  {
    key: 'diet',
    label: '饮食偏好',
    value: '清淡，不太能吃辣',
    icon: 'Utensils',
  },
  {
    key: 'driving',
    label: '驾驶限制',
    value: '每日开车不超过 4 小时',
    icon: 'Car',
  },
  {
    key: 'decision',
    label: '决策偏好',
    value: '需要推荐依据，而非只给结论',
    icon: 'Lightbulb',
  },
]

// ---------------------------------------------------------------------------
// 2. 本次任务上下文（把需求转成 Agent 任务）
// ---------------------------------------------------------------------------
export const TASK_CONTEXT = [
  { label: '当前任务', value: '复杂目的地对比' },
  { label: '决策对象', value: '2 个候选方案' },
  { label: '决策目标', value: '选择更适合当前偏好的 15 天旅行方案' },
  { label: '输出结果', value: '对比报告 + 推荐方案 + 初版行程草案' },
]

// ---------------------------------------------------------------------------
// 3. AI 长期记忆（可被用户管理，区别于本次识别结果）
// ---------------------------------------------------------------------------
export const LONG_TERM_MEMORY = [
  {
    id: 'mem-1',
    type: '历史偏好',
    content: '倾向低强度行程',
    source: '来自过往 3 次行程反馈',
    enabled: true,
  },
  {
    id: 'mem-2',
    type: '历史偏好',
    content: '希望看到推荐依据，而非直接结论',
    source: '来自用户显式设置',
    enabled: true,
  },
]

// ---------------------------------------------------------------------------
// 4. 知识库状态
// ---------------------------------------------------------------------------
export const KNOWLEDGE_BASE = {
  ready: [
    '新疆自驾攻略资料',
    '云南游学攻略资料',
    '目的地基础知识库',
  ],
  extendable: [
    '小红书攻略',
    'PDF 文档',
    '飞书文档',
    '公司差旅政策',
  ],
}

// ---------------------------------------------------------------------------
// 5. Agent 工作流步骤（页面 2）
// ---------------------------------------------------------------------------
export const AGENT_WORKFLOW = [
  { step: 1, title: '解析自然语言需求', desc: '识别目标、偏好与约束', icon: 'ScanText' },
  { step: 2, title: '读取长期记忆', desc: '结合历史偏好', icon: 'Brain' },
  { step: 3, title: '检索目的地知识库', desc: '攻略与基础资料', icon: 'Library' },
  { step: 4, title: '调用外部工具', desc: '天气 / 地图 / 价格', icon: 'Wrench' },
  { step: 5, title: '生成对比报告', desc: '多维度打分', icon: 'FileBarChart' },
  { step: 6, title: '输出推荐与风险提示', desc: '可解释建议', icon: 'ShieldCheck' },
]

// ---------------------------------------------------------------------------
// 6. 工具调用状态（模拟 Function Calling / MCP）
// ---------------------------------------------------------------------------
export const TOOL_CALLS = [
  {
    name: 'Weather Tool',
    result: '已查询 8 月天气与降雨风险',
    detail: '云南多雷阵雨，新疆昼夜温差大',
    icon: 'CloudSun',
    status: 'done',
  },
  {
    name: 'Map Tool',
    result: '已计算主要城市间交通距离',
    detail: '新疆单段自驾多超 400km',
    icon: 'Map',
    status: 'done',
  },
  {
    name: 'Hotel Price Tool',
    result: '已估算住宿成本',
    detail: '云南均价约 350/晚，可控',
    icon: 'BedDouble',
    status: 'done',
  },
  {
    name: 'Attraction Tool',
    result: '已查询核心景点开放状态',
    detail: '主要景点 8 月正常开放',
    icon: 'Landmark',
    status: 'done',
  },
  {
    name: 'Knowledge Base',
    result: '已检索攻略和目的地资料',
    detail: '命中 24 篇攻略片段',
    icon: 'Database',
    status: 'done',
  },
]

// ---------------------------------------------------------------------------
// 7. 报告总体结论与推荐指数
// ---------------------------------------------------------------------------
export const REPORT_SUMMARY = {
  conclusion:
    '基于你本次输入的预算、节奏、饮食和学习目标，更推荐「云南 15 天游学」。',
  scores: {
    yunnan: 87,
    xinjiang: 76,
  },
  recommended: 'yunnan',
}

// ---------------------------------------------------------------------------
// 8. 多维度对比表
//    每个维度对新疆 / 云南分别打分（满分 100），并有简短解释。
// ---------------------------------------------------------------------------
export const COMPARISON_DIMENSIONS = [
  {
    dimension: '总预算',
    xinjiang: 72,
    yunnan: 85,
    note: '新疆长线自驾油费与包车成本更高；云南整体更易控制在预算内。',
  },
  {
    dimension: '交通复杂度',
    xinjiang: 58,
    yunnan: 84,
    note: '新疆城市间距离大、单段自驾长；云南高铁+短途更轻量。',
  },
  {
    dimension: '每日疲劳度',
    xinjiang: 55,
    yunnan: 83,
    note: '新疆易超过每日 4 小时驾驶限制；云南节奏更贴合"不太累"。',
  },
  {
    dimension: '自然风光',
    xinjiang: 94,
    yunnan: 82,
    note: '新疆辽阔景观优势明显；云南自然风光同样出色但更集中。',
  },
  {
    dimension: '文化学习价值',
    xinjiang: 78,
    yunnan: 90,
    note: '云南民族文化与游学资源更稳定、可组织度更高。',
  },
  {
    dimension: '天气风险',
    xinjiang: 70,
    yunnan: 74,
    note: '云南 8 月多雷阵雨但短时；新疆昼夜温差与局部天气变化更大。',
  },
  {
    dimension: '饮食适配度',
    xinjiang: 68,
    yunnan: 80,
    note: '两地都有辣味场景，但云南清淡可替代选择更多。',
  },
  {
    dimension: '安全与不确定性',
    xinjiang: 64,
    yunnan: 85,
    note: '新疆长途自驾路线不确定性更高；云南成熟线路更稳定。',
  },
  {
    dimension: '个性化匹配度',
    xinjiang: 70,
    yunnan: 89,
    note: '结合低强度+学习目标+饮食偏好，云南匹配度更高。',
  },
]

// 对比表下方的整体解读
export const COMPARISON_INSIGHTS = [
  '新疆自然风光更强，但自驾强度和路线不确定性更高。',
  '云南文化学习资源更稳定，交通更轻量，更符合"不太累"的偏好。',
  '云南饮食也有辣味场景，但可替代选择更多，比新疆长线自驾更容易控制节奏。',
  '如果特别追求辽阔自然景观，可以选择新疆；如果更看重稳定体验和学习内容，云南更优。',
]

// ---------------------------------------------------------------------------
// 9. AI 推荐理由（三张卡片）
// ---------------------------------------------------------------------------
export const RECOMMENDATION_CARDS = [
  {
    type: 'recommend',
    title: '为什么推荐云南',
    icon: 'ThumbsUp',
    points: [
      '交通以高铁+短途为主，避免长时间自驾，贴合"每日不超过 4 小时"。',
      '游学资源成熟，民族文化学习内容可组织度高。',
      '住宿与餐饮成本更可控，整体易落在 15000 预算内。',
      '清淡饮食可替代选择多，节奏更从容。',
    ],
  },
  {
    type: 'risk',
    title: '新疆方案的主要风险',
    icon: 'AlertTriangle',
    points: [
      '城市间距离大，单段自驾常超过 4 小时限制。',
      '路线与天气不确定性更高，机动调整成本大。',
      '长线自驾疲劳度高，与"不想太累"偏好冲突。',
      '整体预算更易超支。',
    ],
  },
  {
    type: 'confirm',
    title: '需要你确认的信息',
    icon: 'HelpCircle',
    points: [
      '是否能接受部分雨天改为室内活动？',
      '更偏向自然风光，还是学习体验？',
      '是否需要把酒店预算控制在每晚 500 元以内？',
    ],
  },
]

// ---------------------------------------------------------------------------
// 10. 行程草案（页面 3）
//     统一的 15 天列表：前 5 天详细（detail: true），后 10 天精简。
//     startDate 来自报告页补充的「出发日期」，用于在时间轴上展示具体日期。
//     region 用于按地区分组，让 15 天时间轴更有层次。
// ---------------------------------------------------------------------------
export const ITINERARY = {
  title: '云南 15 天游学行程草案',
  subtitle:
    '基于本次识别出的预算、节奏偏好和文化学习目标生成，可继续调整',
  startDate: '2026-08-10', // 报告页确认的出发日期
  days: [
    {
      day: 1,
      region: '昆明',
      city: '抵达昆明',
      activity: '入住、城市轻体验',
      transport: '机场到酒店',
      theme: null,
      risk: '低',
      budget: 600,
      detail: true,
    },
    {
      day: 2,
      region: '昆明',
      city: '昆明文化与城市观察',
      activity: '云南省博物馆、翠湖周边',
      transport: '市内短途',
      theme: '云南民族文化概览',
      risk: '低',
      budget: 450,
      detail: true,
    },
    {
      day: 3,
      region: '大理',
      city: '昆明 - 大理',
      activity: '古城轻游',
      transport: '高铁',
      theme: null,
      risk: '中低',
      budget: 700,
      detail: true,
    },
    {
      day: 4,
      region: '大理',
      city: '大理深度体验',
      activity: '洱海、白族文化体验',
      transport: '环洱海短途',
      theme: '地方文化与旅游商业化',
      risk: '低',
      budget: 550,
      detail: true,
    },
    {
      day: 5,
      region: '大理',
      city: '大理自由探索',
      activity: '低强度自由安排',
      transport: '步行为主',
      theme: null,
      risk: '低',
      budget: 400,
      detail: true,
    },
    {
      day: 6,
      region: '丽江',
      city: '大理 - 丽江',
      activity: '古城与纳西文化',
      transport: '高铁',
      theme: null,
      risk: '中低',
      budget: 650,
      detail: false,
    },
    {
      day: 7,
      region: '丽江',
      city: '丽江深度',
      activity: '玉龙雪山周边（低强度）',
      transport: '景区包车',
      theme: null,
      risk: '中',
      budget: 700,
      detail: false,
    },
    {
      day: 8,
      region: '丽江',
      city: '丽江游学',
      activity: '东巴文化学习',
      transport: '市内短途',
      theme: '东巴文化',
      risk: '低',
      budget: 500,
      detail: false,
    },
    {
      day: 9,
      region: '香格里拉',
      city: '丽江 - 香格里拉',
      activity: '海拔适应、轻活动',
      transport: '包车 / 班车',
      theme: null,
      risk: '中',
      budget: 750,
      detail: false,
    },
    {
      day: 10,
      region: '香格里拉',
      city: '香格里拉',
      activity: '藏族文化与自然',
      transport: '市内短途',
      theme: '藏族文化',
      risk: '中低',
      budget: 600,
      detail: false,
    },
    {
      day: 11,
      region: '香格里拉',
      city: '返程丽江过渡',
      activity: '机动缓冲日',
      transport: '返程班车',
      theme: null,
      risk: '低',
      budget: 450,
      detail: false,
    },
    {
      day: 12,
      region: '返程昆明',
      city: '丽江 - 昆明',
      activity: '高铁返回',
      transport: '高铁',
      theme: null,
      risk: '低',
      budget: 700,
      detail: false,
    },
    {
      day: 13,
      region: '返程昆明',
      city: '昆明周边',
      activity: '石林或自由安排',
      transport: '市内短途',
      theme: null,
      risk: '低',
      budget: 500,
      detail: false,
    },
    {
      day: 14,
      region: '返程昆明',
      city: '昆明学习复盘',
      activity: '游学内容整理',
      transport: '步行为主',
      theme: '游学复盘',
      risk: '低',
      budget: 400,
      detail: false,
    },
    {
      day: 15,
      region: '返程昆明',
      city: '昆明离程',
      activity: '返程',
      transport: '酒店到机场',
      theme: null,
      risk: '低',
      budget: 300,
      detail: false,
    },
  ],
}

// ---------------------------------------------------------------------------
// 11. 预算拆解（页面 3 右侧）
//     每个大类可展开子项明细，便于说明预算构成与占比。
// ---------------------------------------------------------------------------
export const BUDGET_BREAKDOWN = {
  items: [
    {
      label: '交通',
      amount: 3200,
      icon: 'TrainFront',
      note: '机票 + 城际高铁 + 景区包车',
      details: [
        { label: '往返机票（上海 ↔ 昆明）', amount: 1400 },
        { label: '城际高铁（昆明/大理/丽江）', amount: 900 },
        { label: '景区包车与短途', amount: 900 },
      ],
    },
    {
      label: '住宿',
      amount: 5200,
      icon: 'BedDouble',
      note: '14 晚，均价约 370 元/晚',
      details: [
        { label: '昆明 3 晚', amount: 1050 },
        { label: '大理 3 晚', amount: 1200 },
        { label: '丽江 3 晚', amount: 1200 },
        { label: '香格里拉 3 晚', amount: 1200 },
        { label: '返程过渡 2 晚', amount: 550 },
      ],
    },
    {
      label: '餐饮',
      amount: 2800,
      icon: 'Utensils',
      note: '15 天，约 187 元/天',
      details: [
        { label: '正餐（含清淡菜选）', amount: 1800 },
        { label: '特色小吃与茶饮', amount: 600 },
        { label: '零食与饮用水', amount: 400 },
      ],
    },
    {
      label: '门票与体验',
      amount: 2200,
      icon: 'Ticket',
      note: '含游学与文化体验课程',
      details: [
        { label: '玉龙雪山 / 景区门票', amount: 800 },
        { label: '博物馆与古城通票', amount: 500 },
        { label: '纳西/白族文化体验课', amount: 600 },
        { label: '手作与非遗工坊', amount: 300 },
      ],
    },
    {
      label: '预留机动',
      amount: 1600,
      icon: 'Wallet',
      note: '应对天气或行程调整',
      details: [
        { label: '天气改签 / Plan B 备用', amount: 900 },
        { label: '购物与杂项', amount: 700 },
      ],
    },
  ],
  total: 15000,
  travelers: 1,
  days: 15,
  note: '总计控制在 15000 以内',
}

// 11.1 行程概览统计（页面 3 右侧，多数由 ITINERARY 派生，这里放不便派生的补充信息）
export const TRIP_OVERVIEW = {
  origin: '上海',
  travelers: 1,
  cabin: '经济舱',
  intensity: '中低强度',
  dailyDrive: '≤ 4 小时',
}

// 11.2 游学主题亮点（右侧，呼应"文化学习"目标）
export const LEARNING_HIGHLIGHTS = [
  { region: '昆明', theme: '云南民族文化概览', icon: 'Landmark' },
  { region: '大理', theme: '白族文化与旅游商业化观察', icon: 'Building2' },
  { region: '丽江', theme: '纳西 · 东巴文化', icon: 'BookOpen' },
  { region: '香格里拉', theme: '藏族文化与高原自然', icon: 'Mountain' },
]

// 11.3 出行贴士（右侧，结合已识别偏好）
export const TRIP_TIPS = [
  { text: '8 月云南多雷阵雨，室内文化活动可随时替补户外行程', icon: 'CloudRain' },
  { text: '香格里拉海拔约 3300m，Day 9 已安排海拔适应缓冲', icon: 'Activity' },
  { text: '清淡饮食可选，古城餐厅多提供非辣菜品', icon: 'Utensils' },
  { text: '预留 1600 元机动预算，应对天气或行程调整', icon: 'Wallet' },
]

// 11.4 建议携带物品（右侧，按场景分组，呼应天气 / 海拔 / 游学主题）
export const PACKING_SUGGESTIONS = [
  {
    group: '天气应对',
    icon: 'CloudRain',
    items: ['轻便雨衣 / 折叠伞', '速干外套', '防滑鞋'],
  },
  {
    group: '高原防护',
    icon: 'Mountain',
    items: ['防晒霜与墨镜', '保湿唇膏', '常备葡萄糖 / 抗高反药'],
  },
  {
    group: '游学随行',
    icon: 'BookOpen',
    items: ['笔记本 / 便携相机', '充电宝', '零钱与身份证件'],
  },
]

// ---------------------------------------------------------------------------
// 12. 突发状况与 Plan B（页面 3 独立模块）
//     模拟旅行途中发生异常时，Agent 如何发现异常 → 分析影响 →
//     推荐 Plan B → 用户确认 → 执行动作 → 展示执行状态。
//     全部为 mock 数据，不真实调用 API、不真实下单。
// ---------------------------------------------------------------------------

// 12.1 突发状况提醒卡片
export const INCIDENT_ALERT = {
  title: '检测到行程异常',
  description:
    'Day 6 原计划前往玉龙雪山，但检测到明日有强降雨预警，部分户外项目可能暂停开放。',
  tags: ['天气预警', '景点开放风险', '影响 Day 6 行程'],
  impacts: [
    '原计划户外活动可能无法完成',
    '当日交通安排需要调整',
    '已预约的景区门票可能需要退改',
    '当晚酒店不受影响',
    '整体预算可能变化 200-500 元',
  ],
}

// 12.2 AI 推荐的 Plan B（三种决策偏好）
export const PLAN_B_OPTIONS = [
  {
    id: 'stable',
    tag: '稳定优先',
    tagIcon: 'ShieldCheck',
    title: '稳定优先：改为丽江市区文化体验',
    points: [
      '取消玉龙雪山户外行程',
      '改为丽江古城、木府、纳西文化体验',
      '保留原酒店，不改变住宿',
      '减少天气影响，移动成本最低',
    ],
    suitable: '不想折腾、希望保持舒适节奏的用户',
    changes: [
      { label: '预算变化', value: '减少约 180 元', tone: 'good' },
      { label: '交通变化', value: '减少长距离移动', tone: 'good' },
      { label: '风险等级', value: '低', tone: 'good' },
    ],
  },
  {
    id: 'experience',
    tag: '体验优先',
    tagIcon: 'Mountain',
    title: '体验优先：玉龙雪山顺延，调整 Day 7 行程',
    points: [
      '将玉龙雪山调整到 Day 7',
      'Day 6 改为室内文化活动',
      'Day 7 原计划顺延半天',
      '尽量保留核心自然风光体验',
    ],
    suitable: '仍然想保留雪山体验、愿意接受轻微行程调整的用户',
    changes: [
      { label: '预算变化', value: '增加约 260 元', tone: 'warn' },
      { label: '交通变化', value: '需重新预约 Day 7 车辆', tone: 'warn' },
      { label: '风险等级', value: '中', tone: 'warn' },
    ],
  },
  {
    id: 'budget',
    tag: '预算优先',
    tagIcon: 'Wallet',
    title: '预算优先：取消雪山项目，改为低成本城市慢游',
    points: [
      '取消雪山门票和车辆预约',
      '安排古城周边轻量游览',
      '增加自由时间',
      '控制额外支出',
    ],
    suitable: '希望控制预算、不想增加额外交通成本的用户',
    changes: [
      { label: '预算变化', value: '减少约 420 元', tone: 'good' },
      { label: '交通变化', value: '无需额外包车', tone: 'good' },
      { label: '风险等级', value: '低', tone: 'good' },
    ],
  },
]

// 12.3 各 Plan B 的执行动作清单
//      kind 决定执行时的行为：
//        auto    - 可自动更新，执行后直接完成
//        confirm - 需要用户二次确认（退改签 / 支付 / 预订 / 打车）
export const PLAN_B_ACTIONS = {
  stable: {
    title: '确认执行 Plan B：稳定优先',
    actions: [
      { id: 'refund-ticket', label: '申请退玉龙雪山门票', kind: 'confirm', note: '预计可退 90%，手续费约 30 元', confirmLabel: '确认退票' },
      { id: 'update-day6', label: '将 Day 6 行程改为丽江古城文化体验', kind: 'auto', note: '无需额外支付' },
      { id: 'update-calendar', label: '更新行程日历', kind: 'auto', note: '同步新的 Day 6 安排' },
      { id: 'notify', label: '通知同行人', kind: 'auto', note: '发送调整后的行程摘要' },
    ],
  },
  experience: {
    title: '确认执行 Plan B：体验优先',
    actions: [
      { id: 'reschedule-ticket', label: '申请修改玉龙雪山门票日期', kind: 'confirm', note: '预计可能产生 0-50 元手续费', confirmLabel: '确认门票改期' },
      { id: 'rebook-car', label: '重新预约 Day 7 往返车辆', kind: 'confirm', note: '预计增加约 180 元', confirmLabel: '确认车辆预约' },
      { id: 'update-day6', label: '将 Day 6 行程改为丽江文化体验', kind: 'auto', note: '无需额外支付' },
      { id: 'update-calendar', label: '更新行程日历', kind: 'auto', note: '同步新的 Day 6 / Day 7 安排' },
      { id: 'notify', label: '通知同行人', kind: 'auto', note: '发送调整后的行程摘要' },
    ],
  },
  budget: {
    title: '确认执行 Plan B：预算优先',
    actions: [
      { id: 'refund-ticket', label: '申请退玉龙雪山门票', kind: 'confirm', note: '预计可退 90%，手续费约 30 元', confirmLabel: '确认退票' },
      { id: 'cancel-car', label: '取消 Day 6 包车预约', kind: 'confirm', note: '免费取消，退还预付款', confirmLabel: '确认取消包车' },
      { id: 'update-day6', label: '将 Day 6 改为古城周边轻量游览', kind: 'auto', note: '无需额外支付' },
      { id: 'update-calendar', label: '更新行程日历', kind: 'auto', note: '同步新的 Day 6 安排' },
      { id: 'notify', label: '通知同行人', kind: 'auto', note: '发送调整后的行程摘要' },
    ],
  },
}

// ---------------------------------------------------------------------------
// 13. 顶部结论区（报告页）
// ---------------------------------------------------------------------------
export const REPORT_HEADER = {
  title: '新疆自驾 vs 云南游学：AI 旅行决策报告',
  subtitle: '基于你提交的旅行偏好、预算限制和节奏要求生成',
  recommendedLabel: '云南 15 天游学',
  oneLineReason:
    '相比新疆自驾，云南游学在交通强度、文化学习资源、饮食适配、预算可控性和行程稳定性上更符合当前需求。',
}

// ---------------------------------------------------------------------------
// 14. 机票模拟查询结果（补充出行信息后展示）
// ---------------------------------------------------------------------------
export const FLIGHT_RESULTS = [
  {
    route: '上海 → 乌鲁木齐',
    plan: 'xinjiang',
    price: '经济舱参考价：1800-2600 元',
    duration: '飞行时间：约 5-6 小时',
    notes: ['直飞班次较少，价格波动较大', '旺季建议提前锁定'],
  },
  {
    route: '上海 → 昆明',
    plan: 'yunnan',
    price: '经济舱参考价：900-1500 元',
    duration: '飞行时间：约 3-4 小时',
    notes: ['直飞选择更多', '价格和班次稳定性更好'],
  },
]

// 预订机票需要收集的信息（弹窗）
export const BOOKING_FIELDS = [
  '乘机人姓名',
  '证件类型',
  '证件号码',
  '手机号',
  '联系邮箱',
  '是否需要报销凭证',
]

// ---------------------------------------------------------------------------
// 15. 两个方案的独立分析报告
//     把"工具调用后的结果"转化为用户能理解的分析。
// ---------------------------------------------------------------------------
export const PLAN_REPORTS = [
  {
    id: 'xinjiang',
    tag: '方案 A',
    title: '新疆 15 天自驾',
    fit: '适合追求强自然风光、愿意接受长距离移动、能适应较高自驾强度的人。',
    sections: [
      {
        key: 'transport',
        title: '交通与机票',
        icon: 'Plane',
        points: [
          '飞往乌鲁木齐成本相对更高',
          '直飞选择相对有限',
          '到达后仍需要大量地面自驾',
          '若每日驾驶不超过 4 小时，路线范围需要明显收缩',
        ],
        picks: [
          { name: '上海 ↔ 乌鲁木齐机票', desc: '经济舱约 1800-2600 元，建议提前 30 天锁定' },
          { name: '推荐环线：乌市-赛里木湖-喀纳斯', desc: '北疆经典线，单段车程常超 4 小时需拆分' },
          { name: 'SUV / 越野租车', desc: '约 400-600 元/天，长途自驾更稳妥' },
          { name: '景区区间车 / 包车', desc: '喀纳斯等景区禁自驾，需换乘区间车' },
        ],
      },
      {
        key: 'budget',
        title: '住宿与预算',
        icon: 'Wallet',
        points: [
          '热门景区周边旺季住宿价格波动较大',
          '自驾路线中住宿质量可能不均衡',
          '租车、油费、停车和异地交通会增加隐性成本',
          '15000 元预算可行，但需要严格控制路线和住宿标准',
        ],
        picks: [
          { name: '乌鲁木齐市区酒店', desc: '连锁商务型，约 300-450 元/晚' },
          { name: '喀纳斯景区木屋', desc: '旺季紧俏，约 600-900 元/晚' },
          { name: '越野租车 + 油费', desc: '15 天约 6000-8000 元隐性成本' },
        ],
      },
      {
        key: 'diet',
        title: '饮食适配',
        icon: 'Utensils',
        points: [
          '牛羊肉、面食、烧烤、奶制品较多',
          '辣度整体可控，但口味偏重',
          '长线自驾途中清淡饮食选择受路线影响',
        ],
        picks: [
          { name: '五一夜市（乌鲁木齐）', desc: '烤包子、手抓饭、缸子肉，口味偏重' },
          { name: '喀什老城茶馆', desc: '馕、奶茶与清淡主食，可避辣' },
          { name: '沿途牧家乐', desc: '手抓羊肉为主，清淡菜品选择有限' },
        ],
      },
      {
        key: 'nature',
        title: '自然风光',
        icon: 'Mountain',
        points: [
          '雪山、草原、湖泊、峡谷、沙漠等景观冲击力强',
          '如果核心目标是极致自然风光，新疆优势明显',
        ],
        picks: [
          { name: '喀纳斯湖', desc: '雪山森林湖泊，秋色尤佳，需长距离自驾' },
          { name: '赛里木湖', desc: '高山湖泊，环湖公路风光开阔' },
          { name: '独库公路', desc: '一日跨四季的经典自驾路线，强度较高' },
          { name: '巴音布鲁克草原', desc: '九曲十八弯日落，草原辽阔' },
        ],
      },
      {
        key: 'risk',
        title: '风险与不确定性',
        icon: 'AlertTriangle',
        points: [
          '路线距离长',
          '天气和路况影响较大',
          '自驾疲劳度高',
          '临时调整成本高',
        ],
      },
    ],
    summary:
      '新疆更像一次高强度自然风光探索，适合把自然景观作为第一目标，但和"不想太累、每天开车不超过 4 小时"的要求存在冲突。',
  },
  {
    id: 'yunnan',
    tag: '方案 B',
    title: '云南 15 天游学',
    recommended: true,
    fit: '适合希望自然风光、文化学习和舒适节奏平衡的人。',
    sections: [
      {
        key: 'transport',
        title: '交通与机票',
        icon: 'Plane',
        points: [
          '飞往昆明机票价格更低，班次更多',
          '到达后可通过高铁、包车、短途交通连接昆明、大理、丽江等地',
          '每日移动时间更容易控制',
          '更适合中低强度行程',
        ],
        picks: [
          { name: '上海 ↔ 昆明机票', desc: '经济舱约 900-1500 元，直飞班次多' },
          { name: '昆明-大理-丽江高铁', desc: '动车约 2 小时/段，145-220 元，最省心' },
          { name: '丽江 ↔ 香格里拉包车', desc: '约 500-700 元/车，途中可停虎跳峡' },
          { name: '市内网约车 / 打车', desc: '古城间起步 10-20 元，短途首选' },
          { name: '洱海电动车 / 骑行', desc: '环海租车约 60-100 元/天，低强度自由' },
        ],
      },
      {
        key: 'budget',
        title: '住宿与预算',
        icon: 'Wallet',
        points: [
          '昆明、大理、丽江等地住宿供给成熟',
          '酒店和民宿价格带丰富',
          '更容易在 15000 元预算内做出舒适方案',
          '预算可控性优于新疆',
        ],
        picks: [
          { name: '大理古城 / 洱海民宿', desc: '海景房约 400-600 元/晚，性价比高' },
          { name: '丽江束河古镇客栈', desc: '纳西院落风格，约 350-500 元/晚' },
          { name: '香格里拉独克宗客栈', desc: '藏式风格，约 300-450 元/晚' },
        ],
      },
      {
        key: 'diet',
        title: '饮食适配',
        icon: 'Utensils',
        points: [
          '云南饮食也有酸辣特色，但城市餐饮选择更多',
          '清淡选择和替代餐厅更容易找到',
          '对"不太能吃辣"的用户更友好',
        ],
        picks: [
          { name: '福照楼（昆明）', desc: '汽锅鸡清淡鲜香，招牌不辣' },
          { name: '再回首过桥米线', desc: '汤底可选清汤，辣度自选' },
          { name: '洱海边喜洲粑粑', desc: '甜咸两味小吃，白族特色' },
          { name: '丽江腊排骨火锅', desc: '菌汤锅底清淡，可不加辣' },
        ],
      },
      {
        key: 'nature',
        title: '自然与文化学习',
        icon: 'GraduationCap',
        points: [
          '自然风光包括洱海、雪山、古城、田园、民族村落',
          '民族文化、非遗体验、地方历史和城市观察资源丰富',
          '更容易形成"自然风光 + 文化学习"的游学主题',
        ],
        picks: [
          { name: '洱海生态廊道', desc: '骑行看苍山洱海，低强度自然风光' },
          { name: '云南省博物馆', desc: '系统了解云南民族与历史脉络' },
          { name: '大理喜洲白族扎染坊', desc: '非遗手作体验，适合游学' },
          { name: '丽江东巴文化研究院', desc: '纳西象形文字与东巴文化学习' },
          { name: '玉龙雪山（低强度）', desc: '索道+云杉坪，避开高强度徒步' },
        ],
      },
      {
        key: 'risk',
        title: '风险与不确定性',
        icon: 'AlertTriangle',
        points: [
          '雨季可能影响部分户外活动',
          '但可替换为博物馆、手作体验、城市观察、文化课程等室内活动',
          '行程调整弹性更高',
        ],
      },
    ],
    summary:
      '云南更像一次节奏稳定、内容丰富、风险可控的游学旅行，更符合当前偏好。',
  },
]

// ---------------------------------------------------------------------------
// 16. 最终对比表（每格用短句，非分数），并标注推荐方
// ---------------------------------------------------------------------------
export const FINAL_COMPARISON = [
  {
    dimension: '机票成本与班次稳定性',
    xinjiang: '飞乌鲁木齐更贵，直飞少、波动大',
    yunnan: '飞昆明更便宜，班次多、更稳定',
    winner: 'yunnan',
  },
  {
    dimension: '到达后交通强度',
    xinjiang: '需大量长距离自驾，易超 4 小时',
    yunnan: '高铁+短途连接，每日移动可控',
    winner: 'yunnan',
  },
  {
    dimension: '预算可控性',
    xinjiang: '隐性成本多，需严格控制',
    yunnan: '价格带丰富，更易压在预算内',
    winner: 'yunnan',
  },
  {
    dimension: '住宿稳定性',
    xinjiang: '沿线质量不均，旺季波动大',
    yunnan: '城市供给成熟，选择稳定',
    winner: 'yunnan',
  },
  {
    dimension: '饮食适配度',
    xinjiang: '口味偏重，清淡选择受路线限制',
    yunnan: '替代餐厅多，对不吃辣更友好',
    winner: 'yunnan',
  },
  {
    dimension: '自然风光强度',
    xinjiang: '雪山草原沙漠，冲击力极强',
    yunnan: '洱海古城田园，同样出色但更集中',
    winner: 'xinjiang',
  },
  {
    dimension: '文化学习价值',
    xinjiang: '有地域文化，但组织度一般',
    yunnan: '民族文化与游学资源丰富稳定',
    winner: 'yunnan',
  },
  {
    dimension: '行程灵活性',
    xinjiang: '路线长，临时调整成本高',
    yunnan: '雨天可转室内，调整弹性高',
    winner: 'yunnan',
  },
  {
    dimension: '与当前偏好的匹配度',
    xinjiang: '与"不想太累"存在冲突',
    yunnan: '契合低强度+学习+清淡饮食',
    winner: 'yunnan',
  },
]

// 最终推荐卡片
export const FINAL_RECOMMENDATION = {
  plan: '云南 15 天游学',
  reasons: [
    '机票和城市交通成本更可控',
    '更容易控制每日移动强度',
    '更符合文化学习目标',
    '饮食和住宿选择更灵活',
    '遇到天气变化时更容易调整',
    '更适合"不想太累"的旅行节奏',
  ],
}

// 若仍想选新疆的调整建议
export const XINJIANG_ADJUSTMENTS = [
  '缩小自驾范围',
  '每天驾驶控制在 3-4 小时',
  '增加缓冲天数',
  '提前锁定住宿和车辆',
  '把自然风光作为主目标，降低文化学习任务比重',
]



