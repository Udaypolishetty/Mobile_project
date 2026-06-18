// import { Link } from "react-router-dom";

// import { useState, useCallback } from "react";
// import {
//   FaTimes, FaUser, FaEnvelope, FaLock, FaMapMarkerAlt,
//   FaPhone, FaEye, FaEyeSlash, FaShieldAlt, FaArrowRight,
//   FaGoogle, FaStore
// } from "react-icons/fa";
// import { MdLocationOn } from "react-icons/md";
// import { useAuth } from "../../context/AuthContext";
// import { registerUser } from "../../api/authApi";
// import AuthInput from "./AuthInput";
// import AuthToast from "./AuthToast";
// import { policyContent } from "../../pages/FooterInfo";

// /* ─── Validation helpers ─── */
// const validators = {
//   name: (v) => {
//     if (!v.trim()) return "Full name is required";
//     if (v.trim().length < 2) return "Name must be at least 2 characters";
//     return "";
//   },
//   email: (v) => {
//     if (!v.trim()) return "Email is required";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address";
//     return "";
//   },
//   password: (v) => {
//     if (!v) return "Password is required";
//     if (v.length < 6) return "Password must be at least 6 characters";
//     return "";
//   },
//   confirmPassword: (v, form) => {
//     if (!v) return "Please confirm your password";
//     if (v !== form.password) return "Passwords do not match";
//     return "";
//   },
//   phone: (v) => {
//     if (!v.trim()) return "Phone number is required";
//     if (!/^[6-9]\d{9}$/.test(v.replace(/\s/g, ""))) return "Enter a valid 10-digit Indian mobile number";
//     return "";
//   },
//   pincode: (v) => {
//     if (!v.trim()) return "Pincode is required";
//     if (!/^\d{6}$/.test(v.trim())) return "Enter a valid 6-digit pincode";
//     return "";
//   },
//   address: (v) => {
//     if (!v.trim()) return "Address is required";
//     if (v.trim().length < 10) return "Please enter a complete address";
//     return "";
//   },
// };

// const REGISTER_STEPS = [
//   { id: "account", label: "Account", icon: FaUser },
//   { id: "contact", label: "Contact", icon: FaPhone },
//   { id: "address", label: "Address", icon: FaMapMarkerAlt },
// ];

// export default function AuthModal() {
//   const { showAuthModal, setShowAuthModal, login, authMode, setAuthMode } = useAuth();

//   const [step, setStep] = useState(0); // register steps
//   const [showPass, setShowPass] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState(null); // { message, type }
//   const [locLoading, setLocLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [acceptedPolicy, setAcceptedPolicy] = useState(false);
//   const [policyOpen, setPolicyOpen] = useState(null);

//   const [form, setForm] = useState({
//     name: "", email: "", password: "", confirmPassword: "",
//     phone: "", pincode: "", address: "", city: "", state: "",
//   });

//   const set = (field) => (e) => {
//     setForm((p) => ({ ...p, [field]: e.target.value }));
//     if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
//   };

//   const validateStep = () => {
//     let newErrors = {};
//     if (authMode === "login") {
//       newErrors.email = validators.email(form.email);
//       newErrors.password = validators.password(form.password);
//     } else if (step === 0) {
//       newErrors.name = validators.name(form.name);
//       newErrors.email = validators.email(form.email);
//       newErrors.password = validators.password(form.password);
//       newErrors.confirmPassword = validators.confirmPassword(form.confirmPassword, form);
//     } else if (step === 1) {
//       newErrors.phone = validators.phone(form.phone);
//     } else if (step === 2) {
//       newErrors.address = validators.address(form.address);
//       newErrors.pincode = validators.pincode(form.pincode);
//     }
//     const cleaned = Object.fromEntries(Object.entries(newErrors).filter(([, v]) => v));
//     setErrors(cleaned);
//     return Object.keys(cleaned).length === 0;
//   };

//   const nextStep = () => {
//     if (!validateStep()) return;
//     setStep((s) => s + 1);
//   };

//   const getCurrentLocation = () => {
//     if (!navigator.geolocation) { alert("Geolocation not supported"); return; }
//     setLocLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         try {
//           const res = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
//           );
//           const data = await res.json();
//           setForm((p) => ({
//             ...p,
//             address: data.display_name || "",
//             pincode: data.address?.postcode || "",
//             city: data.address?.city || data.address?.town || data.address?.village || "",
//             state: data.address?.state || "",
//           }));
//           setErrors((p) => ({ ...p, address: "", pincode: "" }));
//         } catch (e) { console.log(e); }
//         setLocLoading(false);
//       },
//       () => { alert("Location access denied"); setLocLoading(false); }
//     );
//   };

//   const handleSubmit = async () => {
//     if (!validateStep()) return;
//     setLoading(true);
//     try {
//       if (authMode === "login") {
//         await login(form.email, form.password);
//         setToast({ message: `Welcome back! You're signed in.`, type: "success" });
//         setTimeout(close, 2200);
//       } else {
//         await registerUser({
//           name: form.name, email: form.email, password: form.password,
//           phone: form.phone, address: form.address,
//           pincode: form.pincode, city: form.city, state: form.state,
//         });
//         setToast({ message: "Account created successfully! Please sign in.", type: "success" });
//         setTimeout(() => {
//           switchMode("login");
//         }, 2000);
//       }
//     } catch (err) {
//       const msg = err.response?.data?.error || err.response?.data?.message || "Something went wrong. Please try again.";
//       setToast({ message: msg, type: "error" });
//     }
//     setLoading(false);
//   };

//   const close = useCallback(() => {
//     setShowAuthModal(false);
//     setErrors({});
//     setStep(0);
//     setForm({ name: "", email: "", password: "", confirmPassword: "", phone: "", pincode: "", address: "", city: "", state: "" });
//   }, [setShowAuthModal]);

//   const switchMode = (m) => {
//     setAuthMode(m);
//     setStep(0);
//     setErrors({});
//     setForm({ name: "", email: "", password: "", confirmPassword: "", phone: "", pincode: "", address: "", city: "", state: "" });
//   };

//   if (!showAuthModal) return null;

//   const isLastStep = step === REGISTER_STEPS.length - 1;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

//         .auth-overlay {
//           position: fixed; inset: 0; z-index: 9999;
//           background: rgba(10,15,30,0.75);
//           backdrop-filter: blur(6px);
//           display: flex; align-items: center; justify-content: center;
//           padding: 16px;
//           font-family: 'DM Sans', sans-serif;
//         }

//         @keyframes modalIn {
//           from { opacity: 0; transform: scale(0.93) translateY(20px); }
//           to   { opacity: 1; transform: scale(1) translateY(0); }
//         }
//         .auth-modal {
//           background: white;
//           border-radius: 24px;
//           width: 100%; max-width: 420px;
//           box-shadow: 0 30px 80px rgba(0,0,0,0.35);
//           animation: modalIn 0.32s cubic-bezier(.4,0,.2,1) forwards;
//           overflow: hidden;
//           position: relative;
//           max-height: 96vh;
//           display: flex; flex-direction: column;
//         }

//         /* Decorative top strip */
//         .auth-top-strip {
//           height: 4px;
//           background: linear-gradient(90deg, #06b6d4, #0891b2, #c0392b);
//         }

