import { Field, ImageUpload, AddBtn, RemoveBtn, labelStyle, inputStyle } from "../../components/ui.jsx";

export default function AboutTab({ local, set, setItem, addStat, removeStat }) {
  return (
    <>
      <ImageUpload
        label="Profile Photo"
        value={local.about.photo}
        onChange={(v) => set("about", "photo", v)}
        aspect="4/5"
        placeholder="Upload your profile photo"
      />
      <Field lbl="Name" value={local.about.name} onChange={(v) => set("about", "name", v)} />
      <Field lbl="Location" value={local.about.location} onChange={(v) => set("about", "location", v)} />
      <Field lbl="Heading (use \n for line break)" value={local.about.heading} onChange={(v) => set("about", "heading", v)} multi rows={2} />
      <Field lbl="Bio" value={local.about.bio} onChange={(v) => set("about", "bio", v)} multi rows={4} />

      <label style={labelStyle}>Social Links</label>
      {[
        ["LinkedIn URL", "linkedin"],
        ["Dribbble URL", "dribbble"],
        ["Instagram URL", "instagram"],
        ["Twitter URL", "twitter"],
      ].map(([pl, key]) => (
        <div key={key} style={{ marginBottom: 6 }}>
          <input
            style={inputStyle}
            placeholder={pl}
            value={local.about[key] || ""}
            onChange={(e) => set("about", key, e.target.value)}
          />
        </div>
      ))}

      <label style={labelStyle}>Stats</label>
      {local.about.stats.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
          <input
            style={{ ...inputStyle, width: "35%" }}
            value={s.value} placeholder="4+"
            onChange={(e) => setItem("about", "stats", i, "value", e.target.value)}
          />
          <input
            style={{ ...inputStyle, flex: 1 }}
            value={s.label} placeholder="Years experience"
            onChange={(e) => setItem("about", "stats", i, "label", e.target.value)}
          />
          <RemoveBtn onClick={() => removeStat(i)} />
        </div>
      ))}
      <AddBtn onClick={addStat} label="Add Stat" />
    </>
  );
}
