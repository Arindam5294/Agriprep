import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SUBJECTS = [
  {
    id: "irrigation",
    name: "Irrigation Engineering",
    icon: "💧",
    color: "#3B82F6",
    gradient: "from-blue-500 to-cyan-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    topics: 24,
    chapters: [
      { id: "ir-1", title: "Soil-Water-Plant Relationships", type: "notes", pages: 38, completed: true },
      { id: "ir-2", title: "Water Requirements of Crops", type: "notes", pages: 45, completed: true },
      { id: "ir-3", title: "Irrigation Methods & Efficiencies", type: "notes", pages: 52, completed: false },
      { id: "ir-4", title: "Drip & Sprinkler Irrigation", type: "notes", pages: 29, completed: false },
      { id: "ir-5", title: "Canal Irrigation Systems", type: "notes", pages: 41, completed: false },
      { id: "ir-6", title: "Groundwater & Wells", type: "notes", pages: 33, completed: false },
    ],
    pyqs: [
      { year: 2023, exam: "GATE", questions: 15 },
      { year: 2022, exam: "GATE", questions: 12 },
      { year: 2023, exam: "ICAR", questions: 20 },
      { year: 2022, exam: "ICAR", questions: 18 },
    ],
    mcqs: [{ id: "ir-mcq-1", title: "Irrigation Fundamentals", questions: 50 }, { id: "ir-mcq-2", title: "Advanced Irrigation Systems", questions: 40 }],
  },
  {
    id: "soil",
    name: "Soil Science",
    icon: "🌱",
    color: "#10B981",
    gradient: "from-emerald-500 to-green-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    topics: 30,
    chapters: [
      { id: "ss-1", title: "Soil Formation & Classification", type: "notes", pages: 44, completed: true },
      { id: "ss-2", title: "Soil Physical Properties", type: "notes", pages: 38, completed: true },
      { id: "ss-3", title: "Soil Chemical Properties", type: "notes", pages: 41, completed: true },
      { id: "ss-4", title: "Soil Microbiology", type: "notes", pages: 35, completed: false },
      { id: "ss-5", title: "Nutrient Cycles in Soil", type: "notes", pages: 48, completed: false },
      { id: "ss-6", title: "Soil Conservation", type: "notes", pages: 30, completed: false },
    ],
    pyqs: [
      { year: 2023, exam: "GATE", questions: 18 },
      { year: 2022, exam: "GATE", questions: 16 },
      { year: 2023, exam: "ICAR", questions: 25 },
    ],
    mcqs: [{ id: "ss-mcq-1", title: "Soil Basics", questions: 60 }, { id: "ss-mcq-2", title: "Soil Fertility & Management", questions: 45 }],
  },
  {
    id: "machinery",
    name: "Farm Machinery",
    icon: "⚙️",
    color: "#F59E0B",
    gradient: "from-amber-500 to-yellow-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    topics: 20,
    chapters: [
      { id: "fm-1", title: "Tractors & Power Sources", type: "notes", pages: 50, completed: true },
      { id: "fm-2", title: "Tillage Implements", type: "notes", pages: 42, completed: false },
      { id: "fm-3", title: "Sowing & Planting Machines", type: "notes", pages: 36, completed: false },
      { id: "fm-4", title: "Harvesting Machinery", type: "notes", pages: 45, completed: false },
      { id: "fm-5", title: "Post-Harvest Technology", type: "notes", pages: 38, completed: false },
    ],
    pyqs: [
      { year: 2023, exam: "GATE", questions: 12 },
      { year: 2022, exam: "GATE", questions: 14 },
    ],
    mcqs: [{ id: "fm-mcq-1", title: "Machinery Fundamentals", questions: 55 }],
  },
  {
    id: "agronomy",
    name: "Agronomy",
    icon: "🌾",
    color: "#8B5CF6",
    gradient: "from-violet-500 to-purple-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    topics: 28,
    chapters: [
      { id: "ag-1", title: "Crop Production Principles", type: "notes", pages: 55, completed: true },
      { id: "ag-2", title: "Kharif & Rabi Crops", type: "notes", pages: 62, completed: true },
      { id: "ag-3", title: "Weed Science", type: "notes", pages: 40, completed: false },
      { id: "ag-4", title: "Crop Physiology", type: "notes", pages: 48, completed: false },
      { id: "ag-5", title: "Cropping Systems", type: "notes", pages: 35, completed: false },
    ],
    pyqs: [
      { year: 2023, exam: "GATE", questions: 20 },
      { year: 2023, exam: "ICAR", questions: 30 },
      { year: 2023, exam: "OPSC", questions: 25 },
    ],
    mcqs: [{ id: "ag-mcq-1", title: "Crop Science Basics", questions: 70 }, { id: "ag-mcq-2", title: "Agronomy Practice Set", questions: 50 }],
  },
  {
    id: "hydrology",
    name: "Hydrology",
    icon: "🌊",
    color: "#06B6D4",
    gradient: "from-cyan-500 to-teal-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    topics: 18,
    chapters: [
      { id: "hy-1", title: "Hydrological Cycle", type: "notes", pages: 32, completed: false },
      { id: "hy-2", title: "Precipitation Analysis", type: "notes", pages: 40, completed: false },
      { id: "hy-3", title: "Runoff & Streamflow", type: "notes", pages: 45, completed: false },
      { id: "hy-4", title: "Flood Estimation", type: "notes", pages: 38, completed: false },
      { id: "hy-5", title: "Watershed Management", type: "notes", pages: 42, completed: false },
    ],
    pyqs: [
      { year: 2023, exam: "GATE", questions: 14 },
      { year: 2022, exam: "GATE", questions: 10 },
    ],
    mcqs: [{ id: "hy-mcq-1", title: "Hydrology Fundamentals", questions: 45 }],
  },
  {
    id: "renewable",
    name: "Renewable Energy",
    icon: "☀️",
    color: "#EF4444",
    gradient: "from-red-500 to-orange-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    topics: 16,
    chapters: [
      { id: "re-1", title: "Solar Energy Systems", type: "notes", pages: 36, completed: false },
      { id: "re-2", title: "Biogas & Biomass", type: "notes", pages: 30, completed: false },
      { id: "re-3", title: "Wind Energy", type: "notes", pages: 28, completed: false },
      { id: "re-4", title: "Rural Energy Applications", type: "notes", pages: 32, completed: false },
    ],
    pyqs: [
      { year: 2023, exam: "GATE", questions: 8 },
    ],
    mcqs: [{ id: "re-mcq-1", title: "Renewable Energy Basics", questions: 35 }],
  },
];