//         /* Header */
//         .auth-header {
//           padding: 24px 28px 0;
//           text-align: center;
//         }
//         .auth-brand-icon {
//           width: 52px; height: 52px;
//           background: linear-gradient(135deg, #0f172a, #1e293b);
//           border-radius: 16px;
//           display: flex; align-items: center; justify-content: center;
//           margin: 0 auto 14px;
//           box-shadow: 0 4px 16px rgba(0,0,0,0.2);
//         }
//         .auth-title {
//           font-family: 'Syne', sans-serif;
//           font-size: 22px; font-weight: 800;
//           color: #0f172a; line-height: 1.1;
//           margin-bottom: 4px;
//         }
//         .auth-subtitle {
//           font-size: 12px; color: #94a3b8; font-weight: 400;
//         }

//         /* Stepper */
//         .auth-stepper {
//           display: flex; align-items: center; justify-content: center;
//           gap: 0; padding: 20px 28px 0;
//         }
//         .auth-step-item {
//           display: flex; align-items: center; gap: 6px;
//           flex: 1;
//         }
//         .auth-step-dot {
//           width: 28px; height: 28px; border-radius: 50%;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 11px; font-weight: 700; flex-shrink: 0;
//           transition: all 0.25s;
//         }
//         .step-done { background: #06b6d4; color: white; }
//         .step-active { background: #0f172a; color: white; box-shadow: 0 0 0 3px rgba(6,182,212,0.2); }
//         .step-pending { background: #f1f5f9; color: #94a3b8; }
//         .auth-step-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; }
//         .auth-step-label.active { color: #0f172a; }
//         .auth-step-line { flex: 1; height: 2px; background: #e2e8f0; margin: 0 4px; }
//         .auth-step-line.done { background: #06b6d4; }

//         /* Scrollable body */
//         .auth-body {
//           padding: 20px 28px;
//           overflow-y: auto;
//           flex: 1;
//         }

//         /* Input fields */
//         .auth-field-wrap { margin-bottom: 12px; }
//         .auth-field {
//           display: flex; align-items: center; gap: 10px;
//           border: 1.5px solid #e2e8f0;
//           border-radius: 12px;
//           padding: 0 14px;
//           height: 48px;
//           transition: border-color 0.18s, box-shadow 0.18s;
//           background: white;
//         }
//         .auth-field.focused {
//           border-color: #06b6d4;
//           box-shadow: 0 0 0 3px rgba(6,182,212,0.12);
//         }
//         .auth-field.errored { border-color: #f87171; }
//         .auth-field.errored.focused { box-shadow: 0 0 0 3px rgba(248,113,113,0.12); }
//         .auth-field-icon { font-size: 13px; color: #cbd5e1; flex-shrink: 0; transition: color 0.18s; }
//         .icon-active { color: #06b6d4; }
//         .icon-error { color: #f87171; }
//         .auth-input {
//           flex: 1; border: none; outline: none;
//           font-size: 14px; color: #1e293b;
//           font-family: 'DM Sans', sans-serif;
//           background: transparent;
//         }
//         .auth-input::placeholder { color: #94a3b8; }
//         .auth-field-right { flex-shrink: 0; }
//         .auth-field-error {
//           font-size: 11px; color: #ef4444;
//           margin-top: 4px; padding-left: 4px;
//           display: flex; align-items: center; gap: 4px;
//         }

//         /* Textarea field */
//         .auth-textarea-wrap {
//           border: 1.5px solid #e2e8f0;
//           border-radius: 12px;
//           padding: 12px 14px;
//           transition: border-color 0.18s, box-shadow 0.18s;
//           display: flex; gap: 10px;
//           align-items: flex-start;
//         }
//         .auth-textarea-wrap.focused { border-color: #06b6d4; box-shadow: 0 0 0 3px rgba(6,182,212,0.12); }
//         .auth-textarea-wrap.errored { border-color: #f87171; }
//         .auth-textarea {
//           flex: 1; border: none; outline: none; resize: none;
//           font-size: 14px; color: #1e293b; font-family: 'DM Sans', sans-serif;
//           line-height: 1.5; background: transparent; min-height: 72px;
//         }
//         .auth-textarea::placeholder { color: #94a3b8; }

//         /* Loc button */
//         .loc-btn {
//           display: flex; align-items: center; gap: 6px;
//           padding: 10px 14px;
//           border-radius: 12px;
//           border: 1.5px solid #e2e8f0;
//           font-size: 12px; font-weight: 600;
//           color: #0891b2; cursor: pointer;
//           transition: all 0.15s; background: rgba(6,182,212,0.05);
//           white-space: nowrap;
//         }
//         .loc-btn:hover { border-color: #06b6d4; background: rgba(6,182,212,0.1); }

//         /* Two-col grid */
//         .auth-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

//         /* Submit button */
//         .auth-submit {
//           width: 100%;
//           height: 50px;
//           border: none; border-radius: 14px;
//           font-size: 14px; font-weight: 700;
//           cursor: pointer;
//           display: flex; align-items: center; justify-content: center; gap: 8px;
//           transition: all 0.2s;
//           margin-top: 4px;
//           letter-spacing: 0.2px;
//           font-family: 'DM Sans', sans-serif;
//         }
//         .auth-submit-primary {
//           background: linear-gradient(135deg, #0f172a, #1e293b);
//           color: white;
//         }
//         .auth-submit-primary:hover {
//           background: linear-gradient(135deg, #0891b2, #06b6d4);
//           box-shadow: 0 6px 20px rgba(6,182,212,0.35);
//           transform: translateY(-1px);
//         }
//         .auth-submit-primary:disabled {
//           opacity: 0.6; cursor: not-allowed; transform: none;
//         }
//         .auth-submit-outline {
//           background: white; color: #475569;
//           border: 1.5px solid #e2e8f0;
//         }
//         .auth-submit-outline:hover { border-color: #cbd5e1; background: #f8fafc; }

//         /* Spinner */
//         @keyframes spin { to { transform: rotate(360deg); } }
//         .spinner {
//           width: 18px; height: 18px;
//           border: 2px solid rgba(255,255,255,0.3);
//           border-top-color: white;
//           border-radius: 50%;
//           animation: spin 0.7s linear infinite;
//         }

//         /* Divider */
//         .auth-divider {
//           display: flex; align-items: center; gap: 12px;
//           margin: 16px 0;
//         }
//         .auth-divider-line { flex: 1; height: 1px; background: #f1f5f9; }
//         .auth-divider-text { font-size: 11px; color: #cbd5e1; font-weight: 500; }

//         /* Footer */
//         .auth-footer {
//           padding: 16px 28px 24px;
//           text-align: center;
//           border-top: 1px solid #f8fafc;
//         }
//         .auth-footer p { font-size: 13px; color: #64748b; }
//         .auth-switch {
//           color: #0891b2; font-weight: 700; cursor: pointer;
//           transition: color 0.15s;
//         }
//         .auth-switch:hover { color: #06b6d4; text-decoration: underline; }

//         /* Close btn */
//         .auth-close {
//           position: absolute; top: 16px; right: 16px;
//           width: 32px; height: 32px; border-radius: 50%;
//           background: #f8fafc; border: none;
//           display: flex; align-items: center; justify-content: center;
//           cursor: pointer; color: #94a3b8;
//           transition: all 0.15s; z-index: 10;
//         }
//         .auth-close:hover { background: #f1f5f9; color: #475569; }

