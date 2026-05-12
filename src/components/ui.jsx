import { useRef } from "react";

// ─── Styles ───────────────────────────────────────────────────────────────────
export const inputStyle = {
  width: "100%",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  padding: "9px 12px",
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box",
  marginBottom: 0,
  fontFamily: "inherit",
  resize: "vertical",
  background: "#fff",
};

export const labelStyle = {
  fontSize: 11,
  fontWeight: 700,
  color: "#6b7280",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  display: "block",
  marginBottom: 5,
  marginTop: 12,
};

export const cardStyle = {
  background: "#f9fafb",
  borderRadius: 12,
  padding: 14,
  marginBottom: 12,
  border: "1px solid #f0f0f0",
};

// ─── Buttons ──────────────────────────────────────────────────────────────────
export function AddBtn({ onClick, label = "Add" }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        background: "#f0fdf4", border: "1px dashed #6ee7b7",
        borderRadius: 8, padding: "8px 14px", fontSize: 12,
        fontWeight: 600, color: "#0d7377", cursor: "pointer",
        fontFamily: "inherit", width: "100%",
        justifyContent: "center", marginTop: 4,
      }}
    >
      + {label}
    </button>
  );
}

export function RemoveBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      title="Remove"
      style={{
        background: "#fff1f2", border: "1px solid #fecaca",
        borderRadius: 6, width: 26, height: 26,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", fontSize: 14, color: "#ef4444", flexShrink: 0,
      }}
    >
      ×
    </button>
  );
}

// ─── File helpers ─────────────────────────────────────────────────────────────
export function readFileAsBase64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

// ─── Image Upload ─────────────────────────────────────────────────────────────
export function ImageUpload({
  value, onChange, label,
  aspect = "4/5",
  placeholder = "Click or drag to upload photo",
}) {
  const ref = useRef();

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const b64 = await readFileAsBase64(file);
    onChange(b64);
  };

  return (
    <div style={{ marginBottom: 12 }}>
      <label style={labelStyle}>{label}</label>
      <div
        onClick={() => ref.current.click()}
        onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = "#0d7377"; }}
        onDragLeave={(e) => { e.currentTarget.style.borderColor = "#d1fae5"; }}
        onDrop={async (e) => {
          e.preventDefault();
          await handleFile(e.dataTransfer.files[0]);
          e.currentTarget.style.borderColor = "#d1fae5";
        }}
        style={{
          border: "2px dashed #d1fae5", borderRadius: 10,
          overflow: "hidden", cursor: "pointer",
          background: "#f9fafb", transition: "border-color 0.2s",
          position: "relative", aspectRatio: aspect,
          marginBottom: 8
        }}
      >
        {value ? (
          <img src={value} alt="upload" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <div style={{ fontSize: 28 }}>📷</div>
            <div style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", padding: "0 12px" }}>{placeholder}</div>
          </div>
        )}
        {value && (
          <button
            onClick={(e) => { e.stopPropagation(); onChange(null); }}
            style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.55)", border: "none", borderRadius: "50%", width: 26, height: 26, color: "#fff", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            ×
          </button>
        )}
      </div>
      <input
        ref={ref} type="file" accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files[0])}
      />
      <input 
        style={{...inputStyle, fontSize: 12}} 
        placeholder="Or paste an image URL here (e.g. https://...)"
        value={value && value.startsWith('http') ? value : ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

// ─── Resume Upload ────────────────────────────────────────────────────────────
export function ResumeUpload({ value, filename, onChange }) {
  const ref = useRef();

  const handleFile = async (file) => {
    if (!file) return;
    const b64 = await readFileAsBase64(file);
    onChange(b64, file.name);
  };

  return (
    <div>
      <label style={labelStyle}>Resume / CV (PDF)</label>
      <div
        onClick={() => ref.current.click()}
        onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = "#0d7377"; }}
        onDragLeave={(e) => { e.currentTarget.style.borderColor = "#d1fae5"; }}
        onDrop={async (e) => {
          e.preventDefault();
          await handleFile(e.dataTransfer.files[0]);
          e.currentTarget.style.borderColor = "#d1fae5";
        }}
        style={{
          border: "2px dashed #d1fae5", borderRadius: 10,
          padding: "20px 16px", cursor: "pointer",
          background: "#f9fafb", textAlign: "center",
          transition: "border-color 0.2s",
        }}
      >
        {value ? (
          <div>
            <div style={{ fontSize: 28, marginBottom: 6 }}>📄</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#111", marginBottom: 4 }}>{filename}</div>
            <div style={{ fontSize: 11, color: "#10b981" }}>✓ Resume uploaded — click to replace</div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 28, marginBottom: 6 }}>📄</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>Click or drag your PDF resume here</div>
          </div>
        )}
      </div>
      {value && (
        <button
          onClick={() => onChange(null, "")}
          style={{ marginTop: 6, background: "none", border: "none", color: "#ef4444", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}
        >
          × Remove resume
        </button>
      )}
      <input
        ref={ref} type="file" accept=".pdf,application/pdf"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}

// ─── Field (text/textarea input with label) ───────────────────────────────────
export function Field({ lbl, value, onChange, multi = false, rows = 3 }) {
  return (
    <div>
      <label style={labelStyle}>{lbl}</label>
      {multi ? (
        <textarea
          style={{ ...inputStyle, minHeight: rows * 22 }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          style={inputStyle}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
