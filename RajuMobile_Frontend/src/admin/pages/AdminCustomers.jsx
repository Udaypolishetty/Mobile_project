import { useEffect, useState } from "react";
import { getCustomers } from "../../admin/api/adminApi";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaSearch, 
  FaWhatsapp,
  FaAddressCard
} from "react-icons/fa";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getCustomers()
      .then((data) => {
        // Handle variations in array payload wraps safely
        setCustomers(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed fetching customer collection:", err);
        setLoading(false);
      });
  }, []);

  // Filter processing matching name, email, phone, or registration dates
  const filteredCustomers = customers.filter((c) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      c.name?.toLowerCase().includes(searchLower) ||
      c.email?.toLowerCase().includes(searchLower) ||
      c.phone?.includes(searchTerm) ||
      c.city?.toLowerCase().includes(searchLower)
    );
  });

  // Full shimmer loading state to match matching layout patterns
  if (loading) {
    return (
      <div className="min-h-screen p-6 space-y-6 animate-pulse" style={{ background: "#f5f0eb" }}>
        <div className="h-10 bg-gray-300 rounded-xl w-52 mb-3" />
        <div className="h-12 bg-gray-200 rounded-2xl w-full max-w-md mb-8" />
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-white rounded-[32px] p-6 h-44 border border-gray-100 shadow-sm" />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: "#f5f0eb", fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-5xl mx-auto">
        
        {/* Header Layout Grid Block */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Registered <span className="text-cyan-600">Customers</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Complete profile metrics directly extracted from active client registration records.
            </p>
          </div>

          {/* Premium Search Filter Wrapper */}
          <div className="relative w-full md:w-80 flex items-center">
            <FaSearch className="absolute left-4 text-gray-400 text-sm pointer-events-none" />
            <input 
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-2xl pl-11 pr-4 py-3 text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Base Data Grid Listing conditional rendering */}
        {filteredCustomers.length === 0 ? (
          <div className="bg-white rounded-[32px] p-12 text-center border border-gray-100 shadow-sm">
            <p className="text-gray-400 font-medium">No matching client database entries found.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredCustomers.map((c) => (
              <div
                key={c.id}
                className="group relative bg-white rounded-[28px] border border-gray-100/90 p-5 md:p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
                style={{ 
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: "0 10px 30px -10px rgba(139, 92, 26, 0.04)" 
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 25px 45px -12px rgba(0,0,0,0.07)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "0 10px 30px -10px rgba(139, 92, 26, 0.04)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                
                {/* Section A: Customer Visual Avatar identity blocks */}
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center flex-shrink-0 border border-cyan-100/30 text-cyan-600 transition-transform duration-300 group-hover:scale-110">
                    <FaUser className="text-xl" />
                  </div>
                  
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-extrabold text-gray-950 text-base md:text-lg tracking-tight group-hover:text-cyan-600 transition-colors duration-300">
                        {c.name}
                      </h3>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 bg-gray-100 text-gray-500 rounded-md tracking-wider uppercase">
                        UID-{c.id}
                      </span>
                      {c.is_staff && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200/60 rounded-md uppercase tracking-wider">
                          Admin Staff
                        </span>
                      )}
                    </div>

                    {/* Metadata contact lines */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs font-semibold text-gray-600">
                      <span className="flex items-center gap-2 truncate">
                        <FaEnvelope className="text-gray-400 text-xs flex-shrink-0" /> 
                        <span className="truncate">{c.email}</span>
                      </span>
                      {c.phone ? (
                        <span className="flex items-center gap-2 text-gray-700">
                          <FaPhoneAlt className="text-gray-400 text-xs flex-shrink-0" /> {c.phone}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-gray-400 italic">
                          <FaPhoneAlt className="text-gray-300 text-xs flex-shrink-0" /> No number saved
                        </span>
                      )}
                    </div>

                    {/* Live Timestamp block using fallback if date_joined object needs processing */}
                    <div className="text-[11px] text-gray-400 font-bold flex items-center gap-1.5 pt-0.5">
                      <FaCalendarAlt className="text-gray-300 text-xs" />
                      <span>Member Since: </span>
                      <span className="text-gray-500">
                        {c.member_since || (c.created_at ? new Date(c.created_at).toLocaleDateString() : "Prior Session")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section B: Geolocation Addresses & External Messaging Links */}
                <div className="flex flex-col sm:flex-row lg:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-100">
                  
                  {/* Address block matching values fields nested from Django user profile */}
                  {(c.address || c.city || c.state) ? (
                    <div className="text-xs font-medium text-gray-600 bg-gray-50/70 rounded-2xl p-3 border border-gray-100 max-w-sm flex gap-2.5 flex-1 sm:flex-initial">
                      <FaMapMarkerAlt className="text-cyan-600 mt-0.5 text-sm flex-shrink-0" />
                      <div>
                        <span className="block font-bold text-gray-900 text-[11px] uppercase tracking-wider mb-0.5">Registration Address</span>
                        <p className="line-clamp-2 leading-relaxed text-gray-500">
                          {c.address && `${c.address}, `}
                          {c.city && `${c.city}`}
                          {c.state && `, ${c.state}`}
                          {c.pincode && ` - ${c.pincode}`}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 bg-gray-50/40 rounded-2xl p-3 border border-dashed border-gray-200/80 max-w-sm flex items-center gap-2 flex-1 sm:flex-initial">
                      <FaAddressCard className="text-gray-300 text-base" />
                      <span className="italic font-medium">No address breakdown provided.</span>
                    </div>
                  )}

                  {/* WhatsApp Quick Action Button for customer support */}
                  {c.phone && (
                    <a
                      href={`https://wa.me/91${c.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#25D366] hover:bg-[#20ba56] text-white px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 duration-300 sm:h-fit self-center sm:self-auto w-full sm:w-auto"
                    >
                      <FaWhatsapp className="text-base" /> Chat
                    </a>
                  )}

                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}