//         /* Benefits bar */
//         .auth-benefits {
//           display: flex; justify-content: center; gap: 20px;
//           padding: 12px 28px;
//           background: #f8fafc;
//           border-top: 1px solid #f1f5f9;
//         }
//         .auth-benefit-item {
//           display: flex; align-items: center; gap: 5px;
//           font-size: 10px; font-weight: 600; color: #64748b;
//           text-transform: uppercase; letter-spacing: 0.5px;
//         }
//         .benefit-dot { width: 6px; height: 6px; border-radius: 50%; background: #06b6d4; flex-shrink: 0; }

//         /* Password strength */
//         .pass-strength { margin-top: 6px; }
//         .pass-strength-bar { height: 3px; border-radius: 2px; background: #f1f5f9; overflow: hidden; }
//         .pass-strength-fill { height: 100%; border-radius: 2px; transition: width 0.3s, background 0.3s; }
//         .pass-strength-label { font-size: 10px; margin-top: 3px; font-weight: 600; }

//         /* Toast */
//         .auth-toast {
//           position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
//           z-index: 99999; pointer-events: none; width: 100%; max-width: 360px; padding: 0 16px;
//         }
//         .auth-toast-inner {
//           display: flex; align-items: center; gap: 10px;
//           padding: 14px 16px; border-radius: 14px;
//           box-shadow: 0 10px 40px rgba(0,0,0,0.18);
//           pointer-events: all;
//         }
//         .toast-success { background: #fff; border-left: 4px solid #22c55e; }
//         .toast-error { background: #fff; border-left: 4px solid #ef4444; }
//         .toast-icon { font-size: 16px; flex-shrink: 0; }
//         .toast-success .toast-icon { color: #22c55e; }
//         .toast-error .toast-icon { color: #ef4444; }
//         .toast-msg { font-size: 13px; font-weight: 500; color: #1e293b; flex: 1; font-family: 'DM Sans', sans-serif; }
//         .toast-close { background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 12px; padding: 0; flex-shrink: 0; }

//         @media (max-width: 440px) {
//           .auth-modal { border-radius: 20px 20px 0 0; max-height: 95vh; align-self: flex-end; }
//           .auth-overlay { align-items: flex-end; padding: 0; }
//           .auth-body { padding: 16px 20px; }
//           .auth-header { padding: 20px 20px 0; }
//           .auth-footer { padding: 12px 20px 20px; }
//           .auth-benefits { padding: 10px 20px; gap: 12px; }
//           .auth-stepper { padding: 16px 20px 0; }
//         }
//       `}</style>

//       {/* Toast */}
//       {toast && (
//         <AuthToast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <div className="auth-overlay" onClick={close}>
//         <div className="auth-modal" onClick={(e) => e.stopPropagation()}>

//           {/* Top color strip */}
//           <div className="auth-top-strip" />

//           {/* Close */}
//           <button className="auth-close" onClick={close}>
//             <FaTimes style={{ fontSize: "12px" }} />
//           </button>

//           {/* Header */}
//           <div className="auth-header">
//             <div className="auth-brand-icon">
//               <FaStore style={{ color: "#06b6d4", fontSize: "20px" }} />
//             </div>
//             <h2 className="auth-title">
//               {authMode === "login" ? "Welcome Back!" : "Create Account"}
//             </h2>
//             <p className="auth-subtitle">
//               {authMode === "login"
//                 ? "Sign in to your Raju's Mobile account"
//                 : "Join thousands of happy customers"}
//             </p>
//           </div>

//           {/* Step indicator (register only) */}
//           {authMode === "register" && (
//             <div className="auth-stepper">
//               {REGISTER_STEPS.map((s, i) => (
//                 <div key={s.id} className="auth-step-item" style={{ flex: i < REGISTER_STEPS.length - 1 ? "1" : "0 0 auto" }}>
//                   <div className={`auth-step-dot ${i < step ? "step-done" : i === step ? "step-active" : "step-pending"}`}>
//                     {i < step ? "✓" : i + 1}
//                   </div>
//                   <span className={`auth-step-label ${i === step ? "active" : ""}`}>{s.label}</span>
//                   {i < REGISTER_STEPS.length - 1 && (
//                     <div className={`auth-step-line ${i < step ? "done" : ""}`} />
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Scrollable body */}
//           <div className="auth-body">

//             {/* ─── LOGIN ─── */}
//             {authMode === "login" && (
//               <>
//                 <AuthInput
//                   icon={FaEnvelope}
//                   type="email"
//                   placeholder="Email address"
//                   value={form.email}
//                   onChange={set("email")}
//                   error={errors.email}
//                   autoComplete="email"
//                 />
//                 <AuthInput
//                   icon={FaLock}
//                   type={showPass ? "text" : "password"}
//                   placeholder="Password"
//                   value={form.password}
//                   onChange={set("password")}
//                   error={errors.password}
//                   onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                   autoComplete="current-password"
//                   rightElement={
//                     <button
//                       type="button"
//                       onClick={() => setShowPass(!showPass)}
//                       style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 0 }}
//                     >
//                       {showPass ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
//                     </button>
//                   }
//                 />
//                 <div style={{ textAlign: "right", marginBottom: "4px", marginTop: "-4px" }}>
//                   <span style={{ fontSize: "12px", color: "#0891b2", cursor: "pointer", fontWeight: 600 }}>
//                     Forgot password?
//                   </span>
//                 </div>

//                 <button
//                   className="auth-submit auth-submit-primary"
//                   onClick={handleSubmit}
//                   disabled={loading}
//                 >
//                   {loading ? <span className="spinner" /> : (
//                     <><span>Sign In</span><FaArrowRight style={{ fontSize: "12px" }} /></>
//                   )}
//                 </button>
//               </>
//             )}

//             {/* ─── REGISTER STEP 0: Account ─── */}
//             {authMode === "register" && step === 0 && (
//               <>
//                 <AuthInput
//                   icon={FaUser}
//                   placeholder="Full Name"
//                   value={form.name}
//                   onChange={set("name")}
//                   error={errors.name}
//                   autoComplete="name"
//                 />
//                 <AuthInput
//                   icon={FaEnvelope}
//                   type="email"
//                   placeholder="Email address"
//                   value={form.email}
//                   onChange={set("email")}
//                   error={errors.email}
//                   autoComplete="email"
//                 />
//                 <AuthInput
//                   icon={FaLock}
//                   type={showPass ? "text" : "password"}
//                   placeholder="Create password (min 6 chars)"
//                   value={form.password}
//                   onChange={set("password")}
//                   error={errors.password}
//                   autoComplete="new-password"
//                   rightElement={
//                     <button type="button" onClick={() => setShowPass(!showPass)}
//                       style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 0 }}>
//                       {showPass ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
//                     </button>
//                   }
//                 />
//                 {/* Password strength */}
//                 {form.password && (
//                   <div className="pass-strength" style={{ marginTop: "-4px", marginBottom: "8px", paddingLeft: "4px" }}>
//                     {(() => {
//                       const len = form.password.length;
//                       const hasNum = /\d/.test(form.password);
//                       const hasSym = /[^a-zA-Z0-9]/.test(form.password);
//                       const score = (len >= 6 ? 1 : 0) + (len >= 10 ? 1 : 0) + (hasNum ? 1 : 0) + (hasSym ? 1 : 0);
//                       const levels = ["", "Weak", "Fair", "Good", "Strong"];
//                       const colors = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"];
//                       const widths = ["0%", "25%", "50%", "75%", "100%"];
//                       return (
//                         <>
//                           <div className="pass-strength-bar">
//                             <div className="pass-strength-fill" style={{ width: widths[score], background: colors[score] }} />
//                           </div>
//                           <p className="pass-strength-label" style={{ color: colors[score] }}>{levels[score]}</p>
//                         </>
//                       );
//                     })()}
//                   </div>
//                 )}
//                 <AuthInput
//                   icon={FaShieldAlt}
//                   type={showConfirm ? "text" : "password"}
//                   placeholder="Confirm password"
//                   value={form.confirmPassword}
//                   onChange={set("confirmPassword")}
//                   error={errors.confirmPassword}
//                   autoComplete="new-password"
//                   rightElement={
//                     <button type="button" onClick={() => setShowConfirm(!showConfirm)}
//                       style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 0 }}>
//                       {showConfirm ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
//                     </button>
//                   }
//                 />
                
