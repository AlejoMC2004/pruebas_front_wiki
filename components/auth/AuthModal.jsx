// components/auth/AuthModal.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { THEME } from "@/styles/theme";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal({ isOpen, onClose, initialTab = "login" }) {
  const { loginUser, registerUser } = useAuth();

  const [tab,      setTab]      = useState(initialTab);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => { setTab(initialTab); }, [initialTab]);

  useEffect(() => {
    setFormData({ name: "", email: "", password: "", confirm: "" });
    setError("");
    setSuccess("");
    setShowPass(false);
  }, [tab]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const set = (key) => (e) =>
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await loginUser({ email: formData.email, password: formData.password });
      setSuccess("Signed in successfully!");
      setTimeout(onClose, 900);
    } catch (err) {
      setError(err.message || "Incorrect credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      await registerUser({ name: formData.name, email: formData.email, password: formData.password });
      setSuccess("Account created! Welcome to the Wiki.");
      setTimeout(onClose, 900);
    } catch (err) {
      setError(err.message || "Error creating account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      style={s.overlay}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div style={s.modal} role="dialog" aria-modal="true">
        <div style={s.topAccent} />

        <div style={s.header}>
          <div style={s.logoRow}>
            <span style={s.logoIcon}>◈</span>
            <span style={s.logoText}>Wiki CVAIL</span>
          </div>
          <button style={s.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div style={s.tabs}>
          <button
            style={{ ...s.tab, ...(tab === "login" ? s.tabActive : {}) }}
            onClick={() => setTab("login")}
          >
            Sign in
          </button>
          <button
            style={{ ...s.tab, ...(tab === "register" ? s.tabActive : {}) }}
            onClick={() => setTab("register")}
          >
            Register
          </button>
        </div>

        <div style={s.body}>
          {tab === "login" ? (
            <form onSubmit={handleLogin} style={s.form}>
              <p style={s.formDesc}>Sign in with your group credentials.</p>

              <Field label="Email" type="email" value={formData.email}
                onChange={set("email")} placeholder="name@uis.edu.co" required />

              <Field label="Password" type={showPass ? "text" : "password"}
                value={formData.password} onChange={set("password")}
                placeholder="••••••••" required
                suffix={
                  <button type="button" style={s.eyeBtn} onClick={() => setShowPass(p => !p)}>
                    {showPass ? "🙈" : "👁"}
                  </button>
                }
              />

              <Feedback error={error} success={success} />

              <button type="submit" style={s.submitBtn} disabled={loading}>
                {loading ? <span style={s.spinner} /> : null}
                {loading ? "Verifying…" : "Sign in"}
              </button>

              <p style={s.switchHint}>
                Don't have an account?{" "}
                <button type="button" style={s.switchLink} onClick={() => setTab("register")}>
                  Register
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} style={s.form}>
              <p style={s.formDesc}>Create your account to contribute to the Wiki.</p>

              <Field label="Full name" type="text" value={formData.name}
                onChange={set("name")} placeholder="Your name" required />

              <Field label="Email" type="email" value={formData.email}
                onChange={set("email")} placeholder="name@uis.edu.co" required />

              <Field label="Password" type={showPass ? "text" : "password"}
                value={formData.password} onChange={set("password")}
                placeholder="At least 8 characters" required
                suffix={
                  <button type="button" style={s.eyeBtn} onClick={() => setShowPass(p => !p)}>
                    {showPass ? "🙈" : "👁"}
                  </button>
                }
              />

              <Field label="Confirm password" type={showPass ? "text" : "password"}
                value={formData.confirm} onChange={set("confirm")}
                placeholder="Repeat your password" required />

              <PasswordStrength password={formData.password} />

              <Feedback error={error} success={success} />

              <button type="submit" style={s.submitBtn} disabled={loading}>
                {loading ? <span style={s.spinner} /> : null}
                {loading ? "Creating account…" : "Create account"}
              </button>

              <p style={s.switchHint}>
                Already have an account?{" "}
                <button type="button" style={s.switchLink} onClick={() => setTab("login")}>
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, suffix, ...inputProps }) {
  return (
    <div style={s.field}>
      <label style={s.label}>{label}</label>
      <div style={s.inputWrap}>
        <input style={s.input} {...inputProps} />
        {suffix}
      </div>
    </div>
  );
}

function Feedback({ error, success }) {
  if (!error && !success) return null;
  return (
    <div style={{ ...s.feedback, ...(error ? s.feedbackError : s.feedbackSuccess) }}>
      {error ? "⚠ " : "✓ "}{error || success}
    </div>
  );
}

function PasswordStrength({ password }) {
  const score = getScore(password);
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["#e2e8f0", "#e53e3e", "#ed8936", "#d69e2e", THEME.colors.teal];
  if (!password) return null;
  return (
    <div style={s.strength}>
      <div style={s.strengthBars}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ ...s.bar, background: i <= score ? colors[score] : "#e2e8f0" }} />
        ))}
      </div>
      <span style={{ ...s.strengthLabel, color: colors[score] }}>{labels[score]}</span>
    </div>
  );
}

