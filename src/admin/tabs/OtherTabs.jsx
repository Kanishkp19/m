import { Field, ImageUpload, AddBtn, RemoveBtn, ResumeUpload, labelStyle, inputStyle, cardStyle } from "../../components/ui.jsx";

const teal = "#0d7377";

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function HeroTab({ local, set }) {
  return (
    <Field lbl="Hero Tagline" value={local.hero.tagline} onChange={(v) => set("hero", "tagline", v)} multi rows={3} />
  );
}

// ─── Resume ───────────────────────────────────────────────────────────────────
export function ResumeTab({ local, setLocal }) {
  return (
    <>
      <div style={{ background: "#f0fdf9", borderRadius: 12, padding: 16, marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: teal, fontWeight: 600, marginBottom: 4 }}>💡 How it works</div>
        <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>
          Upload your PDF resume here. A "Download Resume" button will appear on the site automatically.
          The file is stored in Firebase Storage and a download URL is saved — it won't bloat the database.
        </div>
      </div>
      <ResumeUpload
        value={local.resume?.file}
        filename={local.resume?.filename}
        onChange={(file, name) =>
          setLocal((p) => ({ ...p, resume: { file, filename: name } }))
        }
      />
    </>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
export function ServicesTab({ local, set, setItem, addItem, removeItem }) {
  return (
    <>
      <Field lbl="Section Heading (use \n for line break)" value={local.services.heading} onChange={(v) => set("services", "heading", v)} multi rows={2} />
      <label style={labelStyle}>Services</label>
      {local.services.items.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
          <input style={{ ...inputStyle, width: 44 }} value={s.icon} placeholder="✦" title="Icon/Emoji" onChange={(e) => setItem("services", "items", i, "icon", e.target.value)} />
          <input style={{ ...inputStyle, flex: 1 }} value={s.label} placeholder="Service name" onChange={(e) => setItem("services", "items", i, "label", e.target.value)} />
          <RemoveBtn onClick={() => removeItem("services", "items", i)} />
        </div>
      ))}
      <AddBtn onClick={() => addItem("services", "items", { icon: "✦", label: "New Service" })} label="Add Service" />
    </>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────
export function ProcessTab({ local, set, setItem, addItem, removeItem }) {
  return (
    <>
      <Field lbl="Section Heading" value={local.process.heading} onChange={(v) => set("process", "heading", v)} multi rows={2} />
      {local.process.steps.map((s, i) => (
        <div key={i} style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: teal }}>Step {i + 1}</span>
            <RemoveBtn onClick={() => removeItem("process", "steps", i)} />
          </div>
          <label style={labelStyle}>Step Number</label>
          <input style={{ ...inputStyle, marginBottom: 6 }} value={s.num} placeholder="01" onChange={(e) => setItem("process", "steps", i, "num", e.target.value)} />
          <label style={labelStyle}>Title</label>
          <input style={{ ...inputStyle, marginBottom: 6 }} value={s.title} placeholder="Step Title" onChange={(e) => setItem("process", "steps", i, "title", e.target.value)} />
          <label style={labelStyle}>Description</label>
          <textarea style={{ ...inputStyle, minHeight: 72 }} value={s.desc} onChange={(e) => setItem("process", "steps", i, "desc", e.target.value)} />
        </div>
      ))}
      <AddBtn
        onClick={() => addItem("process", "steps", { num: `0${local.process.steps.length + 1}`, title: "New Step", desc: "Describe this step." })}
        label="Add Step"
      />
    </>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
export function ProjectsTab({ local, set, setItem, addItem, removeItem }) {
  return (
    <>
      <Field lbl="Section Heading" value={local.projects.heading} onChange={(v) => set("projects", "heading", v)} />
      {local.projects.items.map((p, i) => (
        <div key={i} style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: teal }}>Project {i + 1}</span>
            <RemoveBtn onClick={() => removeItem("projects", "items", i)} />
          </div>
          <ImageUpload
            label="Project Thumbnail"
            value={p.image}
            onChange={(v) => setItem("projects", "items", i, "image", v)}
            aspect="16/10"
            placeholder="Upload project screenshot"
          />
          <label style={labelStyle}>Title</label>
          <input style={{ ...inputStyle, marginBottom: 6 }} value={p.title} onChange={(e) => setItem("projects", "items", i, "title", e.target.value)} />
          <label style={labelStyle}>Subtitle / Tags</label>
          <input style={inputStyle} value={p.subtitle} onChange={(e) => setItem("projects", "items", i, "subtitle", e.target.value)} />
        </div>
      ))}
      <AddBtn
        onClick={() => addItem("projects", "items", { title: "New Project", subtitle: "Type · Platform", image: null, gradient: "linear-gradient(135deg, #e8eaf0 0%, #d8dae8 100%)" })}
        label="Add Project"
      />
    </>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
export function SkillsTab({ local, set, addCategory, removeCategory, setCategory }) {
  return (
    <>
      <Field lbl="Section Heading" value={local.skills.heading} onChange={(v) => set("skills", "heading", v)} />
      {local.skills.categories.map((cat, ci) => (
        <div key={ci} style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: teal }}>Category {ci + 1}</span>
            <RemoveBtn onClick={() => removeCategory(ci)} />
          </div>
          <label style={labelStyle}>Category Name</label>
          <input style={{ ...inputStyle, marginBottom: 6 }} value={cat.name} onChange={(e) => setCategory(ci, "name", e.target.value)} />
          <label style={labelStyle}>Skills (comma-separated)</label>
          <textarea
            style={{ ...inputStyle, minHeight: 72 }}
            value={cat.items.join(", ")}
            onChange={(e) => setCategory(ci, "items", e.target.value.split(",").map((x) => x.trim()).filter(Boolean))}
          />
        </div>
      ))}
      <AddBtn onClick={addCategory} label="Add Category" />
    </>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
export function ExperienceTab({ local, set, setItem, addItem, removeItem }) {
  return (
    <>
      <Field lbl="Section Heading" value={local.experience.heading} onChange={(v) => set("experience", "heading", v)} />
      {local.experience.items.map((exp, i) => (
        <div key={i} style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: teal }}>Position {i + 1}</span>
            <RemoveBtn onClick={() => removeItem("experience", "items", i)} />
          </div>
          {[["Role / Title", "role"], ["Company", "company"], ["Location", "location"], ["Period", "period"]].map(([pl, key]) => (
            <div key={key}>
              <label style={labelStyle}>{pl}</label>
              <input style={{ ...inputStyle, marginBottom: 6 }} value={exp[key]} onChange={(e) => setItem("experience", "items", i, key, e.target.value)} placeholder={pl} />
            </div>
          ))}
          <label style={labelStyle}>Description</label>
          <textarea style={{ ...inputStyle, minHeight: 80 }} value={exp.desc} onChange={(e) => setItem("experience", "items", i, "desc", e.target.value)} />
        </div>
      ))}
      <AddBtn
        onClick={() => addItem("experience", "items", { role: "", company: "", location: "", period: "", desc: "" })}
        label="Add Position"
      />
    </>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export function ContactTab({ local, set }) {
  return (
    <>
      <Field lbl="Heading" value={local.contact.heading} onChange={(v) => set("contact", "heading", v)} />
      <Field lbl="Subheading" value={local.contact.subheading} onChange={(v) => set("contact", "subheading", v)} />
      <Field lbl="Email" value={local.contact.email} onChange={(v) => set("contact", "email", v)} />
      <Field lbl="LinkedIn URL" value={local.contact.linkedin || ""} onChange={(v) => set("contact", "linkedin", v)} />
      <Field lbl="Phone" value={local.contact.phone} onChange={(v) => set("contact", "phone", v)} />
    </>
  );
}
