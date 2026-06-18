import { useEffect, useMemo, useState } from "react";
import { getDashboardStats } from "../adminApi";
import {
  FiBox,
  FiUsers,
  FiShoppingBag,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";

function CountUp({ value, duration = 900 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    let frame;
    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (value - start) * eased);
      setDisplay(current);

      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return <>{display.toLocaleString()}</>;
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="space-y-3">
        <div className="h-4 w-28 rounded-full bg-slate-200/80 shimmer" />
        <div className="h-10 w-56 rounded-2xl bg-slate-200/80 shimmer" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="h-3 w-24 rounded-full bg-slate-200/80 shimmer" />
                <div className="h-9 w-24 rounded-2xl bg-slate-200/80 shimmer" />
                <div className="h-3 w-28 rounded-full bg-slate-200/70 shimmer" />
              </div>
              <div className="h-12 w-12 rounded-2xl bg-slate-200/80 shimmer" />
            </div>

            <div className="mt-6 h-px w-full bg-slate-100" />

            <div className="mt-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-slate-200/80 shimmer" />
              <div className="h-3 w-20 rounded-full bg-slate-200/80 shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  const cards = useMemo(() => {
    if (!stats) return [];

    return [
      {
        title: "Products",
        value: stats.products,
        icon: FiBox,
        note: "Live catalog count",
        tone: "from-cyan-500/15 to-cyan-500/5",
        iconColor: "text-cyan-700",
        accent: "bg-cyan-500",
      },
      {
        title: "Customers",
        value: stats.customers,
        icon: FiUsers,
        note: "Registered users",
        tone: "from-slate-900/8 to-slate-900/0",
        iconColor: "text-slate-700",
        accent: "bg-slate-700",
      },
      {
        title: "Orders",
        value: stats.orders,
        icon: FiShoppingBag,
        note: "All-time orders",
        tone: "from-teal-500/15 to-teal-500/5",
        iconColor: "text-teal-700",
        accent: "bg-teal-500",
      },
      {
        title: "Pending Orders",
        value: stats.pending_orders,
        icon: FiClock,
        note: "Need attention",
        tone: "from-amber-500/15 to-amber-500/5",
        iconColor: "text-amber-700",
        accent: "bg-amber-500",
      },
    ];
  }, [stats]);

  if (!stats) {
    return (
      <>
        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes cardIn {
            from {
              opacity: 0;
              transform: translateY(16px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .shimmer {
            background-image: linear-gradient(
              90deg,
              rgba(226, 232, 240, 0.9) 0%,
              rgba(248, 250, 252, 1) 50%,
              rgba(226, 232, 240, 0.9) 100%
            );
            background-size: 200% 100%;
            animation: shimmer 1.4s ease-in-out infinite;
          }

          .animate-fadeIn {
            animation: fadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          }
        `}</style>
        <DashboardSkeleton />
      </>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .dashboard-enter {
          animation: fadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dashboard-card {
          animation: cardIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .dashboard-enter,
          .dashboard-card {
            animation: none !important;
          }
        }
      `}</style>

      <section className="dashboard-enter space-y-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
              Admin overview
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-[#0a0f1e] sm:text-4xl">
              Dashboard
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-500 sm:text-base">
              A quick snapshot of store activity, customer growth, and pending work.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-cyan-100 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-800">
            <FiTrendingUp className="text-sm" />
            Store health looks stable
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="dashboard-card group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)]"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.tone} opacity-100`}
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      {card.title}
                    </p>

                    <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0a0f1e] [font-variant-numeric:tabular-nums_lining-nums] sm:text-4xl">
                      <CountUp value={card.value} />
                    </h2>

                    <p className="mt-2 text-xs font-medium text-slate-400">
                      {card.note}
                    </p>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/80 shadow-sm backdrop-blur ${card.iconColor}`}
                  >
                    <Icon className="text-[18px]" />
                  </div>
                </div>

                <div className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${card.accent}`} />
                    <span className="text-xs font-semibold text-slate-500">
                      Updated now
                    </span>
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-300 transition-colors duration-300 group-hover:text-slate-500">
                    Insight
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}