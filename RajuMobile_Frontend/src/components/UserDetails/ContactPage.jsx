import { useEffect, useState } from "react";
import {
  Phone,
  MapPin,
  MessageCircle,
  ChevronRight,
  Send,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import AnimatedSection from "../AnimatedSection";

const STORE_IMAGES = [
  { src: "/store1.jpeg", alt: "Raju Mobiles store front view" },
  { src: "/store2.jpeg", alt: "Inside Raju Mobiles showroom" },
  { src: "/store3.jpeg", alt: "Mobile accessories display section" },
  { src: "/store4.jpeg", alt: "Display Section" },
  { src: "/store5.jpeg", alt: "Phone repair and service counter" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", requirement: "" });

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    // Build WhatsApp message
    const name = form.name.trim();
    const phone = form.phone.trim();
    const requirement = form.requirement.trim();

    let whatsappMessage = `Hello Raju Mobiles,\n\n`;
    whatsappMessage += `Name: ${name}\n`;
    whatsappMessage += `Phone: ${phone}\n`;
    if (requirement) {
      whatsappMessage += `Requirement: ${requirement}\n`;
    }
    whatsappMessage += `\nPlease assist me.`;

    // WhatsApp number: +91 90001 12262 → 919000112262
    const whatsappNumber = "9190001 12262";

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Open WhatsApp
    window.open(url, "_blank");

    // Show success message
    setSent(true);
  };

  const openGallery = (index) => {
    setActiveImage(index);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  const showPrev = () => {
    setActiveImage((prev) =>
      prev === 0 ? STORE_IMAGES.length - 1 : prev - 1
    );
  };

  const showNext = () => {
    setActiveImage((prev) =>
      prev === STORE_IMAGES.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!galleryOpen) return;
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryOpen]);

  return (
    <div className="min-h-screen bg-[#f6f6f4]">
      {/* HERO */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
          <AnimatedSection direction="up">
            <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-600 font-bold mb-2">
              Get In Touch
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 mb-3 leading-tight">
              Raju Mobiles
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-xl">
              We Care, We Repair! Visit our store, give us a call, or drop a
              message — our team is ready to assist you with all brands and
              models.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-1 space-y-4">
            <AnimatedSection direction="left">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <p className="text-sm font-bold text-zinc-900">
                    Contact Information
                  </p>
                </div>

                <div className="divide-y divide-gray-100">
                  <a
                    href="tel:+919000112262"
                    className="group flex items-center justify-between px-5 py-4 hover:bg-cyan-50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-cyan-50 rounded-xl flex items-center justify-center group-hover:bg-cyan-100 transition">
                        <Phone className="w-4 h-4 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                          Call / WhatsApp
                        </p>
                        <p className="text-sm font-semibold text-zinc-800 mt-0.5">
                          +91 90001 12262
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-cyan-600 group-hover:translate-x-0.5 transition-all" />
                  </a>

                  <a
                    href="tel:+919652407756"
                    className="group flex items-center justify-between px-5 py-4 hover:bg-cyan-50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-cyan-50 rounded-xl flex items-center justify-center group-hover:bg-cyan-100 transition">
                        <Phone className="w-4 h-4 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                          Alternative Call
                        </p>
                        <p className="text-sm font-semibold text-zinc-800 mt-0.5">
                          +91 96524 07756
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-cyan-600 group-hover:translate-x-0.5 transition-all" />
                  </a>

                  <a
                    href="https://instagram.com/Raju_mobiles_Knr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between px-5 py-4 hover:bg-cyan-50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-cyan-50 rounded-xl flex items-center justify-center group-hover:bg-cyan-100 transition">
                        <FaInstagram className="w-4 h-4 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                          Instagram
                        </p>
                        <p className="text-sm font-semibold text-zinc-800 mt-0.5">
                          @Raju_mobiles_Knr
                        </p>
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
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                          Store Location
                        </p>
                        <p className="text-sm font-semibold text-zinc-800 mt-0.5">
                          Market road, Near Raju Tea Stall & Opposite Viswavanth Complex, Karimnagar-505001
                        </p>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* STORE GALLERY */}
            <AnimatedSection direction="left">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <p className="text-sm font-bold text-zinc-900">Store Gallery</p>
                  <span className="text-xs text-gray-400">
                    {STORE_IMAGES.length} Photos
                  </span>
                </div>

                <div className="p-4 grid grid-cols-2 gap-3">
                  {STORE_IMAGES.map((img, index) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => openGallery(index)}
                      className="group relative overflow-hidden rounded-2xl aspect-square focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    </button>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatedSection direction="right">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-4">
                <iframe
                  title="Store Location"
                  src="https://maps.google.com/maps?q=Raju%20Mobiles%20Karimnagar&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="px-5 py-3 flex items-center gap-2 border-t border-gray-100">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-xs text-gray-500 font-medium">
                    Raju Mobiles Store Location
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-cyan-600" />
                  <p className="text-sm font-bold text-zinc-900">
                    Send Us a Message
                  </p>
                </div>

                {sent ? (
                  <div className="px-6 py-14 text-center">
                    <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-zinc-900 mb-1">
                      Message Sent to WhatsApp!
                    </h3>
                    <p className="text-sm text-gray-500">
                      The message has been opened in WhatsApp. Please tap send in the WhatsApp chat.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-5 text-cyan-600 text-sm font-semibold hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      {[
                        {
                          key: "name",
                          label: "Full Name",
                          type: "text",
                          placeholder: "Your name",
                        },
                        {
                          key: "phone",
                          label: "Phone Number",
                          type: "tel",
                          placeholder: "+91 XXXXX XXXXX",
                        },
                      ].map((f) => (
                        <div key={f.key} className="group">
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1.5">
                            {f.label}
                          </label>
                          <input
                            type={f.type}
                            placeholder={f.placeholder}
                            value={form[f.key]}
                            onChange={(e) =>
                              setForm({ ...form, [f.key]: e.target.value })
                            }
                            className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-4 py-3 text-sm text-zinc-800 placeholder:text-gray-400 outline-none focus:border-cyan-400 focus:bg-white transition-all"
                            required
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mb-5">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1.5">
                        Describe Mobile Problem / Requirement
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Enter your mobile model and required repairs (e.g., iPhone 13 Screen Replacement)..."
                        value={form.requirement}
                        onChange={(e) =>
                          setForm({ ...form, requirement: e.target.value })
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
                        Send Enquiry to WhatsApp
                      </button>

                      <p className="text-xs text-gray-400 text-center sm:text-left">
                        Opens WhatsApp with your message pre-filled.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* GALLERY MODAL */}
      {galleryOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
          onClick={closeGallery}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeGallery}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow"
            >
              <X className="w-5 h-5 text-zinc-900" />
            </button>

            <div className="relative bg-black">
              <img
                src={STORE_IMAGES[activeImage].src}
                alt={STORE_IMAGES[activeImage].alt}
                className="w-full h-[260px] sm:h-[380px] md:h-[500px] object-cover"
              />

              <button
                type="button"
                onClick={showPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow"
              >
                <ChevronLeft className="w-5 h-5 text-zinc-900" />
              </button>

              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow"
              >
                <ChevronRightIcon className="w-5 h-5 text-zinc-900" />
              </button>
            </div>

            <div className="p-4 sm:p-5 border-t border-gray-100 bg-white">
              <p className="text-sm font-semibold text-zinc-800 mb-3">
                {STORE_IMAGES[activeImage].alt}
              </p>

              <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-1">
                {STORE_IMAGES.map((img, index) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`snap-start flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition ${
                      activeImage === index
                        ? "border-cyan-500"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}