function getScore(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8)          s++;
  if (/[A-Z]/.test(pw))        s++;
  if (/[0-9]/.test(pw))        s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const s = {
  overlay:         { position:"fixed",inset:0,background:"rgba(20,30,15,0.65)",backdropFilter:"blur(4px)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",animation:"fadeIn 0.18s ease" },
  modal:           { background:THEME.colors.card,borderRadius:THEME.radius.lg,width:"100%",maxWidth:"440px",boxShadow:"0 24px 64px rgba(0,0,0,0.3)",overflow:"hidden",position:"relative",animation:"slideUp 0.22s ease" },
  topAccent:       { height:"4px",background:"linear-gradient(90deg, " + THEME.colors.gold + ", " + THEME.colors.tealLight + ")" },
  header:          { display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 24px 0" },
  logoRow:         { display:"flex",alignItems:"center",gap:"8px" },
  logoIcon:        { fontSize:"18px",color:THEME.colors.gold },
  logoText:        { fontFamily:THEME.fonts.display,fontWeight:700,fontSize:"16px",color:THEME.colors.navy,letterSpacing:"0.02em" },
  closeBtn:        { background:"none",border:"none",cursor:"pointer",color:THEME.colors.muted,fontSize:"16px",padding:"4px 8px",borderRadius:THEME.radius.sm,lineHeight:1 },
  tabs:            { display:"flex",gap:"4px",padding:"16px 24px 0",borderBottom:"2px solid " + THEME.colors.border,marginTop:"8px" },
  tab:             { background:"none",border:"none",cursor:"pointer",padding:"8px 16px",fontSize:"14px",fontWeight:600,color:THEME.colors.muted,borderBottom:"2px solid transparent",marginBottom:"-2px",transition:"all 0.15s",borderRadius:THEME.radius.sm + " " + THEME.radius.sm + " 0 0" },
  tabActive:       { color:THEME.colors.navy,borderBottom:"2px solid " + THEME.colors.gold,background:"rgba(201,168,76,0.07)" },
  body:            { padding:"24px" },
  form:            { display:"flex",flexDirection:"column",gap:"16px" },
  formDesc:        { fontSize:"13px",color:THEME.colors.muted,lineHeight:1.5,marginBottom:"4px" },
  field:           { display:"flex",flexDirection:"column",gap:"6px" },
  label:           { fontSize:"13px",fontWeight:600,color:THEME.colors.text },
  inputWrap:       { position:"relative" },
  input:           { width:"100%",padding:"10px 14px",border:"1.5px solid " + THEME.colors.border,borderRadius:THEME.radius.sm,fontSize:"14px",color:THEME.colors.text,background:"#fff",outline:"none",transition:"border-color 0.15s",fontFamily:THEME.fonts.body },
  eyeBtn:          { position:"absolute",right:"10px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:"14px",lineHeight:1,padding:"2px" },
  feedback:        { padding:"10px 14px",borderRadius:THEME.radius.sm,fontSize:"13px",fontWeight:600,lineHeight:1.4 },
  feedbackError:   { background:"#fff5f5",color:"#c53030",border:"1px solid #feb2b2" },
  feedbackSuccess: { background:"#f0fff4",color:"#276749",border:"1px solid " + THEME.colors.tealLight },
  submitBtn:       { display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",background:THEME.colors.navy,color:"#fff",border:"none",borderRadius:THEME.radius.sm,padding:"12px",fontSize:"15px",fontWeight:700,cursor:"pointer",marginTop:"4px",transition:"opacity 0.15s",fontFamily:THEME.fonts.body },
  spinner:         { display:"inline-block",width:"14px",height:"14px",border:"2px solid rgba(255,255,255,0.3)",borderTop:"2px solid #fff",borderRadius:"50%",animation:"spin 0.7s linear infinite" },
  switchHint:      { textAlign:"center",fontSize:"13px",color:THEME.colors.muted,marginTop:"-4px" },
  switchLink:      { background:"none",border:"none",cursor:"pointer",color:THEME.colors.teal,fontWeight:600,fontSize:"13px",padding:0,fontFamily:"inherit" },
  strength:        { display:"flex",alignItems:"center",gap:"8px",marginTop:"-8px" },
  strengthBars:    { display:"flex",gap:"4px",flex:1 },
  bar:             { height:"4px",flex:1,borderRadius:"2px",transition:"background 0.3s" },
  strengthLabel:   { fontSize:"11px",fontWeight:600,minWidth:"44px" },
};
