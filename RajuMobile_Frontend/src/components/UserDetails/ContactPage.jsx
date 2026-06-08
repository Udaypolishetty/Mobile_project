import { useState, useEffect } from "react";
import {
  Phone, MapPin, MessageCircle, Smartphone, Wrench,
  Headphones, ChevronRight, Mail, Clock, Send,
  CheckCircle, Store, ShieldCheck, Truck, Star,
} from "lucide-react";
import AnimatedSection from "../AnimatedSection";


const quickOptions = [
  { icon: Smartphone, title: "New Mobile",     text: "Looking for a new smartphone? We'll help you find the best deal." },
  { icon: Wrench,     title: "Repair Service", text: "Display, battery, charging port or software issues — we fix it all." },
  { icon: Headphones, title: "Accessories",    text: "Chargers, cases, earphones, screen guards and much more." },
];

const trustBadges = [
  { icon: ShieldCheck, label: "Genuine Products" },
  { icon: Truck,       label: "Fast Shipping" },
  { icon: Star,        label: "Top Rated Store" },
  { icon: Store,       label: "Physical Store" },
];

const SHOP_WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER;

export default function ContactPage() {
  const [location, setLocation] = useState(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", requirement: "", message: "", });

useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log("Location denied:", error);
      }
    );
  }
}, []);

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!form.name.trim()) {
    alert("Please enter your name");
    return;
  }

  if (!form.phone.trim()) {
    alert("Please enter your phone number");
    return;
  }
const locationLink = location
  ? `https://maps.google.com/?q=${location.lat},${location.lng}`
  : "Location not shared";