// <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "16px" }}>
//   <input
//     type="checkbox"
//     id="policy"
//     checked={acceptedPolicy}
//     onChange={(e) => setAcceptedPolicy(e.target.checked)}
//     style={{
//       marginTop: "3px", width: "16px", height: "16px",
//       accentColor: "#06b6d4", cursor: "pointer", flexShrink: 0,
//     }}
//   />
//   <label htmlFor="policy" style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.6", cursor: "pointer" }}>
//     I agree to the{" "}
//     <span
//       onClick={() => setPolicyOpen("privacy")}
//       style={{ color: "#0891b2", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}
//     >
//       Privacy Policy
//     </span>
//     {" "}and{" "}
//     <span
//       onClick={() => setPolicyOpen("terms")}
//       style={{ color: "#0891b2", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}
//     >
//       Terms of Service
//     </span>
//   </label>
// </div>

// <button
//   className="auth-submit auth-submit-primary"
//   onClick={nextStep}
//   disabled={!acceptedPolicy}
//   style={{
//     opacity: acceptedPolicy ? 1 : 0.4,
//     cursor: acceptedPolicy ? "pointer" : "not-allowed",
//   }}
// >
//   Continue <FaArrowRight style={{ fontSize: "12px" }} />
// </button>



// {policyOpen && (() => {
//   const pg = policyContent[policyOpen];
//   const Icon = pg.icon;
//   return (
//     <div
//       onClick={() => setPolicyOpen(null)}
//       style={{
//         position: "fixed", inset: 0, zIndex: 999999,
//         background: "rgba(0,0,0,0.55)",
//         backdropFilter: "blur(5px)",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         padding: "16px",
//       }}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           background: "white", borderRadius: "24px",
//           width: "100%", maxWidth: "460px",
//           maxHeight: "85vh", display: "flex", flexDirection: "column",
//           boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
//           overflow: "hidden",
//           fontFamily: "'DM Sans', sans-serif",
//         }}
//       >
//         {/* Header */}
//         <div style={{
//           padding: "18px 22px", borderBottom: "1px solid #f1f5f9",
//           display: "flex", alignItems: "center", justifyContent: "space-between",
//           flexShrink: 0,
//         }}>
//           <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//             <div style={{
//               width: "36px", height: "36px", borderRadius: "12px",
//               background: "#e0f9ff", display: "flex", alignItems: "center", justifyContent: "center",
//             }}>
//               <Icon style={{ color: "#0891b2", fontSize: "14px" }} />
//             </div>
//             <div>
//               <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase",
//                 letterSpacing: "1.5px", color: "#06b6d4", margin: 0 }}>
//                 {pg.eyebrow}
//               </p>
//               <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
//                 {pg.title}
//               </h3>
//             </div>
//           </div>
//           <button
//             onClick={() => setPolicyOpen(null)}
//             style={{
//               width: "32px", height: "32px", borderRadius: "50%",
//               background: "#f8fafc", border: "none", cursor: "pointer",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               fontSize: "13px", color: "#64748b", flexShrink: 0,
//             }}
//           >✕</button>
//         </div>
 
//         {/* Subtitle */}
//         <div style={{ padding: "12px 22px 0", flexShrink: 0 }}>
//           <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: "1.6", margin: 0 }}>
//             {pg.subtitle}
//           </p>
//         </div>
 
//         {/* Scrollable sections */}
//         <div style={{ overflowY: "auto", padding: "14px 22px 8px", flex: 1 }}>
//           {pg.sections.map((section, i) => (
//             <div key={i} style={{
//               background: "#f8fafc", borderRadius: "16px",
//               padding: "14px 16px", marginBottom: "10px",
//             }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
//                 <div style={{
//                   width: "24px", height: "24px", borderRadius: "8px",
//                   background: "#e0f9ff", display: "flex", alignItems: "center",
//                   justifyContent: "center", flexShrink: 0,
//                 }}>
//                   <span style={{ fontSize: "11px", fontWeight: 800, color: "#0891b2" }}>{i + 1}</span>
//                 </div>
//                 <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", margin: 0 }}>
//                   {section.heading}
//                 </h4>
//               </div>
//               {section.points.map((point, j) => (
//                 <div key={j} style={{ display: "flex", gap: "8px", marginBottom: "7px" }}>
//                   <span style={{
//                     width: "5px", height: "5px", borderRadius: "50%",
//                     background: "#06b6d4", marginTop: "7px", flexShrink: 0,
//                   }} />
//                   <p style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.7", margin: 0 }}>
//                     {point}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
 
//         {/* Footer */}
//         <div style={{
//           padding: "14px 22px", borderTop: "1px solid #f1f5f9",
//           flexShrink: 0, display: "flex", gap: "10px",
//         }}>
//           <button
//             onClick={() => setPolicyOpen(null)}
//             style={{
//               flex: 1, background: "#f8fafc", color: "#64748b",
//               border: "1.5px solid #e2e8f0", borderRadius: "12px",
//               padding: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
//             }}
//           >
//             Close
//           </button>
//           <button
//             onClick={() => { setAcceptedPolicy(true); setPolicyOpen(null); }}
//             style={{
//               flex: 1, background: "#0f172a", color: "white",
//               border: "none", borderRadius: "12px",
//               padding: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer",
//             }}
//           >
//             I Agree ✓
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// })()}
//               </>
//             )}

//             {/* ─── REGISTER STEP 1: Contact ─── */}
//             {authMode === "register" && step === 1 && (
//               <>
//                 <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "16px" }}>
//                   We'll use this to send order updates and delivery alerts.
//                 </p>
//                 <AuthInput
//                   icon={FaPhone}
//                   type="tel"
//                   placeholder="Mobile number (10 digits)"
//                   value={form.phone}
//                   onChange={set("phone")}
//                   error={errors.phone}
//                   autoComplete="tel"
//                 />
//                 <div style={{ display: "flex", gap: "10px" }}>
//                   <button
//                     className="auth-submit auth-submit-outline"
//                     style={{ flex: "0 0 44px", padding: 0, marginTop: 4 }}
//                     onClick={() => setStep(0)}
//                   >
//                     ←
//                   </button>
//                   <button className="auth-submit auth-submit-primary" style={{ flex: 1 }} onClick={nextStep}>
//                     Continue <FaArrowRight style={{ fontSize: "12px" }} />
//                   </button>
//                 </div>
//               </>
//             )}

