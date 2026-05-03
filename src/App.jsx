import { useState } from "react"

export default function App() {
  const [dark, setDark] = useState(true)
  const [page, setPage] = useState("home")

  const subjects = [
    { id: "irrigation", name: "Irrigation Engineering", icon: "💧", topics: 24 },
    { id: "soil", name: "Soil Science", icon: "🌱", topics: 30 },
    { id: "machinery", name: "Farm Machinery", icon: "⚙️", topics: 20 },
    { id: "agronomy", name: "Agronomy", icon: "🌾", topics: 28 },
    { id: "hydrology", name: "Hydrology", icon: "🌊", topics: 18 },
    { id: "renewable", name: "Renewable Energy", icon: "☀️", topics: 16 },
  ]

  const exams = [
    { name: "GATE Agriculture", icon: "🎓", date: "Feb 2025" },
    { name: "ICAR JRF", icon: "🔬", date: "Jun 2025" },
    { name: "OPSC AAE", icon: "🏛️", date: "Mar 2025" },
    { name: "CUET", icon: "📋", date: "May 2025" },
  ]

  const bg = dark ? "#0d0d14" : "#f4f5f7"
  const card = dark ? "#17171f" : "#ffffff"
  const text = dark ? "#f1f1f3" : "#0f172a"
  const muted = dark ? "#52526a" : "#94a3b8"
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)"

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "system-ui, sans-serif" }}>

      {/* TOP BAR */}
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "space-between", background: card, position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }}>🌾</span>
          <span style={{ fontWeight: 900, fontSize: 18 }}>AgriPrep Library</span>
        </div>
        <button onClick={() => setDark(!dark)} style={{ padding: "8px 16px", borderRadius: 10, border: "none", background: "#6366F1", color: "white", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* NAV TABS */}
      <div style={{ display: "flex", gap: 8, padding: "16px 20px", overflowX: "auto" }}>
        {["home", "subjects", "exams", "progress"].map(tab => (
          <button key={tab} onClick={() => setPage(tab)} style={{ padding: "8px 18px", borderRadius: 20, border: "none", background: page === tab ? "#6366F1" : card, color: page === tab ? "white" : muted, fontWeight: 700, cursor: "pointer", fontSize: 13, whiteSpace: "nowrap", boxShadow: page === tab ? "0 4px 12px rgba(99,102,241,0.3)" : "none" }}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ padding: "0 20px 40px" }}>

        {/* HOME PAGE */}
        {page === "home" && (
          <div>
            <div style={{ padding: "24px 0 16px" }}>
              <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 6 }}>Good morning, Arindam! 🌱</h1>
              <p style={{ color: muted, fontSize: 14 }}>Your GATE exam is in <strong style={{ color: "#6366F1" }}>87 days</strong>. Keep pushing!</p>
            </div>

            {/* STATS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              {[
                { icon: "📚", label: "Topics Covered", value: "47/136" },
                { icon: "✏️", label: "MCQs Practiced", value: "680" },
                { icon: "📋", label: "PYQs Solved", value: "124" },
                { icon: "🔥", label: "Study Streak", value: "12 days" },
              ].map((s, i) => (
                <div key={i} style={{ padding: 16, borderRadius: 16, background: card, border: `1px solid ${border}` }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 900 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: muted, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CONTINUE LEARNING */}
            <h2 style={{ fontWeight: 800, marginBottom: 12, fontSize: 16 }}>▶ Continue Learning</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {subjects.slice(0, 3).map((s, i) => (
                <div key={i} onClick={() => setPage("subjects")} style={{ padding: 16, borderRadius: 16, background: card, border: `1px solid ${border}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 28 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{s.name}</p>
                    <div style={{ height: 4, borderRadius: 4, background: border, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(i + 1) * 20}%`, background: "#6366F1", borderRadius: 4 }}/>
                    </div>
                  </div>
                  <span style={{ color: muted, fontSize: 12 }}>{(i + 1) * 20}%</span>
                </div>
              ))}
            </div>

            {/* EXAMS */}
            <h2 style={{ fontWeight: 800, marginBottom: 12, fontSize: 16 }}>🎯 Exams</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {exams.map((e, i) => (
                <div key={i} onClick={() => setPage("exams")} style={{ padding: 16, borderRadius: 16, background: card, border: `1px solid ${border}`, cursor: "pointer" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{e.icon}</div>
                  <p style={{ fontWeight: 700, fontSize: 13 }}>{e.name}</p>
                  <p style={{ color: muted, fontSize: 11, marginTop: 4 }}>{e.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBJECTS PAGE */}
        {page === "subjects" && (
          <div>
            <h2 style={{ fontWeight: 900, fontSize: 22, padding: "20px 0 16px" }}>📚 Subject Library</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {subjects.map((s, i) => (
                <div key={i} style={{ padding: 20, borderRadius: 16, background: card, border: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 14, background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{s.icon}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, marginBottom: 6 }}>{s.name}</p>
                    <p style={{ color: muted, fontSize: 12, marginBottom: 8 }}>{s.topics} topics</p>
                    <div style={{ height: 4, borderRadius: 4, background: border, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(i + 1) * 12}%`, background: "#6366F1", borderRadius: 4 }}/>
                    </div>
                  </div>
                  <button style={{ padding: "8px 14px", borderRadius: 10, border: "none", background: "rgba(99,102,241,0.15)", color: "#818CF8", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Open →</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXAMS PAGE */}
        {page === "exams" && (
          <div>
            <h2 style={{ fontWeight: 900, fontSize: 22, padding: "20px 0 16px" }}>🎯 Exam Preparation</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {exams.map((e, i) => (
                <div key={i} style={{ padding: 20, borderRadius: 16, background: card, border: `1px solid ${border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <span style={{ fontSize: 36 }}>{e.icon}</span>
                    <div>
                      <p style={{ fontWeight: 800, fontSize: 16 }}>{e.name}</p>
                      <p style={{ color: muted, fontSize: 12 }}>{e.date}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: "rgba(99,102,241,0.15)", color: "#818CF8", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Syllabus</button>
                    <button style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: "#6366F1", color: "white", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>PYQ Papers</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROGRESS PAGE */}
        {page === "progress" && (
          <div>
            <h2 style={{ fontWeight: 900, fontSize: 22, padding: "20px 0 16px" }}>📊 My Progress</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {subjects.map((s, i) => (
                <div key={i} style={{ padding: 16, borderRadius: 16, background: card, border: `1px solid ${border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 20 }}>{s.icon}</span>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</span>
                    </div>
                    <span style={{ color: "#6366F1", fontWeight: 800, fontSize: 14 }}>{(i + 1) * 12}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 6, background: border, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(i + 1) * 12}%`, background: "linear-gradient(90deg, #6366F1, #8B5CF6)", borderRadius: 6 }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <div style={{ textAlign: "center", padding: "20px", borderTop: `1px solid ${border}`, color: muted, fontSize: 13 }}>
        Made with ❤️ by <strong style={{ color: "#6366F1" }}>Arindam</strong>
      </div>

    </div>
  )
                }