const EXAMS = [
  {
    id: "gate",
    name: "GATE Agriculture",
    shortName: "GATE",
    icon: "🎓",
    color: "#6366F1",
    gradient: "from-indigo-500 to-violet-500",
    description: "Graduate Aptitude Test in Engineering – Agricultural Engineering",
    examDate: "Feb 2025",
    totalMarks: 100,
    duration: "3 Hours",
    syllabus: [
      { section: "Section A: General Aptitude", weightage: "15%", topics: ["Verbal Ability", "Numerical Ability", "Data Interpretation"] },
      { section: "Section B: Engineering Mathematics", weightage: "13%", topics: ["Linear Algebra", "Calculus", "Differential Equations", "Probability & Statistics"] },
      { section: "Section C: Agricultural Engineering Core", weightage: "72%", topics: ["Farm Machinery & Power", "Soil & Water Conservation", "Irrigation & Drainage", "Agro Processing", "Food Technology"] },
    ],
    strategy: [
      { phase: "Foundation (Month 1-2)", tip: "Cover all NCERT basics and standard textbooks for core subjects" },
      { phase: "Practice (Month 3-4)", tip: "Solve previous 10 years papers and identify weak areas" },
      { phase: "Revision (Month 5)", tip: "Make concise notes and revise formulas daily" },
      { phase: "Mock Tests (Month 6)", tip: "Give full mock tests every 3 days and analyse performance" },
    ],
    papers: [
      { year: 2024, questions: 65, link: "#" },
      { year: 2023, questions: 65, link: "#" },
      { year: 2022, questions: 65, link: "#" },
      { year: 2021, questions: 65, link: "#" },
      { year: 2020, questions: 65, link: "#" },
    ],
  },
  {
    id: "icar",
    name: "ICAR JRF",
    shortName: "ICAR",
    icon: "🔬",
    color: "#10B981",
    gradient: "from-emerald-500 to-teal-500",
    description: "Indian Council of Agricultural Research – Junior Research Fellowship",
    examDate: "Jun 2025",
    totalMarks: 200,
    duration: "2.5 Hours",
    syllabus: [
      { section: "Part A: Common Core", weightage: "25%", topics: ["Reasoning", "English Language", "Agricultural Science Basics"] },
      { section: "Part B: Agricultural Engineering", weightage: "75%", topics: ["Soil & Water Engineering", "Farm Power & Machinery", "Irrigation Engineering", "Post-Harvest Technology"] },
    ],
    strategy: [
      { phase: "Phase 1: Basics", tip: "Master fundamental concepts in Agronomy, Soil Science, and Irrigation" },
      { phase: "Phase 2: Applied Concepts", tip: "Focus on application-based questions and numerical problems" },
      { phase: "Phase 3: PYQ Analysis", tip: "Analyse last 5 year papers topic-wise and identify patterns" },
      { phase: "Phase 4: Speed Practice", tip: "Practice 200 MCQs daily to improve speed and accuracy" },
    ],
    papers: [
      { year: 2023, questions: 120, link: "#" },
      { year: 2022, questions: 120, link: "#" },
      { year: 2021, questions: 120, link: "#" },
      { year: 2020, questions: 120, link: "#" },
    ],
  },
  {
    id: "opsc",
    name: "OPSC AAE",
    shortName: "OPSC",
    icon: "🏛️",
    color: "#F59E0B",
    gradient: "from-amber-500 to-orange-500",
    description: "Odisha Public Service Commission – Assistant Agriculture Engineer",
    examDate: "Mar 2025",
    totalMarks: 300,
    duration: "3 Hours",
    syllabus: [
      { section: "Paper I: General Studies", weightage: "33%", topics: ["Current Affairs", "Odisha History & Culture", "General Science"] },
      { section: "Paper II: Agriculture Engineering", weightage: "67%", topics: ["Irrigation & Drainage", "Farm Mechanization", "Soil Conservation", "Rural Engineering"] },
    ],
    strategy: [
      { phase: "Odisha Focus", tip: "Study Odisha-specific agriculture schemes, rivers, and irrigation projects" },
      { phase: "Technical Depth", tip: "Deep dive into irrigation engineering and soil conservation" },
      { phase: "General Studies", tip: "Follow OPSC-specific current affairs and Odisha GK" },
      { phase: "Interview Prep", tip: "Prepare for the personality test with current agricultural policy awareness" },
    ],
    papers: [
      { year: 2022, questions: 100, link: "#" },
      { year: 2021, questions: 100, link: "#" },
      { year: 2019, questions: 100, link: "#" },
    ],
  },
  {
    id: "cuet",
    name: "CUET / Odisha CET",
    shortName: "CUET",
    icon: "📋",
    color: "#EC4899",
    gradient: "from-pink-500 to-rose-500",
    description: "Central Universities Entrance Test & Odisha Common Entrance Test",
    examDate: "May 2025",
    totalMarks: 400,
    duration: "3.5 Hours",
    syllabus: [
      { section: "Language Test", weightage: "25%", topics: ["Reading Comprehension", "Grammar", "Vocabulary"] },
      { section: "Domain Subjects", weightage: "50%", topics: ["Agriculture", "Biology", "Chemistry", "Physics"] },
      { section: "General Test", weightage: "25%", topics: ["General Knowledge", "Current Affairs", "Logical Reasoning"] },
    ],
    strategy: [
      { phase: "Class 12 Level", tip: "Revise all NCERT Agriculture/Biology topics thoroughly" },
      { phase: "Domain Mastery", tip: "Focus on high-weightage domain subjects and practice MCQs" },
      { phase: "Speed Building", tip: "CUET requires speed — practice timed sections regularly" },
      { phase: "Mock Tests", tip: "Attempt NTA-style full mock tests weekly" },
    ],
    papers: [
      { year: 2024, questions: 200, link: "#" },
      { year: 2023, questions: 200, link: "#" },
      { year: 2022, questions: 200, link: "#" },
    ],
  },
];