//             {/* ─── REGISTER STEP 2: Address ─── */}
//             {authMode === "register" && step === 2 && (
//               <>
//                 <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "16px" }}>
//                   Your default delivery address. You can change it at checkout.
//                 </p>

//                 {/* Address textarea */}
//                 <div className="auth-field-wrap">
//                   <div
//                     className={`auth-textarea-wrap ${errors.address ? "errored" : ""}`}
//                     style={{ marginBottom: errors.address ? "4px" : "12px" }}
//                   >
//                     <FaMapMarkerAlt style={{ fontSize: "13px", color: errors.address ? "#f87171" : "#cbd5e1", marginTop: "3px", flexShrink: 0 }} />
//                     <textarea
//                       className="auth-textarea"
//                       placeholder="House / Flat No., Street, Area, Locality"
//                       value={form.address}
//                       onChange={set("address")}
//                       rows={3}
//                     />
//                   </div>
//                   {errors.address && <p className="auth-field-error">{errors.address}</p>}
//                 </div>

//                 {/* Use location */}
//                 <button className="loc-btn" onClick={getCurrentLocation} disabled={locLoading}
//                   style={{ width: "100%", justifyContent: "center", marginBottom: "12px" }}>
//                   <MdLocationOn style={{ fontSize: "16px" }} />
//                   {locLoading ? "Detecting location…" : "Use my current location"}
//                 </button>

//                 <div className="auth-grid-2">
//                   <AuthInput
//                     placeholder="City"
//                     value={form.city}
//                     onChange={set("city")}
//                     autoComplete="address-level2"
//                   />
//                   <AuthInput
//                     placeholder="State"
//                     value={form.state}
//                     onChange={set("state")}
//                     autoComplete="address-level1"
//                   />
//                 </div>
//                 <AuthInput
//                   placeholder="Pincode"
//                   value={form.pincode}
//                   onChange={set("pincode")}
//                   error={errors.pincode}
//                   autoComplete="postal-code"
//                 />

//                 <div style={{ display: "flex", gap: "10px" }}>
//                   <button
//                     className="auth-submit auth-submit-outline"
//                     style={{ flex: "0 0 44px", padding: 0, marginTop: 4 }}
//                     onClick={() => setStep(1)}
//                   >
//                     ←
//                   </button>
//                   <button
//                     className="auth-submit auth-submit-primary"
//                     style={{ flex: 1 }}
//                     onClick={handleSubmit}
//                     disabled={loading}
//                   >
//                     {loading ? <span className="spinner" /> : (
//                       <><span>Create Account</span><FaArrowRight style={{ fontSize: "12px" }} /></>
//                     )}
//                   </button>
//                 </div>
//               </>
//             )}

//           </div>

//           {/* Benefits bar */}
//           <div className="auth-benefits">
//             {["Free Shipping",  "Secure Payments"].map((b) => (
//               <div key={b} className="auth-benefit-item">
//                 <span className="benefit-dot" />
//                 {b}
//               </div>
//             ))}
//           </div>

//           {/* Footer */}
//           <div className="auth-footer">
//             <p>
//               {authMode === "login" ? "New to Raju's Mobile? " : "Already have an account? "}
//               <span
//                 className="auth-switch"
//                 onClick={() => switchMode(authMode === "login" ? "register" : "login")}
//               >
//                 {authMode === "login" ? "Create account" : "Sign In"}
//               </span>
//             </p>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }



import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import {
  FaTimes, FaUser, FaEnvelope, FaLock, FaMapMarkerAlt,
  FaPhone, FaEye, FaEyeSlash, FaShieldAlt, FaArrowRight,
  FaGoogle, FaStore
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { registerUser } from "../../api/authApi";
import AuthInput from "./AuthInput";
import AuthToast from "./AuthToast";
import { policyContent } from "../../pages/FooterInfo";

/* ─── Validation helpers ─── */
const validators = {
  name: (v) => {
    if (!v.trim()) return "Full name is required";
    if (v.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  },
  email: (v) => {
    if (!v.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address";
    return "";
  },
  password: (v) => {
    if (!v) return "Password is required";
    if (v.length < 6) return "Password must be at least 6 characters";
    return "";
  },
  confirmPassword: (v, form) => {
    if (!v) return "Please confirm your password";
    if (v !== form.password) return "Passwords do not match";
    return "";
  },
  phone: (v) => {
    if (!v.trim()) return "Phone number is required";
    if (!/^[6-9]\d{9}$/.test(v.replace(/\s/g, ""))) return "Enter a valid 10-digit Indian mobile number";
    return "";
  },
  pincode: (v) => {
    if (!v.trim()) return "Pincode is required";
    if (!/^\d{6}$/.test(v.trim())) return "Enter a valid 6-digit pincode";
    return "";
  },
  address: (v) => {
    if (!v.trim()) return "Address is required";
    if (v.trim().length < 10) return "Please enter a complete address";
    return "";
  },
};

const REGISTER_STEPS = [
  { id: "account", label: "Account", icon: FaUser },
  { id: "contact", label: "Contact", icon: FaPhone },
  { id: "address", label: "Address", icon: FaMapMarkerAlt },
];

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, login, authMode, setAuthMode } = useAuth();

  const [step, setStep] = useState(0); // register steps
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }
  const [locLoading, setLocLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(null);

  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    phone: "", pincode: "", address: "", city: "", state: "",
  });

  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validateStep = () => {
    let newErrors = {};
    if (authMode === "login") {
      newErrors.email = validators.email(form.email);
      newErrors.password = validators.password(form.password);
    } else if (step === 0) {
      newErrors.name = validators.name(form.name);
      newErrors.email = validators.email(form.email);
      newErrors.password = validators.password(form.password);
      newErrors.confirmPassword = validators.confirmPassword(form.confirmPassword, form);
    } else if (step === 1) {
      newErrors.phone = validators.phone(form.phone);
    } else if (step === 2) {
      newErrors.address = validators.address(form.address);
      newErrors.pincode = validators.pincode(form.pincode);
    }
    const cleaned = Object.fromEntries(Object.entries(newErrors).filter(([, v]) => v));
    setErrors(cleaned);
    return Object.keys(cleaned).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStep((s) => s + 1);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) { alert("Geolocation not supported"); return; }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
          );
          const data = await res.json();
          setForm((p) => ({
            ...p,
            address: data.display_name || "",
            pincode: data.address?.postcode || "",
            city: data.address?.city || data.address?.town || data.address?.village || "",
            state: data.address?.state || "",
          }));
          setErrors((p) => ({ ...p, address: "", pincode: "" }));
        } catch (e) { console.log(e); }
        setLocLoading(false);
      },
      () => { alert("Location access denied"); setLocLoading(false); }
    );
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    try {
      if (authMode === "login") {
        await login(form.email, form.password);
        setToast({ message: `Welcome back! You're signed in.`, type: "success" });
        setTimeout(close, 2200);
      } else {
        await registerUser({
          name: form.name, email: form.email, password: form.password,
          phone: form.phone, address: form.address,
          pincode: form.pincode, city: form.city, state: form.state,
        });
        setToast({ message: "Account created successfully! Please sign in.", type: "success" });
        setTimeout(() => {
          switchMode("login");
        }, 2000);
      }
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || "Something went wrong. Please try again.";
      setToast({ message: msg, type: "error" });
    }
    setLoading(false);
  };

  const close = useCallback(() => {
    setShowAuthModal(false);
    setErrors({});
    setStep(0);
    setForm({ name: "", email: "", password: "", confirmPassword: "", phone: "", pincode: "", address: "", city: "", state: "" });
  }, [setShowAuthModal]);

  const switchMode = (m) => {
    setAuthMode(m);
    setStep(0);
    setErrors({});
    setForm({ name: "", email: "", password: "", confirmPassword: "", phone: "", pincode: "", address: "", city: "", state: "" });
  };

  if (!showAuthModal) return null;

  const isLastStep = step === REGISTER_STEPS.length - 1;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .auth-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(10,15,30,0.75);
          backdrop-filter: none;
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          font-family: 'DM Sans', sans-serif;
        }

