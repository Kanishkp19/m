import { useState } from "react";
import AboutTab from "./tabs/AboutTab.jsx";
import {
  HeroTab, ResumeTab, ServicesTab, ProcessTab,
  ProjectsTab, SkillsTab, ExperienceTab, ContactTab,
} from "./tabs/OtherTabs.jsx";

const teal = "#0d7377";
const uid = () => Math.random().toString(36).slice(2, 8);

const TABS = ["about", "hero", "services", "process", "projects", "skills", "experience", "contact", "resume"];

export default function AdminPanel({ data, onSave, onClose, saving, saveProgress }) {
  const [local, setLocal] = useState(JSON.parse(JSON.stringify(data)));
  const [tab, setTab] = useState("about");
  const [saveError, setSaveError] = useState("");

  // ── Generic state helpers ─────────────────────────────────────────────────
  const set = (section, key, value) =>
    setLocal((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));

  const setItem = (section, key, index, field, value) =>
    setLocal((prev) => {
      const arr = [...prev[section][key]];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [section]: { ...prev[section], [key]: arr } };
    });

  const addItem = (section, key, template) =>
    setLocal((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: [...prev[section][key], { ...template, _id: uid() }] },
    }));

  const removeItem = (section, key, index) =>
    setLocal((prev) => {
      const arr = prev[section][key].filter((_, i) => i !== index);
      return { ...prev, [section]: { ...prev[section], [key]: arr } };
    });

  // ── Stats ─────────────────────────────────────────────────────────────────
  const addStat = () =>
    setLocal((p) => ({ ...p, about: { ...p.about, stats: [...p.about.stats, { value: "", label: "" }] } }));
  const removeStat = (i) =>
    setLocal((p) => ({ ...p, about: { ...p.about, stats: p.about.stats.filter((_, idx) => idx !== i) } }));

  // ── Skills categories ─────────────────────────────────────────────────────
  const addCategory = () =>
    setLocal((p) => ({ ...p, skills: { ...p.skills, categories: [...p.skills.categories, { name: "New Category", items: [] }] } }));
  const removeCategory = (i) =>
    setLocal((p) => ({ ...p, skills: { ...p.skills, categories: p.skills.categories.filter((_, idx) => idx !== i) } }));
  const setCategory = (ci, field, value) =>
    setLocal((p) => {
      const c = [...p.skills.categories];
      c[ci] = { ...c[ci], [field]: value };
      return { ...p, skills: { ...p.skills, categories: c } };
    });

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaveError("");
    try {
      await onSave(local);
      onClose();
    } catch (err) {
      setSaveError("Save failed — check your connection and try again.");
    }
  };

  // ── Tab props ─────────────────────────────────────────────────────────────
  const tabProps = { local, set, setItem, addItem, removeItem, setLocal };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9998, display: "flex" }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />

      {/* Drawer */}
      <div style={{ position: "relative", marginLeft: "auto", width: 460, height: "100%", background: "#fff", display: "flex", flexDirection: "column", boxShadow: "-8px 0 48px rgba(0,0,0,0.14)" }}>

        {/* Header */}
        <div style={{ padding: "16px 22px", borderBottom: "1px solid #f3f4f6", background: "#f0fdf9", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: teal }}>✏️ Edit Portfolio</div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>Changes save to Firebase when you click Save</div>
          </div>
          <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 20, color: "#6b7280" }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", overflowX: "auto", borderBottom: "1px solid #f3f4f6", background: "#fafafa", flexShrink: 0 }}>
          {TABS.map((t) => (
            <button
              key={t} onClick={() => setTab(t)}
              style={{ padding: "10px 12px", border: "none", background: "none", cursor: "pointer", fontSize: 11, fontWeight: tab === t ? 700 : 400, color: tab === t ? teal : "#9ca3af", borderBottom: tab === t ? `2px solid ${teal}` : "2px solid transparent", textTransform: "capitalize", whiteSpace: "nowrap", fontFamily: "inherit" }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px" }}>
          {tab === "about" && <AboutTab {...tabProps} addStat={addStat} removeStat={removeStat} />}
          {tab === "hero" && <HeroTab {...tabProps} />}
          {tab === "resume" && <ResumeTab {...tabProps} />}
          {tab === "services" && <ServicesTab {...tabProps} />}
          {tab === "process" && <ProcessTab {...tabProps} />}
          {tab === "projects" && <ProjectsTab {...tabProps} />}
          {tab === "skills" && <SkillsTab {...tabProps} addCategory={addCategory} removeCategory={removeCategory} setCategory={setCategory} />}
          {tab === "experience" && <ExperienceTab {...tabProps} />}
          {tab === "contact" && <ContactTab {...tabProps} />}
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 22px", borderTop: "1px solid #f3f4f6", flexShrink: 0 }}>
          {/* Save progress */}
          {saving && saveProgress && (
            <div style={{ fontSize: 12, color: teal, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ display: "inline-block", width: 10, height: 10, border: `2px solid ${teal}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              {saveProgress}
            </div>
          )}
          {saveError && (
            <div style={{ fontSize: 12, color: "#ef4444", marginBottom: 10 }}>{saveError}</div>
          )}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={onClose}
              style={{ flex: 1, padding: "11px 0", border: "1px solid #e5e7eb", borderRadius: 10, background: "#fff", cursor: "pointer", fontSize: 14, color: "#6b7280", fontFamily: "inherit" }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{ flex: 2, padding: "11px 0", border: "none", borderRadius: 10, background: "linear-gradient(135deg, #0d7377, #14a085)", cursor: saving ? "not-allowed" : "pointer", fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "inherit", opacity: saving ? 0.7 : 1 }}
            >
              {saving ? saveProgress || "Saving…" : "Save Changes ✓"}
            </button>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
