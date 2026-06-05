import { useState } from "react";
import { FaTimes, FaUser, FaEnvelope, FaLock, FaMapMarkerAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../api/authApi";

export default function AuthModal() {

  const { showAuthModal, setShowAuthModal, login, runPendingAction,authMode,setAuthMode } = useAuth();
 

const mode = authMode;
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "",
    pincode: "",
    address: ""
  });

  const [error, setError] = useState("");


// This function is used to get the current location of the customer 
  const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        const data = await response.json();

        setForm((prev) => ({
          ...prev,
          address: data.display_name || "",
          pincode: data.address?.postcode || "",
        }));
      } catch (err) {
        console.log(err);
      }
    },
    (err) => {
      console.log(err);
      alert("Location access denied");
    }
  );
};


  if (!showAuthModal) return null;

  const handleSubmit = async () => {

  try {

    if (mode === "register") {

      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        address: form.address,
        pincode: form.pincode
      });

      alert("Registration successful");

      setAuthMode("login");

      return;
    }

    await login(
      form.email,
      form.password
    );

  } catch (err) {
  console.log("REGISTER ERROR:", err);
  console.log("RESPONSE:", err.response?.data);

  setError(
    err.response?.data?.error ||
    JSON.stringify(err.response?.data) ||
    "Email already exists"
  );
  }
};

  const close = () => { setShowAuthModal(false); setError(""); };

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4" onClick={close}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-7 relative animate-scaleIn" onClick={e => e.stopPropagation()}>
        <button onClick={close} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition">
          <FaTimes className="text-lg" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mx-auto mb-3">
            <FaUser className="text-cyan-400 text-xl" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-800">
            {mode === "login" ? "Welcome Back!" : "Create Account"}
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            {mode === "login" ? "Sign in to add items to cart & wishlist" : "Join us to start shopping"}
          </p>
        </div>

        <div className="space-y-3">
          {mode === "register" && (
            
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
              <input
                type="text" placeholder="Full Name"
                className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-cyan-400 transition"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
          )}

          {/* Email block  */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
            <input
              type="email" placeholder="Email address"
              className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-cyan-400 transition"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password block */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
            <input
              type="password" placeholder="Password"
              className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-cyan-400 transition"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
            />
          </div>
          
          {/* Register block  */}
          {mode === "register" && (
  <>
    <div className="relative">
      <FaMapMarkerAlt className="absolute left-3 top-4 text-gray-300 text-sm" />

      <textarea
        placeholder="Address"
        rows="3"
        className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-cyan-400 transition"
        value={form.address}
        onChange={(e) =>
          setForm({
            ...form,
            address: e.target.value,
          })
        }
      />
    </div>

    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Pincode"
        className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-400 transition"
        value={form.pincode}
        onChange={(e) =>
          setForm({
            ...form,
            pincode: e.target.value,
          })
        }
      />

      <button
        type="button"
        onClick={getCurrentLocation}
        className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 rounded-xl text-sm font-semibold whitespace-nowrap"
      >
        📍 Location
      </button>
    </div>
  </>
)}

          {error && <p className="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <button
            onClick={handleSubmit}
            className="w-full bg-black hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition text-sm mt-1"
          >
            {mode === "login" ? "Sign In & Continue" : "Create Account & Continue"}
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-gray-400">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <span
              className="text-cyan-600 font-semibold cursor-pointer hover:underline"
              onClick={() => { setAuthMode(
    mode === "login"
      ? "register"
      : "login"
  );

  setError(""); }}
            >
              {mode === "login" ? "Register" : "Sign In"}
            </span>
          </p>
        </div>

        {/* <p className="text-center text-[10px] text-gray-300 mt-3">Frontend demo — no real auth yet</p> */}
      </div>
    </div>
  );
}