@keyframes modalIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
        .auth-modal {
          background: white;
          border-radius: 24px;
          width: 100%; max-width: 420px;
           box-shadow:0 12px 35px rgba(0,0,0,.18);;
          animation: modalIn 0.32s cubic-bezier(.4,0,.2,1) forwards;
          overflow: hidden;
          position: relative;
          max-height: 92dvh;
          display: flex; flex-direction: column;
            transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;

        }
          .auth-modal,
.auth-header,
.auth-body,
.auth-footer,
.auth-input,
.auth-textarea,
.auth-title {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

        /* Decorative top strip */
        .auth-top-strip {
          height: 4px;
          background: linear-gradient(90deg, #06b6d4, #0891b2, #c0392b);
        }

        /* Header */
        .auth-header {
          padding: 24px 28px 0;
          text-align: center;
        }
        .auth-brand-icon {
          width: 120px; height: 80px;
          background: transparent !important;
          // border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 14px;
          overflow: visible;
        }
        .auth-brand-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .auth-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px; font-weight: 800;
          color: #0f172a; line-height: 1.1;
          margin-bottom: 4px;
        }
        .auth-subtitle {
          font-size: 12px; color: #94a3b8; font-weight: 400;
        }

        /* Stepper */
        .auth-stepper {
          display: flex; align-items: center; justify-content: center;
          gap: 0; padding: 20px 28px 0;
        }
        .auth-step-item {
          display: flex; align-items: center; gap: 6px;
          flex: 1;
        }
        .auth-step-dot {
          width: 24px; height: 24px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; flex-shrink: 0;
          transition: all 0.25s;
        }
        .step-done { background: #06b6d4; color: white; }
        .step-active { background: #0f172a; color: white; box-shadow: 0 0 0 3px rgba(6,182,212,0.2); }
        .step-pending { background: #f1f5f9; color: #94a3b8; }
        .auth-step-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; }
        .auth-step-label.active { color: #0f172a; }
        .auth-step-line { flex: 1; height: 2px; background: #e2e8f0; margin: 0 4px; }
        .auth-step-line.done { background: #06b6d4; }

        /* Scrollable body */
        .auth-body {
          padding: 20px 28px;
          overflow-y: auto;
          flex: 1;
        }

        /* Input fields */
        .auth-field-wrap { margin-bottom: 12px; }
        .auth-field {
          display: flex; align-items: center; gap: 10px;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          padding: 0 14px;
          height: 48px;
          transition: border-color 0.18s, box-shadow 0.18s;
          background: white;
        }
        .auth-field.focused {
          border-color: #06b6d4;
          box-shadow: 0 0 0 3px rgba(6,182,212,0.12);
        }
        .auth-field.errored { border-color: #f87171; }
        .auth-field.errored.focused { box-shadow: 0 0 0 3px rgba(248,113,113,0.12); }
        .auth-field-icon { font-size: 13px; color: #cbd5e1; flex-shrink: 0; transition: color 0.18s; }
        .icon-active { color: #06b6d4; }
        .icon-error { color: #f87171; }
        .auth-input {
          flex: 1; border: none; outline: none;
          font-size: 14px; color: #1e293b;
          font-family: 'DM Sans', sans-serif;
          background: transparent;
        }
        .auth-input::placeholder { color: #94a3b8; }
        .auth-field-right { flex-shrink: 0; }
        .auth-field-error {
          font-size: 11px; color: #ef4444;
          margin-top: 4px; padding-left: 4px;
          display: flex; align-items: center; gap: 4px;
        }

        /* Textarea field */
        .auth-textarea-wrap {
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          padding: 12px 14px;
          transition: border-color 0.18s, box-shadow 0.18s;
          display: flex; gap: 10px;
          align-items: flex-start;
        }
        .auth-textarea-wrap.focused { border-color: #06b6d4; box-shadow: 0 0 0 3px rgba(6,182,212,0.12); }
        .auth-textarea-wrap.errored { border-color: #f87171; }
        .auth-textarea {
          flex: 1; border: none; outline: none; resize: none;
          font-size: 14px; color: #1e293b; font-family: 'DM Sans', sans-serif;
          line-height: 1.5; background: transparent; min-height: 72px;
        }
        .auth-textarea::placeholder { color: #94a3b8; }

        /* Loc button */
        .loc-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          font-size: 12px; font-weight: 600;
          color: #0891b2; cursor: pointer;
          transition: all 0.15s; background: rgba(6,182,212,0.05);
          white-space: nowrap;
        }
        .loc-btn:hover { border-color: #06b6d4; background: rgba(6,182,212,0.1); }

        /* Two-col grid */
        .auth-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

        /* Submit button */
        .auth-submit {
          width: 100%;
          height: 50px;
          border: none; border-radius: 14px;
          font-size: 14px; font-weight: 700;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.2s;
          margin-top: 4px;
          letter-spacing: 0.2px;
          font-family: 'DM Sans', sans-serif;
        }
        .auth-submit-primary {
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
        }
        .auth-submit-primary:hover {
          background: linear-gradient(135deg, #0891b2, #06b6d4);
          box-shadow: 0 6px 20px rgba(6,182,212,0.35);
          transform: translateY(-1px);
        }
        .auth-submit-primary:disabled {
          opacity: 0.6; cursor: not-allowed; transform: none;
        }
        .auth-submit-outline {
          background: white; color: #475569;
          border: 1.5px solid #e2e8f0;
        }
        .auth-submit-outline:hover { border-color: #cbd5e1; background: #f8fafc; }

        /* Spinner */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        /* Divider */
        .auth-divider {
          display: flex; align-items: center; gap: 12px;
          margin: 16px 0;
        }
        .auth-divider-line { flex: 1; height: 1px; background: #f1f5f9; }
        .auth-divider-text { font-size: 11px; color: #cbd5e1; font-weight: 500; }

        /* Footer */
        .auth-footer {
          padding: 16px 28px 24px;
          text-align: center;
          border-top: 1px solid #f8fafc;
        }
        .auth-footer p { font-size: 13px; color: #64748b; }
        .auth-switch {
          color: #0891b2; font-weight: 700; cursor: pointer;
          transition: color 0.15s;
        }
        .auth-switch:hover { color: #06b6d4; text-decoration: underline; }

        /* Close btn */
        .auth-close {
          position: absolute; top: 16px; right: 16px;
          width: 32px; height: 32px; border-radius: 50%;
          background: #f8fafc; border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #94a3b8;
          transition: all 0.15s; z-index: 10;
        }
        .auth-close:hover { background: #f1f5f9; color: #475569; }

        /* Benefits bar */
        .auth-benefits {
          display: flex; justify-content: center; gap: 20px;
          padding: 12px 28px;
          background: #f8fafc;
          border-top: 1px solid #f1f5f9;
        }
        .auth-benefit-item {
          display: flex; align-items: center; gap: 5px;
          font-size: 10px; font-weight: 600; color: #64748b;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .benefit-dot { width: 6px; height: 6px; border-radius: 50%; background: #06b6d4; flex-shrink: 0; }

        /* Password strength */
        .pass-strength { margin-top: 6px; }
        .pass-strength-bar { height: 3px; border-radius: 2px; background: #f1f5f9; overflow: hidden; }
        .pass-strength-fill { height: 100%; border-radius: 2px; transition: width 0.3s, background 0.3s; }
        .pass-strength-label { font-size: 10px; margin-top: 3px; font-weight: 600; }

        /* Toast */
        .auth-toast {
          position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
          z-index: 99999; pointer-events: none; width: 100%; max-width: 360px; padding: 0 16px;
        }
        .auth-toast-inner {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 16px; border-radius: 14px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.18);
          pointer-events: all;
        }
        .toast-success { background: #fff; border-left: 4px solid #22c55e; }
        .toast-error { background: #fff; border-left: 4px solid #ef4444; }
        .toast-icon { font-size: 16px; flex-shrink: 0; }
        .toast-success .toast-icon { color: #22c55e; }
        .toast-error .toast-icon { color: #ef4444; }
        .toast-msg { font-size: 13px; font-weight: 500; color: #1e293b; flex: 1; font-family: 'DM Sans', sans-serif; }
        .toast-close { background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 12px; padding: 0; flex-shrink: 0; }

        /* Mobile Layout fixes */
        @media (max-width: 480px) {
          .auth-overlay { 
            align-items: center; 
            padding: 16px; 
          }
          .auth-modal { 
            border-radius: 24px; 
            width: calc(100% - 32px); 
            max-width: 380px;
            max-height: 88vh; 
            margin: 0 auto;
          }
          .auth-body { padding: 16px 20px; }
          .auth-header { padding: 20px 20px 0; }
          .auth-footer { padding: 14px 20px 20px; }
          .auth-benefits { padding: 10px 20px; gap: 12px; }
          .auth-stepper { padding: 14px 20px 0; }
        }

        @media (max-width:480px) {

  .auth-title{
    font-size:22px;
    line-height:1.1;
    font-weight:800;
  }

  .auth-subtitle{
    font-size:14px;
  }

  .auth-input,
  .auth-textarea{
    font-size:14px;
  }

  .auth-input::placeholder,
  .auth-textarea::placeholder{
    font-size:15px;
    font-weight:500;
  }
}
      `}</style>

      {/* Toast */}
      {toast && (
        <AuthToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="auth-overlay" onClick={close}>
        <div className="auth-modal" onClick={(e) => e.stopPropagation()}>

          {/* Top color strip */}
          <div className="auth-top-strip" />

          {/* Close */}
          <button className="auth-close" onClick={close}>
            <FaTimes style={{ fontSize: "12px" }} />
          </button>

          {/* Header */}
          <div className="auth-header">
<div className="auth-brand-icon">
  <img
    src="/mobile_logos.png"
    alt="Store Logo"
    className="auth-logo-img"
    onError={(e) => {
      e.target.onerror = null;
      e.target.style.display = "none";
    }}
  />
</div>
            <h2 className="auth-title">
              {authMode === "login" ? "Welcome Back!" : "Create Account"}
            </h2>
            <p className="auth-subtitle">
              {authMode === "login"
                ? "Sign in to your Raju's Mobile account"
                : "Join thousands of happy customers"}
            </p>
          </div>

          {/* Step indicator (register only) */}
          {authMode === "register" && (
            <div className="auth-stepper">
              {REGISTER_STEPS.map((s, i) => (
                <div key={s.id} className="auth-step-item" style={{ flex: i < REGISTER_STEPS.length - 1 ? "1" : "0 0 auto" }}>
                  <div className={`auth-step-dot ${i < step ? "step-done" : i === step ? "step-active" : "step-pending"}`}>
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span className={`auth-step-label ${i === step ? "active" : ""}`}>{s.label}</span>
                  {i < REGISTER_STEPS.length - 1 && (
                    <div className={`auth-step-line ${i < step ? "done" : ""}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Scrollable body */}
          <div className="auth-body">

            {/* ─── LOGIN ─── */}
            {authMode === "login" && (
              <>
                <AuthInput
                  icon={FaEnvelope}
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={set("email")}
                  error={errors.email}
                  autoComplete="email"
                />
                <AuthInput
                  icon={FaLock}
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={set("password")}
                  error={errors.password}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  autoComplete="current-password"
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 0 }}
                    >
                      {showPass ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                    </button>
                  }
                />
                <div style={{ textAlign: "right", marginBottom: "4px", marginTop: "-4px" }}>
                  <span style={{ fontSize: "12px", color: "#0891b2", cursor: "pointer", fontWeight: 600 }}>
                    Forgot password?
                  </span>
                </div>

                <button
                  className="auth-submit auth-submit-primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <span className="spinner" /> : (
                    <><span>Sign In</span><FaArrowRight style={{ fontSize: "12px" }} /></>
                  )}
                </button>
              </>
            )}

            {/* ─── REGISTER STEP 0: Account ─── */}
            {authMode === "register" && step === 0 && (
              <>
                <AuthInput
                  icon={FaUser}
                  placeholder="Full Name"
                  value={form.name}
                  onChange={set("name")}
                  error={errors.name}
                  autoComplete="name"
                />
                <AuthInput
                  icon={FaEnvelope}
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={set("email")}
                  error={errors.email}
                  autoComplete="email"
                />
                <AuthInput
                  icon={FaLock}
                  type={showPass ? "text" : "password"}
                  placeholder="Create password (min 6 chars)"
                  value={form.password}
                  onChange={set("password")}
                  error={errors.password}
                  autoComplete="new-password"
                  rightElement={
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 0 }}>
                      {showPass ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                    </button>
                  }
                />
                {/* Password strength */}
                {form.password && (
                  <div className="pass-strength" style={{ marginTop: "-4px", marginBottom: "8px", paddingLeft: "4px" }}>
                    {(() => {
                      const len = form.password.length;
                      const hasNum = /\d/.test(form.password);
                      const hasSym = /[^a-zA-Z0-9]/.test(form.password);
                      const score = (len >= 6 ? 1 : 0) + (len >= 10 ? 1 : 0) + (hasNum ? 1 : 0) + (hasSym ? 1 : 0);
                      const levels = ["", "Weak", "Fair", "Good", "Strong"];
                      const colors = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"];
                      const widths = ["0%", "25%", "50%", "75%", "100%"];
                      return (
                        <>
                          <div className="pass-strength-bar">
                            <div className="pass-strength-fill" style={{ width: widths[score], background: colors[score] }} />
                          </div>
                          <p className="pass-strength-label" style={{ color: colors[score] }}>{levels[score]}</p>
                        </>
                      );
                    })()}
                  </div>
                )}
                <AuthInput
                  icon={FaShieldAlt}
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={set("confirmPassword")}
                  error={errors.confirmPassword}
                  autoComplete="new-password"
                  rightElement={
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 0 }}>
                      {showConfirm ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                    </button>
                  }
                />
<div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "16px" }}>
  <input
    type="checkbox"
    id="policy"
    checked={acceptedPolicy}
    onChange={(e) => setAcceptedPolicy(e.target.checked)}
    style={{
      marginTop: "3px",
      width: "16px",
      height: "16px",
      accentColor: "#06b6d4",
      cursor: "pointer",
      flexShrink: 0,
    }}
  />
  <label htmlFor="policy" style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.6", cursor: "pointer" }}>
    I agree to the{" "}
    <span
      onClick={() => setPolicyOpen("privacy")}
      style={{ color: "#0891b2", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}
    >
      Privacy Policy
    </span>
    {" "}and{" "}
    <span
      onClick={() => setPolicyOpen("terms")}
      style={{ color: "#0891b2", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}
    >
      Terms of Service
    </span>
  </label>
</div>

<button
  className="auth-submit auth-submit-primary"
  onClick={nextStep}
  disabled={!acceptedPolicy}
  style={{
    opacity: acceptedPolicy ? 1 : 0.4,
    cursor: acceptedPolicy ? "pointer" : "not-allowed",
  }}
>
  Continue <FaArrowRight style={{ fontSize: "12px" }} />
</button>

{policyOpen && (() => {
  const pg = policyContent[policyOpen];
  const Icon = pg.icon;
  return (
    <div
      onClick={() => setPolicyOpen(null)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(5px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "460px",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div
          style={{
            padding: "18px 22px",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "12px",
                background: "#e0f9ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon style={{ color: "#0891b2", fontSize: "14px" }} />
            </div>
            <div>
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "#06b6d4",
                  margin: 0,
                }}
              >
                {pg.eyebrow}
              </p>
              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                {pg.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setPolicyOpen(null)}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#f8fafc",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              color: "#64748b",
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: "12px 22px 0", flexShrink: 0 }}>
          <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: "1.6", margin: 0 }}>
            {pg.subtitle}
          </p>
        </div>

        <div style={{ overflowY: "auto", padding: "14px 22px 8px", flex: 1 }}>
          {pg.sections.map((section, i) => (
            <div
              key={i}
              style={{
                background: "#f8fafc",
                borderRadius: "16px",
                padding: "14px 16px",
                marginBottom: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "8px",
                    background: "#e0f9ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#0891b2" }}>{i + 1}</span>
                </div>
                <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", margin: 0 }}>
                  {section.heading}
                </h4>
              </div>

              {section.points.map((point, j) => (
                <div key={j} style={{ display: "flex", gap: "8px", marginBottom: "7px" }}>
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "#06b6d4",
                      marginTop: "7px",
                      flexShrink: 0,
                    }}
                  />
                  <p style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.7", margin: 0 }}>
                    {point}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            padding: "14px 22px",
            borderTop: "1px solid #f1f5f9",
            flexShrink: 0,
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={() => setPolicyOpen(null)}
            style={{
              flex: 1,
              background: "#f8fafc",
              color: "#64748b",
              border: "1.5px solid #e2e8f0",
              borderRadius: "12px",
              padding: "10px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <button
            onClick={() => {
              setAcceptedPolicy(true);
              setPolicyOpen(null);
            }}
            style={{
              flex: 1,
              background: "#0f172a",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "10px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            I Agree ✓
          </button>
        </div>
      </div>
    </div>
  );
})()}
              </>
            )}
{/* ─── REGISTER STEP 1: Contact ─── */}
{authMode === "register" && step === 1 && (
  <>
    <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "16px" }}>
      We'll use this to send order updates and delivery alerts.
    </p>
    <AuthInput
      icon={FaPhone}
      type="tel"
      placeholder="Mobile number (10 digits)"
      value={form.phone}
      onChange={set("phone")}
      error={errors.phone}
      autoComplete="tel"
    />
    <div style={{ display: "flex", gap: "10px" }}>
      <button
        className="auth-submit auth-submit-outline"
        style={{ flex: "0 0 44px", padding: 0, marginTop: 4 }}
        onClick={() => setStep(0)}
      >
        ←
      </button>
      <button className="auth-submit auth-submit-primary" style={{ flex: 1 }} onClick={nextStep}>
        Continue <FaArrowRight style={{ fontSize: "12px" }} />
      </button>
    </div>
  </>
)}

{/* ─── REGISTER STEP 2: Address ─── */}
{authMode === "register" && step === 2 && (
  <>
    <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "16px" }}>
      Your default delivery address. You can change it at checkout.
    </p>

    {/* Address textarea */}
    <div className="auth-field-wrap">
      <div
        className={`auth-textarea-wrap ${errors.address ? "errored" : ""}`}
        style={{ marginBottom: errors.address ? "4px" : "12px" }}
      >
        <FaMapMarkerAlt
          style={{
            fontSize: "13px",
            color: errors.address ? "#f87171" : "#cbd5e1",
            marginTop: "3px",
            flexShrink: 0
          }}
        />
        <textarea
          className="auth-textarea"
          placeholder="House / Flat No., Street, Area, Locality"
          value={form.address}
          onChange={set("address")}
          rows={3}
        />
      </div>
      {errors.address && <p className="auth-field-error">{errors.address}</p>}
    </div>

    {/* Use location */}
    <button
      className="loc-btn"
      onClick={getCurrentLocation}
      disabled={locLoading}
      style={{ width: "100%", justifyContent: "center", marginBottom: "12px" }}
    >
      <MdLocationOn style={{ fontSize: "16px" }} />
      {locLoading ? "Detecting location…" : "Use my current location"}
    </button>

    <div className="auth-grid-2">
      <AuthInput
        placeholder="City"
        value={form.city}
        onChange={set("city")}
        autoComplete="address-level2"
      />
      <AuthInput
        placeholder="State"
        value={form.state}
        onChange={set("state")}
        autoComplete="address-level1"
      />
    </div>

    <AuthInput
      placeholder="Pincode"
      value={form.pincode}
      onChange={set("pincode")}
      error={errors.pincode}
      autoComplete="postal-code"
    />

    <div style={{ display: "flex", gap: "10px" }}>
      <button
        className="auth-submit auth-submit-outline"
        style={{ flex: "0 0 44px", padding: 0, marginTop: 4 }}
        onClick={() => setStep(1)}
      >
        ←
      </button>
      <button
        className="auth-submit auth-submit-primary"
        style={{ flex: 1 }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <span className="spinner" /> : (
          <><span>Create Account</span><FaArrowRight style={{ fontSize: "12px" }} /></>
        )}
      </button>
    </div>
  </>
)}

          </div>

          {/* Benefits bar */}
          <div className="auth-benefits">
            {["Free Shipping",  "Secure Payments"].map((b) => (
              <div key={b} className="auth-benefit-item">
                <span className="benefit-dot" />
                {b}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              {authMode === "login" ? "New to Raju's Mobile? " : "Already have an account? "}
              <span
                className="auth-switch"
                onClick={() => switchMode(authMode === "login" ? "register" : "login")}
              >
                {authMode === "login" ? "Create account" : "Sign In"}
              </span>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}