const QUICK_STATS = [
  { label: "Topics Covered", value: "47", total: "136", icon: "📚" },
  { label: "MCQs Practiced", value: "680", total: "2400", icon: "✏️" },
  { label: "PYQs Solved", value: "124", total: "450", icon: "📋" },
  { label: "Study Streak", value: "12", suffix: "days", icon: "🔥" },
];

const STUDY_PLAN = [
  { day: "Mon", subject: "Irrigation Engineering", topic: "Drip Irrigation Systems", duration: "2h", done: true },
  { day: "Tue", subject: "Soil Science", topic: "Soil Physical Properties", duration: "1.5h", done: true },
  { day: "Wed", subject: "Farm Machinery", topic: "Tractors & Power", duration: "2h", done: true },
  { day: "Thu", subject: "Hydrology", topic: "Precipitation Analysis", duration: "2h", done: false, today: true },
  { day: "Fri", subject: "Agronomy", topic: "Kharif Crops", duration: "1.5h", done: false },
  { day: "Sat", subject: "Renewable Energy", topic: "Solar Energy", duration: "1h", done: false },
  { day: "Sun", subject: "Revision", topic: "Full Mock Test", duration: "3h", done: false },
];

// ─── ICONS ───────────────────────────────────────────────────────────────────

const Icon = ({ name, size = 16, className = "" }) => {
  const icons = {
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    book: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
    target: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    chart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    bookmark: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>,
    sun: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    moon: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}><polyline points="20 6 9 17 4 12"/></svg>,
    chevronRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="9 18 15 12 9 6"/></svg>,
    chevronDown: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="6 9 12 15 18 9"/></svg>,
    file: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    play: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    clock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    zap: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    info: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  };
  return icons[name] || null;
};

// ─── CIRCULAR PROGRESS ───────────────────────────────────────────────────────

const CircularProgress = ({ value, max, size = 80, color = "#6366F1", label, sublabel }) => {
  const pct = Math.round((value / max) * 100);
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * (pct / 100);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6"/>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="6"
            strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1s ease" }}/>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-base font-bold" style={{ color }}>{pct}%</span>
        </div>
      </div>
      {label && <span className="text-xs font-semibold text-center leading-tight" style={{ color: "var(--text-secondary)" }}>{label}</span>}
      {sublabel && <span className="text-xs" style={{ color: "var(--text-muted)" }}>{sublabel}</span>}
    </div>
  );
};

// ─── MINI BAR CHART ──────────────────────────────────────────────────────────

const MiniBarChart = ({ data, color }) => {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end gap-1 h-12">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <div className="w-full rounded-sm transition-all duration-700" style={{ height: `${(d.value / max) * 44}px`, background: color, opacity: 0.7 + (i / data.length) * 0.3 }}/>
          <span className="text-xs" style={{ color: "var(--text-muted)", fontSize: 9 }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
};

// ─── PDF VIEWER MODAL ────────────────────────────────────────────────────────

const PDFViewerModal = ({ chapter, subject, onClose, 
