import { useState } from "react"

export default function App() {
  const [dark, setDark] = useState(true)
  
  return (
    <div style={{
      minHeight: "100vh",
      background: dark ? "#0d0d14" : "#f4f5f7",
      color: dark ? "white" : "black",
      fontFamily: "sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 20
    }}>
      <div style={{fontSize: 60}}>🌾</div>
      <h1 style={{fontSize: 32, fontWeight: 900}}>AgriPrep Library</h1>
      <p style={{opacity: 0.6}}>Your GATE & ICAR Study Platform</p>
      <button onClick={() => setDark(!dark)} style={{
        padding: "10px 24px",
        borderRadius: 12,
        border: "none",
        background: "#6366F1",
        color: "white",
        fontWeight: 700,
        cursor: "pointer"
      }}>
        Toggle {dark ? "Light" : "Dark"} Mode
      </button>
    </div>
  )
}