const message = `
📩 *NEW ENQUIRY*

👤 Name: ${form.name}

📱 Phone: ${form.phone}

📧 Email: ${form.email}

📦 Requirement:
${form.requirement}

💬 Message:
${form.message}

📍 Customer Location:
${locationLink}

🕒 Time:
${new Date().toLocaleString()}
`;

  const whatsappUrl =
    `https://wa.me/${SHOP_WHATSAPP}?text=` +
    encodeURIComponent(message);

  window.location.href = whatsappUrl;
};

  return (
    <div className="min-h-screen bg-[#f6f6f4]">

      {/* ── HERO BANNER ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
          <AnimatedSection direction="up">
            <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-600 font-bold mb-2">Get In Touch</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 mb-3 leading-tight">
              We're here to help you
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-xl">
              Visit our store, give us a call, or drop a message — our team is ready to assist you with mobiles, repairs, and accessories.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-600">
                  <Icon className="w-3.5 h-3.5 text-cyan-600" />
                  {label}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-1 space-y-4">
            <AnimatedSection direction="left">

              {/* Contact Info Card */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-4">
                <div className="px-5 py-4 border-b border-gray-100">
                  <p className="text-sm font-bold text-zinc-900">Contact Information</p>
                </div>
                <div className="divide-y divide-gray-100">
                  <a href="tel:+919876543210"
                    className="group flex items-center justify-between px-5 py-4 hover:bg-cyan-50 transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-cyan-50 rounded-xl flex items-center justify-center group-hover:bg-cyan-100 transition">
                        <Phone className="w-4 h-4 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Call Us</p>
                        <p className="text-sm font-semibold text-zinc-800 mt-0.5">+91 98765 43210</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-cyan-600 group-hover:translate-x-0.5 transition-all" />
                  </a>

                  <a href="mailto:raju.mobile@gmail.com"
                    className="group flex items-center justify-between px-5 py-4 hover:bg-cyan-50 transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-cyan-50 rounded-xl flex items-center justify-center group-hover:bg-cyan-100 transition">
                        <Mail className="w-4 h-4 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Email Us</p>
                        <p className="text-sm font-semibold text-zinc-800 mt-0.5">raju.mobile@gmail.com</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-cyan-600 group-hover:translate-x-0.5 transition-all" />
                  </a>

                  <div className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-cyan-50 rounded-xl flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Store Address</p>
                        <p className="text-sm font-semibold text-zinc-800 mt-0.5">Hyderabad, Telangana</p>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <div className="flex items-center gap-3 px-5 py-4">
                    <div className="w-9 h-9 bg-cyan-50 rounded-xl flex items-center justify-center">
                      <Clock className="w-4 h-4 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Store Hours</p>
                      <p className="text-sm font-semibold text-zinc-800 mt-0.5">Mon – Sat · 10am – 8pm</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What are you looking for */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <p className="text-sm font-bold text-zinc-900">What are you looking for?</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {quickOptions.map(({ icon: Icon, title, text }) => (
                    <button key={title}
                      className="group w-full px-5 py-4 flex items-start justify-between text-left hover:bg-gray-50 transition-all duration-200">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-50 transition">
                          <Icon className="w-4 h-4 text-zinc-500 group-hover:text-cyan-600 transition-colors" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-zinc-900">{title}</p>
                          <p className="text-xs text-zinc-500 mt-0.5 leading-5">{text}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-cyan-600 group-hover:translate-x-0.5 mt-1 flex-shrink-0 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

            </AnimatedSection>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatedSection direction="right">

              {/* Map embed */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-4">
                <iframe
                  title="Store Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3176262541!2d78.24323083!3d17.41260211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="220"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="px-5 py-3 flex items-center gap-2 border-t border-gray-100">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-xs text-gray-500 font-medium">Raju Mobile Store · Hyderabad, Telangana, India</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-cyan-600" />
                  <p className="text-sm font-bold text-zinc-900">Send Us a Message</p>
                </div>

                 
                  <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      {[
                        { key: "name",  label: "Full Name",    type: "text", placeholder: "Your name" },
                        { key: "phone", label: "Phone Number", type: "tel",  placeholder: "+91 XXXXX XXXXX" },
                        { key: "email", label: "Email Address", type: "email", placeholder: "you@email.com" },
                        { key: "requirement", label: "What do you need?", type: "text", placeholder: "Model / repair / accessories" },
                      ].map((f) => (
                        <div key={f.key} className="group">
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1.5">{f.label}</label>
                          <input
                            type={f.type}
                            placeholder={f.placeholder}
                            value={form[f.key]}
                            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                            className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-4 py-3 text-sm text-zinc-800 placeholder:text-gray-400 outline-none focus:border-cyan-400 focus:bg-white transition-all"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mb-5">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1.5">Additional Message/Comment</label>
                      <textarea
  rows={4}
  placeholder="Describe your requirement in detail..."
  value={form.message}
  onChange={(e) =>
    setForm({
      ...form,
      message: e.target.value,
    })
  }
  className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-4 py-3 text-sm text-zinc-800 placeholder:text-gray-400 outline-none focus:border-cyan-400 focus:bg-white transition-all resize-none"
/>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <button
                        type="submit"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-950 hover:bg-cyan-600 text-white font-bold px-8 py-3.5 rounded-2xl text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
                      >
                        <Send className="w-4 h-4" />
                        Send Enquiry
                      </button>
                      <p className="text-xs text-gray-400 text-center sm:text-left">
                        We typically respond within 2–4 hours during store hours.
                      </p>
                    </div>
                  </form>
                
              </div>

            </AnimatedSection>
          </div>
        </div>
      </div>
      
            {/* SUBSCRIBE */}
            <AnimatedSection direction="up">
              <section className="bg-[#f5f0eb] py-12">
                <div className="max-w-xl mx-auto px-6 text-center">
                  <h2 className="text-2xl font-bold text-black mb-1">
                    Subscribe to Our Emails
                  </h2>
      
                  <p className="text-gray-400 text-sm mb-6">
                    Join our email list for exclusive offers and the latest news.
                  </p>
      
                  <div className="flex max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Email"
                      className="flex-1 px-4 py-3 rounded-l-xl bg-white border border-gray-300 outline-none text-sm focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
                    />
      
                    <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-r-xl font-bold text-sm transition">
                      →
                    </button>
                  </div>
                </div>
              </section>
            </AnimatedSection>
    </div>
  );
}