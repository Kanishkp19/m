import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase";

/**
 * AdminLogin
 *
 * Uses Firebase Authentication (email + password).
 * Set your admin email/password in the Firebase console under Authentication.
 *
 * The VITE_ADMIN_EMAIL env var controls which email is used for login.
 */
export default function AdminLogin({ onSuccess, onClose }) {
  const [email, setEmail] = useState(import.meta.env.VITE_ADMIN_EMAIL || "");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const attempt = async () => {
    if (!email || !pw) { setErr("Please enter email and password."); return; }
    setLoading(true);
    setErr("");
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      onSuccess();
    } catch (e) {
      console.error("Firebase Login Error:", e.code, e.message);
      const msg =
        e.code === "auth/invalid-credential" || e.code === "auth/wrong-password"
          ? "Incorrect email or password — try again."
          : e.code === "auth/too-many-requests"
          ? "Too many failed attempts. Try again later."
          : "Login failed. Check your credentials.";
      setErr(msg);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPw("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: "44px 40px", width: 400, boxShadow: "0 32px 80px rgba(0,0,0,0.2)", animation: shake ? "shake 0.4s ease" : "popIn 0.3s ease" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #0d7377, #14a085)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontSize: 24 }}>🔒</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#111" }}>Admin Access</div>
          <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 8 }}>Sign in with your admin account</div>
        </div>

        <input
          type="email" placeholder="Admin email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErr(""); }}
          onKeyDown={(e) => e.key === "Enter" && attempt()}
          style={{ width: "100%", border: `1.5px solid ${err ? "#f87171" : "#e5e7eb"}`, borderRadius: 12, padding: "13px 16px", fontSize: 15, outline: "none", marginBottom: 10, boxSizing: "border-box", fontFamily: "inherit" }}
          autoFocus
        />
        <input
          type="password" placeholder="Password"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setErr(""); }}
          onKeyDown={(e) => e.key === "Enter" && attempt()}
          style={{ width: "100%", border: `1.5px solid ${err ? "#f87171" : "#e5e7eb"}`, borderRadius: 12, padding: "13px 16px", fontSize: 15, outline: "none", marginBottom: err ? 8 : 20, boxSizing: "border-box", fontFamily: "inherit" }}
        />

        {err && <div style={{ fontSize: 12, color: "#ef4444", marginBottom: 16, textAlign: "center" }}>{err}</div>}

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onClose}
            style={{ flex: 1, padding: "12px 0", border: "1px solid #e5e7eb", borderRadius: 10, background: "#fff", cursor: "pointer", fontSize: 14, color: "#6b7280", fontFamily: "inherit" }}
          >
            Cancel
          </button>
          <button
            onClick={attempt}
            disabled={loading}
            style={{ flex: 2, padding: "12px 0", border: "none", borderRadius: 10, background: "linear-gradient(135deg, #0d7377, #14a085)", cursor: loading ? "not-allowed" : "pointer", fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "inherit", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Signing in…" : "Unlock →"}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes popIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}
        @keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
      `}</style>
    </div>
  );
}

export async function adminSignOut() {
  await signOut(auth);
}
